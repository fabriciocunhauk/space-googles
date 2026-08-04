import { fetchWithTimeout } from "../utils/fetchWithTimeout";

export type LaunchDetail = {
  id: string;
  name: string;
  net: string;
  status: { name: string; abbrev: string };
  missionDescription: string | null;
  rocket: { name: string };
  pad: { name: string; location: string };
};

/**
 * Fetches a single launch by id from the Launch Library 2 API, used to
 * enrich /news/[id] articles that reference a specific launch.
 */
export const fetchLaunchById = async (launchId: string): Promise<LaunchDetail | null> => {
  try {
    const response = await fetchWithTimeout(
      `https://ll.thespacedevs.com/2.2.0/launch/${launchId}/?mode=detailed`,
      {
        // Cache for 6 hours — matches fetchSpaceStations.ts convention for slow-changing data
        next: { revalidate: 21600 },
      } as RequestInit,
      8000 // LL2 can be slow; allow 8s before aborting
    );

    if (!response.ok) return null;

    const l = await response.json();

    return {
      id: l.id,
      name: l.name?.split(" | ")[1] || l.name,
      net: l.net,
      status: { name: l.status?.name ?? "Unknown", abbrev: l.status?.abbrev ?? "" },
      missionDescription: l.mission?.description ?? null,
      rocket: { name: l.rocket?.configuration?.full_name ?? "Unknown vehicle" },
      pad: { name: l.pad?.name ?? "TBD", location: l.pad?.location?.name ?? "" },
    };
  } catch (error) {
    console.error("fetchLaunchById: Error fetching launch:", error);
    return null;
  }
};
