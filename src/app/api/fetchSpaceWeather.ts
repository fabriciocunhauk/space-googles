import { fetchWithTimeout } from "../utils/fetchWithTimeout";

export const fetchSpaceWeather = async () => {
  try {
    // Fetch flares from the last 7 days from NOAA SWPC
    const response = await fetchWithTimeout(
      "https://services.swpc.noaa.gov/json/goes/primary/xray-flares-7-day.json",
      {
        // Cache for 30 minutes — solar activity data updates infrequently
        next: { revalidate: 1800 },
      } as RequestInit
    );

    if (!response.ok) throw new Error("NOAA SWPC API error");

    const data = await response.json();

    if (data && data.length > 0) {
      // Data is sorted chronologically, so the last item is the most recent
      const latest = data[data.length - 1];
      return {
        type: "Solar Flare",
        class: latest.max_class,
        peak: new Date(latest.max_time).toLocaleString([], {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "Active Activity",
        location: "Global",
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
