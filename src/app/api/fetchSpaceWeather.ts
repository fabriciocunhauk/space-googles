import { fetchWithTimeout } from "../utils/fetchWithTimeout";

const NASA_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY || "DEMO_KEY";

export const fetchSpaceWeather = async () => {
  try {
    // Get flares from the last 7 days
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
    const startDateStr = startDate.toISOString().split("T")[0];

    const response = await fetchWithTimeout(
      `https://api.nasa.gov/DONKI/FLR?startDate=${startDateStr}&api_key=${NASA_KEY}`,
      {
        // Cache for 30 minutes — solar activity data updates infrequently
        next: { revalidate: 1800 },
      } as RequestInit
    );

    if (!response.ok) throw new Error("NASA DONKI API error");

    const data = await response.json();

    if (data && data.length > 0) {
      const latest = data[data.length - 1];
      return {
        type: "Solar Flare",
        class: latest.classType,
        peak: new Date(latest.peakTime).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
        status: "Active Activity",
        location: latest.sourceLocation,
      };
    }

    return {
      type: "Solar Weather",
      class: "Calm",
      peak: "N/A",
      status: "Quiet",
      location: "None",
    };
  } catch (error) {
    console.error("Error fetching Space Weather:", error);
    return {
      type: "Solar Weather",
      class: "Unknown",
      peak: "N/A",
      status: "Sensor Offline",
      location: "N/A",
    };
  }
};
