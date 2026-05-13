export const fetchMarsWeather = async () => {
  try {
    // Note: NASA InSight lander is retired, this API might return old data
    const response = await fetch(
      "https://mars.nasa.gov/rss/api/?feed=weather&category=insight&feedtype=json"
    );
    const data = await response.json();
    
    // Return the latest sol data
    const sol_keys = data.sol_keys || [];
    if (sol_keys.length > 0) {
      const latestSol = sol_keys[sol_keys.length - 1];
      return {
        sol: latestSol,
        temp: data[latestSol]?.AT?.av || -63, // Default to avg Mars temp if missing
        pressure: data[latestSol]?.PRE?.av || 700,
        season: data[latestSol]?.Season || "Unknown",
      };
    }
    
    // Fallback data if API is empty
    return {
      sol: "3500+",
      temp: -63,
      pressure: 700,
      season: "Extremely Cold",
    };
  } catch (error) {
    console.error("Error fetching Mars weather:", error);
    return {
      sol: "N/A",
      temp: -63,
      pressure: 700,
      season: "Unknown",
    };
  }
};
