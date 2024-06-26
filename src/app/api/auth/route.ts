import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const auth_url = "https://accounts.google.com/o/oauth2/v2/auth";

  const params = {
    client_id: process.env.GMAIL_CLIENT_ID!,
    redirect_uri: process.env.GMAIL_CLIENT_REDIRECT_URI!,
    response_type: "code",
    scope: "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/cloud-platform https://www.googleapis.com/auth/generative-language.tuning",
    access_type: "offline",
    prompt: "consent",
  };

  const url = new URL(auth_url + "?" + new URLSearchParams(params));

  return NextResponse.json({ url: url.toString()});
}
