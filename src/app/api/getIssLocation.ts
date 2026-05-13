export const getIssLocation = async () => {
  try {
    const response = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
    const data = await response.json();
    
    return {
      longitude: Number(data.longitude),
      latitude: Number(data.latitude),
      velocity: Number(data.velocity),
      altitude: Number(data.altitude)
    };
  } catch (error) {
    console.error("Error fetching ISS location:", error);
    return { longitude: 0, latitude: 0, velocity: 0, altitude: 0 };
  }
};