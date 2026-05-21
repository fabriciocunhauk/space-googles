import { fetchWithTimeout } from "../utils/fetchWithTimeout";

export const getIssLocation = async () => {
  try {
    const response = await fetchWithTimeout(
      "https://api.wheretheiss.at/v1/satellites/25544",
      {
        // Cache for 30 seconds — ISS moves ~7.7 km/s, short cache balances freshness vs latency
        next: { revalidate: 30 },
      } as RequestInit,
      10000 // 10s timeout — API can be cold at build time
    );

    if (!response.ok) throw new Error(`ISS API responded ${response.status}`);

    const data = await response.json();

    return {
      longitude: Number(data.longitude),
      latitude: Number(data.latitude),
      velocity: Number(data.velocity),
      altitude: Number(data.altitude),
    };
  } catch (error) {
    console.error("Error fetching ISS location:", error);
    return { longitude: 0, latitude: 0, velocity: 0, altitude: 0 };
  }
};