import { fetchWithTimeout } from "../utils/fetchWithTimeout";

export const fetchNews = async () => {
  try {
    const response = await fetchWithTimeout(
      "https://api.spaceflightnewsapi.net/v4/articles/?limit=12",
      {
        // Cache for 10 minutes — news articles update several times per day
        next: { revalidate: 600 },
      } as RequestInit
    );
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data?.results) ? data.results : [];
  } catch (error) {
    console.error("fetchNews: Error fetching news:", error);
    return [];
  }
};