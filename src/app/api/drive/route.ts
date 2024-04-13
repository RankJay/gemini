import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
  const store = cookies();
  const code = store.get("auth");

  if (!code) {
    return new Response("Unauthorized", { status: 401 });
  }

  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files`,
    {
      headers: {
        Authorization: `Bearer ${code.value}`,
      },
    }
  );

  const driveList = await response.json();
  console.log(driveList);

  return NextResponse.json(driveList);
}
