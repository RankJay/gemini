/*
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const store = cookies();
  const code = store.get("auth");

  if (!code) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Get the current date
  const currentDate = new Date();

  // Get the date of the next Monday
  const nextMonday = new Date(currentDate);
  nextMonday.setDate(currentDate.getDate() + ((1 + 7 - currentDate.getDay()) % 7));
  console.log(nextMonday)

  // Calculate the end of the week (Friday)
  const endOfWeek = new Date(nextMonday);
  endOfWeek.setDate(nextMonday.getDate() + 4);

  // Prepare the request body
  const requestBody = {
    timeMin: nextMonday.toISOString().slice(0, -14) + "07:00:00-07:00", // 7:00 AM next Monday
    timeMax: endOfWeek.toISOString().slice(0, -14) + "19:00:00-07:00", // 7:00 PM Friday
    items: [
      {
        id: "primary"
      }
    ]
  };

  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/freeBusy`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${code.value}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    }
  );

  const freeBusyData = await response.json();

  console.log(freeBusyData)
  // Extract free times from the response
  const freeTimes = extractFreeTimes(freeBusyData);

  // Return 1-hour time blocks
  const oneHourBlocks = generateOneHourBlocks(freeTimes);

  return NextResponse.json(oneHourBlocks);
}

function extractFreeTimes(freeBusyData: { calendars: any; }) {
  const { calendars } = freeBusyData;

  if (!calendars || !calendars.primary) {
    return [];
  }

  const busySlots = calendars.primary.busy || [];

  // Extract free times from the busy slots
  const freeTimes = busySlots.map((slot: { start: string | number | Date; end: string | number | Date; }) => {
    const start = new Date(slot.start);
    const end = new Date(slot.end);
    return { start, end };
  });

  return freeTimes;
}

function generateOneHourBlocks(freeTimes: string | any[]) {
  const oneHourBlocks = [];

  for (let i = 0; i < freeTimes.length; i++) {
    let current = new Date(freeTimes[i].start);
    while (current < freeTimes[i].end) {
      const nextHour = new Date(current);
      nextHour.setHours(nextHour.getHours() + 1); // Add 1 hour
      if (nextHour <= freeTimes[i].end) {
        oneHourBlocks.push({ start: current, end: nextHour });
      }
      current = nextHour;
    }
  }

  return oneHourBlocks;
}

*/