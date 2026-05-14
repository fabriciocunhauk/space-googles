export const fetchLaunches = async () => {
  try {
    // LL2 API - Global, real-time, and high-fidelity
    const response = await fetch(
      "https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=15&mode=detailed"
    );
    const data = await response.json();

    // Map LL2 results to the UI-expected LaunchData interface
    return data.results.map((l: any) => ({
      id: l.id,
      name: l.name.split(" | ")[1] || l.name, // Clean up names like "Zhuque-2E | Mass Simulator"
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
          small: l.image, // Use mission image as patch fallback
          large: l.image,
        },
        flickr: { small: [], original: [] },
        reddit: { campaign: null, launch: null, media: null, recovery: null },
        youtube_id: l.vid_urls?.[0]?.url?.split("v=")[1] || null,
        wikipedia: l.pad.wiki_url || null,
        article: l.pad.info_url || null,
      },
      // Extended data for global context
      agency: {
        name: l.launch_service_provider.name,
        type: l.launch_service_provider.type,
      },
      status: {
        name: l.status.name,
        abbrev: l.status.abbrev,
      },
      payloads: l.mission?.payloads || [],
      cores: [], // LL2 handles cores differently, leaving empty for now
    }));
  } catch (error) {
    console.error("Error fetching global launches from LL2:", error);
    return [];
  }
};