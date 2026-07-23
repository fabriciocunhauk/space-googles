import { fetchWithTimeout } from "../utils/fetchWithTimeout";

export type Agency = {
  id: number;
  name: string;
  abbrev: string;
  type: string;
  countryCode: string;
  description: string;
  administrator: string | null;
  foundingYear: string | null;
  launchers: string | null;
  spacecraft: string | null;
  logoUrl: string | null;
  imageUrl: string | null;
};

export const fetchAgencies = async (): Promise<Agency[]> => {
  try {
    const response = await fetchWithTimeout(
      "https://ll.thespacedevs.com/2.2.0/agencies/?featured=true&limit=20",
      {
        // Cache for 24 hours — agency profiles change rarely
        next: { revalidate: 86400 },
      } as RequestInit,
      8000
    );

    if (!response.ok) throw new Error(`LL2 Agencies API responded ${response.status}`);

    const data = await response.json();

    if (!data || !Array.isArray(data.results)) return [];

    return data.results.map((a: any): Agency => ({
      id: a.id,
      name: a.name,
      abbrev: a.abbrev,
      type: a.type,
      countryCode: a.country_code,
      description: a.description,
      administrator: a.administrator || null,
      foundingYear: a.founding_year || null,
      launchers: a.launchers || null,
      spacecraft: a.spacecraft || null,
      logoUrl: a.logo_url || null,
      imageUrl: a.image_url || null,
    }));
  } catch (error) {
    console.error("fetchAgencies error:", error);
    return [];
  }
};
