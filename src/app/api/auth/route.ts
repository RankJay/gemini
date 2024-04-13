import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const auth_url = "https://accounts.google.com/o/oauth2/v2/auth";

  const params = {
    client_id: process.env.GMAIL_CLIENT_ID!,
    redirect_uri: process.env.GMAIL_CLIENT_REDIRECT_URI!,
    response_type: "code",
    scope: "https://gmail.googleapis.com https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/userinfo.profile",
    access_type: "offline",
    prompt: "consent",
  };

  const url = new URL(auth_url + "?" + new URLSearchParams(params));

  redirect(url.toString());
}
