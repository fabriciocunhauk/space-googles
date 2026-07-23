import { fetchWithTimeout } from "../utils/fetchWithTimeout";

export type DockingEvent = {
  id: number;
  docking: string | null;
  departure: string | null;
  spacecraftName: string;
  spacecraftDescription: string | null;
  stationName: string | null;
};

export const fetchDockingEvents = async (): Promise<DockingEvent[]> => {
  try {
    const response = await fetchWithTimeout(
      "https://ll.thespacedevs.com/2.2.0/docking_event/?limit=6&ordering=-docking",
      {
        // Cache for 30 minutes — new docking events are infrequent
        next: { revalidate: 1800 },
      } as RequestInit,
      8000
    );

    if (!response.ok) throw new Error(`LL2 Docking Event API responded ${response.status}`);

    const data = await response.json();

    if (!data || !Array.isArray(data.results)) return [];

    return data.results.map((d: any): DockingEvent => {
      const spacecraft = d.flight_vehicle?.spacecraft;
      return {
        id: d.id,
        docking: d.docking || null,
        departure: d.departure || null,
        spacecraftName: spacecraft?.name || "Unknown Spacecraft",
        spacecraftDescription: spacecraft?.description || null,
        stationName: d.docking_location?.spacestation?.name || null,
      };
    });
  } catch (error) {
    console.error("fetchDockingEvents error:", error);
    return [];
  }
};
