import { NextResponse } from "next/server";
import { cookies } from "next/headers";


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

  // Extract just the names from the files array
  const fileNames = driveList.files.map((file: { name: string }) => file.name);

  return NextResponse.json(fileNames);
}
