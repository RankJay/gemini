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


export async function POST(request: Request) {
  const store = cookies();
  const code = store.get("auth");

  if (!code) {
    return new Response("Unauthorized", { status: 401 });
  }

  const message = "From: rpatel7@nd.com\r\n" +
        "To: miapatel38@gmail.com\r\n" +
        "Subject: As basic as it gets\r\n\r\n" +
        "This is the plain text body of the message. Note the blank line between the header information and the body of the message.";

  const encodedMessage = btoa(message);
  const reallyEncodedMessage = encodedMessage.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  // Create the API payload
  const payload = JSON.stringify({
    raw: reallyEncodedMessage
  });

  // Send the request to the Gmail API
  const response = await fetch(
    `https://gmail.googleapis.com/upload/gmail/v1/users/me/messages/send`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${code.value}`,
        'Content-Type': 'application/json'
      },
      body: payload
    }
  );

  if (!response.ok) {
    console.error('Failed to send message:', await response.text());
    return new Response("Failed to send message", { status: response.status });
  }

  const result = await response.json();
  console.log('Message sent:', result);
  return NextResponse.json(result);
}