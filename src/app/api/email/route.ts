import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const MAX_RESULTS = process.env.MAX_RESULTS || 10;

export async function GET(request: Request) {
  try {
    const store = cookies();
    const code = store.get("auth");

    if (!code) {
      return new Response("Unauthorized", { status: 401 });
    }

    const response = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=${MAX_RESULTS}&labelIds=SENT`,
      {
        headers: {
          Authorization: `Bearer ${code.value}`,
        },
      }
    );

    const messagesList = await response.json();

    const messages = await Promise.all(
      messagesList.messages.map(async (message: any) => {
        const response = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${message.id}`,
          {
            headers: {
              Authorization: `Bearer ${code.value}`,
            },
          }
        );

        return response.json();
      })
    );

    return NextResponse.json(messages);
  } catch (error: any) {
    console.log(error.response.data);
    return new Response(error as any, { status: 500 });
  }
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
    console.log(error.response.data);
    return new Response(error as any, { status: 500 });
  }
}
