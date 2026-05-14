export type IssPathPoint = {
  time: string;
  lat: number;
  lon: number;
  isMajor: boolean;
  country: string;
};

export const fetchIssFuturePath = async (): Promise<IssPathPoint[]> => {
  const now = Math.floor(Date.now() / 1000);

  // 24 points, one per hour — single request, no chunking needed
  const timestamps = Array.from({ length: 24 }, (_, i) => now + i * 60 * 60);

  try {
    const response = await fetch(
      `https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps=${timestamps.join(",")}&units=kilometers`,
      { next: { revalidate: 300 } } // cache for 5 minutes
    );

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();

    return data.map((pos: any, index: number) => ({
      time: new Date(pos.timestamp * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      lat: pos.latitude,
      lon: pos.longitude,
      isMajor: index % 3 === 0, // every 3 hours
      country: "—",
    }));
  } catch (error) {
    console.error("Error fetching ISS future path:", error);
    return [];
  }
};
