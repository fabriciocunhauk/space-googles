const NASA_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY || "DEMO_KEY";

/**
 * Fetches the latest natural color imagery of Earth from NASA's EPIC (Earth Polychromatic Imaging Camera).
 * 
 * @returns {Promise<{url: string, caption: string, date: string, coords: {lat: string, lon: string}} | null>} 
 * The latest Earth image metadata or null if the request fails.
 */
export const fetchEpicEarth = async () => {
  try {
    const response = await fetch(
      `https://epic.gsfc.nasa.gov/api/natural`
    );
    
    if (!response.ok) return null;

    const data = await response.json();

    if (data && data.length > 0) {
      const latest = data[0];
      const date = latest.date.split(" ")[0].replace(/-/g, "/"); // YYYY/MM/DD
      const imageName = latest.image;
      
      // Safety checks for coordinates
      const lat = latest.centroid_coordinates?.lat?.toFixed(2) || "0.00";
      const lon = latest.centroid_coordinates?.lon?.toFixed(2) || "0.00";

      return {
        url: `https://epic.gsfc.nasa.gov/archive/natural/${date}/png/${imageName}.png`,
        caption: latest.caption || "Earth View",
        date: latest.date,
        coords: { lat, lon }
      };
    }

    return null;
  } catch (error) {
    console.error("EPIC: Error fetching data:", error);
    return null;
  }
};
