import { LaunchData } from "../types/launch";
import { fetchWithTimeout } from "../utils/fetchWithTimeout";

/**
 * Fetches upcoming global launch data from The Space Devs (LL2) API.
 * Maps the complex LL2 response to a unified LaunchData structure.
 *
 * @returns {Promise<LaunchData[]>} A list of upcoming launches with rich metadata.
 */
export const fetchLaunches = async (): Promise<LaunchData[]> => {
  try {
    const response = await fetchWithTimeout(
      // Reduced limit 15→5 (only 3 shown on homepage, 5 gives buffer for launch page)
      "https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=5&mode=detailed",
      {
        // Cache for 30 minutes — launch schedules don't change rapidly
        next: { revalidate: 1800 },
      } as RequestInit,
      8000 // LL2 can be slow; allow 8s before aborting
    );

    if (!response.ok) {
      throw new Error(`LL2 API responded with status: ${response.status}`);
    }

    const data = await response.json();

    if (!data || !Array.isArray(data.results)) {
      console.error("fetchLaunches: Expected results array but received:", data);
      return [];
    }

    return data.results.map((l: any): LaunchData => ({
      id: l.id,
      name: l.name.split(" | ")[1] || l.name,
      date_utc: l.net,
      date_unix: Math.floor(new Date(l.net).getTime() / 1000),
      upcoming: true,
      flight_number: l.orbital_launch_attempt_count || 0,
      details: l.mission?.description || "Mission details are being finalized by the launch provider.",
      rocket: {
        id: l.rocket.configuration.id.toString(),
        name: l.rocket.configuration.full_name,
      },
      launchpad: {
        id: l.pad.id.toString(),
        name: l.pad.name,
        full_name: l.pad.location.name,
      },
      links: {
        patch: {
          small: l.image,
          large: l.image,
        },
        youtube_id: l.vid_urls?.[0]?.url?.split("v=")[1] || null,
        wikipedia: l.pad.wiki_url || null,
        article: l.pad.info_url || null,
      },
      agency: {
        name: l.launch_service_provider.name,
        type: l.launch_service_provider.type,
      },
      status: {
        name: l.status.name,
        abbrev: l.status.abbrev,
      },
      missionType: l.mission?.type || null,
      orbit: l.mission?.orbit?.name || null,
      payloads: (l.mission?.payloads || []).map((p: any) => ({
        name: p.name || p.payload_name || "Unnamed Payload",
      })),
    }));
  } catch (error) {
    // Graceful error handling for mission-critical telemetry
    console.error("fetchLaunches error:", error);
    return [];
  }
};