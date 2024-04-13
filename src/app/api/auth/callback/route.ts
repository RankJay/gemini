import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const params = new URLSearchParams(request.url.split("?")[1]);
  const code = params.get("code");

  const store = cookies();

  if (!code) {
    // store error as cookie for 30 seconds
    store.set("error", "Invalid email!", {
      expires: new Date(Date.now() + 30 * 1000),
      path: "/",
    });
    redirect("/");
  }

  const token_url = "https://oauth2.googleapis.com/token";
  const token_params = {
    client_id: process.env.GMAIL_CLIENT_ID!,
    client_secret: process.env.GMAIL_CLIENT_SECRET!,
    code,
    redirect_uri: process.env.GMAIL_CLIENT_REDIRECT_URI!,
    grant_type: "authorization_code",
  };

  try {
    const token_response = await fetch(token_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(token_params).toString(),
    });

    const token_data = await token_response.json();

    if (token_data.error) {
      return new Response(token_data.error_description, { status: 400 });
    }

    // store auth token as cookie
    store.set("auth", token_data.access_token, {
      expires: new Date(Date.now() + token_data.expires_in * 1000),
      path: "/",
    });
  } catch (error) {
    console.error(error);
    store.set("error", "Failed to authenticate!", {
      expires: new Date(Date.now() + 30 * 1000),
      path: "/",
    });
  } finally {
    redirect("/");
  }

}
