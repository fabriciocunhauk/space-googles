export const fetchIssFuturePath = async () => {
  const timestamps = [];
  const now = Math.floor(Date.now() / 1000);
  
  // Get timestamps for every 20 minutes for the next 24 hours (72 points)
  for (let i = 0; i < 72; i++) {
    timestamps.push(now + i * 20 * 60);
  }

  try {
    // Split timestamps into chunks of 10 to respect API limits if any, 
    // although WTIA positions endpoint can take multiple.
    // Actually, we'll do 5 chunks of ~15 timestamps each.
    const chunks = [];
    for (let i = 0; i < timestamps.length; i += 15) {
      chunks.push(timestamps.slice(i, i + 15));
    }

    const allPositions = [];
    for (const chunk of chunks) {
      const response = await fetch(
        `https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps=${chunk.join(",")}&units=kilometers`
      );
      const data = await response.json();
      allPositions.push(...data);
      
      // Short delay to be polite to the API
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // For the UI table, we'll only take a few "major" points (every 3 hours)
    // but we'll return the full path for the map trajectory
    const path = allPositions.map((pos: any, index: number) => ({
      time: new Date(pos.timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      lat: pos.latitude,
      lon: pos.longitude,
      // Only geocode major points to avoid hitting rate limits (every 9th point = ~3 hours)
      isMajor: index % 9 === 0,
      country: "---" // We'll fill this only for major points
    }));

    // Geocode major points
    for (const point of path) {
      if (point.isMajor) {
        try {
          const geoResponse = await fetch(
            `https://api.wheretheiss.at/v1/coordinates/${point.lat},${point.lon}`
          );
          const geoData = await geoResponse.json();
          point.country = geoData.country_code === "??" ? "Open Ocean" : geoData.country_code;
          
          await new Promise(resolve => setTimeout(resolve, 500));
        } catch (e) {
          point.country = "Open Ocean";
        }
      }
    }
    
    return path;
  } catch (error) {
    console.error("Error fetching ISS future path:", error);
    return [];
  }
};
