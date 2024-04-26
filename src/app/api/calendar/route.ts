import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Define MAX_TIMES constant
const MAX_TIMES = parseInt(process.env.MAX_TIMES || "5", 10);

export async function GET(request: Request) {
  const store = cookies();
  const code = store.get("auth");

  if (!code) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Get the current date
  const currentDate = new Date();
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Calculate the end date (one week after the current date)
  const endDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000); // Add 7 days in milliseconds

  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/users/me/calendarList`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${code.value}`,
        "Content-Type": "application/json"
      }
    }
  );
  
  const data = await response.json();
  
  // Extracting calendar IDs from the response
  const calendarIds = data.items.map((item: { id: any; }) => item.id);
  
  // Constructing the FreeBusy request
  const freeBusyRequest = {
    "timeMin": currentDate.toISOString(), // Start time (current date)
    "timeMax": endDate.toISOString(), // End time (one week after current date)
    "timeZone": userTimeZone,
    "items": calendarIds.slice(0, 2).map((id: string) => ({ "id": id })) // Using the first two calendar IDs
  };

  const response_fb = await fetch(
    `https://www.googleapis.com/calendar/v3/freeBusy`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${code.value}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(freeBusyRequest)
    }
  );

  const freeBusyData = await response_fb.json();

  // Extract busy times from the FreeBusy response
  const busyTimes = Object.values(freeBusyData.calendars)
    .flatMap((calendar: any) => calendar.busy);

  console.log(busyTimes);

  // Find free times using the findFreeTimes function
  const freeTimes = findFreeTimes(busyTimes, currentDate, endDate);
  
  // Log free times
  console.log(freeTimes);

  // Filter and generate slots
  const nextSlots = filterAndGenerateSlots(freeTimes, userTimeZone);

  // Log next slots
  console.log(nextSlots);

  // Return the next slots as a response
  return new Response(JSON.stringify(nextSlots), {
    headers: {
      "Content-Type": "application/json"
    }
  });
}

function findFreeTimes(busyTimes: { start: string, end: string }[], currentDate: Date, endDate: Date): { start: Date, end: Date }[] {
  const freeTimes = [];

  // Sort busy times by start time
  const sortedBusyTimes = busyTimes.sort((a, b) => Date.parse(a.start) - Date.parse(b.start));

  // Initialize with the current date
  let previousEndTime = currentDate;

  // Loop through busy times to find gaps
  for (const busyTime of sortedBusyTimes) {
      const busyStartTime = new Date(busyTime.start);
      const busyEndTime = new Date(busyTime.end);

      // If there's a gap between previous busy time and current busy time, it's a free time
      if (previousEndTime < busyStartTime) {
          freeTimes.push({ start: previousEndTime, end: busyStartTime });
      }

      // Update previous end time
      previousEndTime = busyEndTime > previousEndTime ? busyEndTime : previousEndTime;
  }

  // Check if there's a gap between the last busy time and the end date
  if (previousEndTime < endDate) {
      freeTimes.push({ start: previousEndTime, end: endDate });
  }

  return freeTimes;
}


function filterAndGenerateSlots(freeTimes: { start: Date, end: Date }[], userTimeZone: string): { start: Date, end: Date }[] {
  const filteredSlots = [];

  for (const freeTime of freeTimes) {
      // Check if the free time falls on a weekend
      if (freeTime.start.getDay() !== 0 && freeTime.start.getDay() !== 6) {
          // Convert start and end times to user's timezone
          const startTime = new Date(freeTime.start.toLocaleString("en-US", { timeZone: userTimeZone }));
          const endTime = new Date(freeTime.end.toLocaleString("en-US", { timeZone: userTimeZone }));

          // Check if the free time is within 9-5
          if (startTime.getHours() >= 9 && endTime.getHours() <= 17) {
              filteredSlots.push({ start: startTime, end: endTime });
          }
      }
  }

  // Sort filtered slots by start time
  const sortedFilteredSlots = filteredSlots.sort((a, b) => a.start.getTime() - b.start.getTime());

  // Generate next MAX_TIMES, 30-minute intervals
  const nextSlots = [];
  let slotCount = 0;
  let currentSlotTime = sortedFilteredSlots[0].start;

  while (slotCount < MAX_TIMES) {
      // Increment current slot time by 30 minutes
      currentSlotTime = new Date(currentSlotTime.getTime() + 30 * 60 * 1000);

      // Check if the slot falls within working hours
      if (currentSlotTime.getHours() >= 9 && currentSlotTime.getHours() < 17) {
          nextSlots.push({
              start: new Date(currentSlotTime.getTime()),
              end: new Date(currentSlotTime.getTime() + 30 * 60 * 1000)
          });
          slotCount++;
      }
  }

  return nextSlots;
}
