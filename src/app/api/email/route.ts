import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const MAX_RESULTS = process.env.MAX_RESULTS || 10;

export async function GET(request: Request) {
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

  console.log(messagesList);

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
}
