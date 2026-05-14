export const fetchRockets = async () => {
  try {
    const response = await fetch("https://api.spacexdata.com/v4/rockets");
    const data = await response.json();
    
    // Filter and map to our UI format
    return data.map((r: any) => ({
      name: r.name,
      description: r.description,
      payload: `${r.payload_weights.find((w: any) => w.id === "leo")?.kg.toLocaleString() || "0"} kg to LEO`,
      height: `${r.height.meters} m`,
      thrust: `${r.first_stage.thrust_sea_level.kN.toLocaleString()} kN`,
      image: r.flickr_images[0] || "/assets/launch/falcon9.png",
      wikipedia: r.wikipedia,
      active: r.active
    }));
  } catch (error) {
    console.error("Error fetching rockets:", error);
    return [];
  }
};
