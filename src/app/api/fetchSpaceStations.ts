import { fetchWithTimeout } from "../utils/fetchWithTimeout";

export type SpaceStation = {
  id: number;
  name: string;
  status: string;
  type: string;
  founded: string | null;
  deorbited: string | null;
  description: string;
  orbit: string | null;
  owners: { name: string; abbrev: string }[];
  activeExpeditions: { name: string; start: string | null }[];
};

export const fetchSpaceStations = async (): Promise<SpaceStation[]> => {
  try {
    const response = await fetchWithTimeout(
      "https://ll.thespacedevs.com/2.2.0/spacestation/?limit=15",
      {
        // Cache for 6 hours — station status/expeditions update occasionally
        next: { revalidate: 21600 },
      } as RequestInit,
      8000
    );

    if (!response.ok) throw new Error(`LL2 Space Station API responded ${response.status}`);

    const data = await response.json();

    if (!data || !Array.isArray(data.results)) return [];

    return data.results.map((s: any): SpaceStation => ({
      id: s.id,
      name: s.name,
      status: s.status?.name || "Unknown",
      type: s.type?.name || "Unknown",
      founded: s.founded || null,
      deorbited: s.deorbited || null,
      description: s.description,
      orbit: s.orbit || null,
      owners: (s.owners || []).map((o: any) => ({ name: o.name, abbrev: o.abbrev })),
      activeExpeditions: (s.active_expeditions || []).map((e: any) => ({
        name: e.name,
        start: e.start || null,
      })),
    }));
  } catch (error) {
    console.error("fetchSpaceStations error:", error);
    return [];
  }
};
