export const fetchNews = async () => {
      const response = await fetch(
        "https://api.spaceflightnewsapi.net/v4/reports/"
      );
      const data = await response.json();
      return data?.results;
    };