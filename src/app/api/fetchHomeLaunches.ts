import { fetchWithTimeout } from "../utils/fetchWithTimeout";

/**
 * Fetches the next 5 upcoming launches from RocketLaunch.Live.
 * Used on the homepage widget — faster, no rate limits, no API key required.
 *
 * NOTE: The /launch detail page continues to use fetchLaunches (LL2) for richer data.
 */
type HomeLaunch = {
  id: number;
  name: string;
  date_utc: string;
  rocket: { name: string };
  launchpad: { name: string; full_name: string };
  details: string;
};

export const fetchHomeLaunches = async (): Promise<HomeLaunch[]> => {
  try {
    const response = await fetchWithTimeout(
      "https://fdo.rocketlaunch.live/json/launches/next/5",
      {
        // Cache for 30 minutes — launch schedules update infrequently
        next: { revalidate: 1800 },
      } as RequestInit
    );

    if (!response.ok) {
      throw new Error(`RocketLaunch.Live responded ${response.status}`);
    }

    const data = await response.json();

    if (!data?.result || !Array.isArray(data.result)) return [];

    return data.result.map((l: any): HomeLaunch => ({
      id: l.id,
      name: l.missions?.[0]?.name || l.name || "Unknown Mission",
      // RocketLaunch.Live returns ISO strings for t0 and win_open. If neither exists, date_str is something like "May 21".
      // We ensure we pass a valid date format.
      date_utc: l.t0 || l.win_open || new Date(`${l.date_str} ${new Date().getFullYear()}`).toISOString(),
      rocket: {
        name: l.vehicle?.name || "Unknown Vehicle",
      },
      launchpad: {
        name: l.pad?.name || "TBD",
        full_name: l.pad?.location?.name || "TBD",
      },
      details: l.missions?.[0]?.description || l.launch_description || "",
    }));
  } catch (error) {
    console.error("fetchHomeLaunches error:", error);
    return [];
  }
};
