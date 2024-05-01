import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const store = cookies();
  const code = store.get("auth");

  if (!code) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const MAX_RESULTS = process.env.MAX_RESULTS || "15";

  // Fetch snippets
  const gmailResponse = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=${MAX_RESULTS}&labelIds=SENT`,
    {
      headers: {
        Authorization: `Bearer ${code.value}`,
      },
    }
  );

  if (!gmailResponse.ok) {
    return new NextResponse(
      `Failed to fetch messages: ${gmailResponse.statusText}`,
      { status: 500 }
    );
  }

  const messagesList = await gmailResponse.json();
  if (!messagesList.messages) {
    return new NextResponse("No messages found", { status: 404 });
  }

  const trainingData: string[] = [];
  for (const message of messagesList.messages) {
    const detailResponse = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages/${message.id}`,
      {
        headers: {
          Authorization: `Bearer ${code.value}`,
        },
      }
    );
    const messageDetails = await detailResponse.json();
    let snippet = "";

    // console.log(JSON.stringify(messageDetails))
    if (messageDetails.payload.parts) {
      for (const part of messageDetails.payload.parts) {
        if (part.mimeType === "text/plain") {
          snippet = Buffer.from(part.body.data, "base64").toString("utf-8");
          break;
        }
      }
    } else {
      snippet = messageDetails.snippet;
    }

    trainingData.push(snippet)
  }

  return new NextResponse(JSON.stringify(trainingData), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  try {
    const store = cookies();
    const code = store.get("auth");

    if (!code) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { to, subject, message } = body;

    const email = [
      'Content-Type: text/html; charset="UTF-8"\n',
      "MIME-Version: 1.0\n",
      `To: ${to}\n`,
      `Subject: ${subject}\n\n`,
      message,
    ].join("");

    const encodedEmail = Buffer.from(email)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const response = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages/send`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${code.value}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          raw: encodedEmail,
        }),
      }
    );

    return NextResponse.json({ data: await response.json() });
  } catch (error: any) {
    return new Response(error as any, { status: 500 });
  }
}
