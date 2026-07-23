import { fetchWithTimeout } from "../utils/fetchWithTimeout";

/**
 * Fetches dynamic technical specifications for SpaceX launch vehicles.
 * Normalizes rocket data including payload, height, thrust, and imagery.
 *
 * @returns {Promise<any[]>} A list of dynamic rocket specifications.
 */
export const fetchRockets = async () => {
  try {
    const response = await fetchWithTimeout("https://api.spacexdata.com/v4/rockets", {}, 8000);

    if (!response.ok) throw new Error(`SpaceX Rockets API responded ${response.status}`);

    const data = await response.json();
    
    if (!Array.isArray(data)) {
      console.error("fetchRockets: Expected array but received:", data);
      return [];
    }
    
    // Filter and map to our UI format
    return data.map((r: any) => {
      // Prioritize non-Imgur images as they are blocked in some regions (UK)
      const validImages = (r.flickr_images || []).filter((img: string) => !img.includes("imgur.com"));
      const selectedImage = validImages[0] || "/assets/launch/falcon9.png";

      return {
        name: r.name,
        description: r.description,
        payload: `${r.payload_weights.find((w: any) => w.id === "leo")?.kg.toLocaleString() || "0"} kg to LEO`,
        height: `${r.height.meters} m`,
        thrust: `${r.first_stage.thrust_sea_level.kN.toLocaleString()} kN`,
        image: selectedImage,
        wikipedia: r.wikipedia,
        active: r.active
      };
    });
  } catch (error) {
    console.error("Error fetching rockets:", error);
    return [];
  }
};
