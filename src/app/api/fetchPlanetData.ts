import type { PlanetData } from "@/app/(routes)/planets/types";

const PLANET_API_BASE = "https://planets-17f2.onrender.com/planets/getPlanet";

export async function fetchPlanetData(
  planetName: string,
): Promise<PlanetData & { error?: string }> {
  const response = await fetch(`${PLANET_API_BASE}?name=${planetName}`, {
    method: "GET",
  });
  return response.json();
}