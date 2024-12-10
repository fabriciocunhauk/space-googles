export const fetchLaunches = async () => {
     const response = await fetch(
        "https://api.spacexdata.com/v5/launches/upcoming"
      );
      const data = await response.json();
      
      return data;
    };