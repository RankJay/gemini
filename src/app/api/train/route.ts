import { NextResponse } from "next/server";
import { GET as getEmails } from "@/app/api/email/route";
import { NextApiRequest } from "next";
import { cookies } from "next/headers";

export const maxDuration = 10

export async function GET(req: NextApiRequest) {
  const store = cookies();
  const emailData = await getEmails(req);
  if (!emailData.ok) {
    return NextResponse.json(
      { error: "Failed to fetch emails" },
      { status: 500 }
    );
  }
  const emails = await emailData.json();

  if (!emails || !emails.length) {
    return NextResponse.json({ error: "No emails found" }, { status: 404 });
  }

  const emailDataString = emails.join(' \n');

  store.set("emaildata", emailDataString, {
    path: "/",
    expires: new Date(Date.now() + 1000 * 60 * 60),
  });

  return NextResponse.json({ success: "Emails data string created" });
}
