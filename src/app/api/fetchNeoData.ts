import { fetchWithTimeout } from "../utils/fetchWithTimeout";

const NASA_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY || "DEMO_KEY";

export const fetchNeoData = async () => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const response = await fetchWithTimeout(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${NASA_KEY}`,
      {
        // Cache for 1 hour — asteroid positions are computed, not real-time
        next: { revalidate: 3600 },
      } as RequestInit
    );

    if (!response.ok) throw new Error(`NASA NEO API responded ${response.status}`);

    const data = await response.json();

    const neoList = data.near_earth_objects[today] || [];

    // Sort by proximity
    const sorted = [...neoList].sort((a, b) => {
      const distA = parseFloat(a.close_approach_data[0].miss_distance.kilometers);
      const distB = parseFloat(b.close_approach_data[0].miss_distance.kilometers);
      return distA - distB;
    });

    const closest = sorted[0];
    const largest = [...neoList].sort(
      (a, b) =>
        b.estimated_diameter.meters.estimated_diameter_max -
        a.estimated_diameter.meters.estimated_diameter_max
    )[0];

    return {
      count: neoList.length,
      closest: closest
        ? {
            name: closest.name,
            distance: parseFloat(closest.close_approach_data[0].miss_distance.kilometers).toLocaleString(),
            velocity: parseFloat(closest.close_approach_data[0].relative_velocity.kilometers_per_hour).toLocaleString(),
            isHazardous: closest.is_potentially_hazardous_asteroid,
          }
        : null,
      largest: largest
        ? {
            name: largest.name,
            diameter: Math.round(largest.estimated_diameter.meters.estimated_diameter_max),
          }
        : null,
    };
  } catch (error) {
    console.error("Error fetching NEO data:", error);
    return { count: 0, closest: null, largest: null };
  }
};
