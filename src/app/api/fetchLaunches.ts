import { LaunchData } from "../types/launch";

/**
 * Fetches upcoming global launch data from The Space Devs (LL2) API.
 * Maps the complex LL2 response to a unified LaunchData structure.
 * 
 * @returns {Promise<LaunchData[]>} A list of upcoming launches with rich metadata.
 */
export const fetchLaunches = async (): Promise<LaunchData[]> => {
  try {
    const response = await fetch(
      "https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=15&mode=detailed"
    );
    
    if (!response.ok) {
      throw new Error(`LL2 API responded with status: ${response.status}`);
    }

    const data = await response.json();

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
      payloads: l.mission?.payloads || [],
    }));
  } catch (error) {
    // Graceful error handling for mission-critical telemetry
    return [];
  }
};