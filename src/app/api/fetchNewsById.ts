import { fetchWithTimeout } from "../utils/fetchWithTimeout";

export type NewsArticle = {
  id: number;
  image_url: string;
  news_site: string;
  published_at: string;
  summary: string;
  title: string;
  updated_at: string;
  url: string;
};

export const fetchNewsById = async (id: string): Promise<NewsArticle | null> => {
  try {
    const response = await fetchWithTimeout(
      `https://api.spaceflightnewsapi.net/v4/articles/${id}`,
      { next: { revalidate: 3600 } } as RequestInit
    );
    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error("fetchNewsById: Error fetching article:", error);
    return null;
  }
};
