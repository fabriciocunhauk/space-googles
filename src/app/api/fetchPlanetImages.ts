export const fetchPlanetImages = async (planetName: string) => {
  try {
    const response = await fetch(
      `https://images-api.nasa.gov/search?q=${planetName}&media_type=image`
    );
    const data = await response.json();
    
    // Return the first 4 high-quality images
    return data.collection.items.slice(0, 4).map((item: any) => ({
      href: item.links[0].href,
      title: item.data[0].title,
      description: item.data[0].description,
    }));
  } catch (error) {
    console.error(`Error fetching images for ${planetName}:`, error);
    return [];
  }
};
