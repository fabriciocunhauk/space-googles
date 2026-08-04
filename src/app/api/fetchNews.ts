import { fetchWithTimeout } from "../utils/fetchWithTimeout";
import { sanitizeSummary } from "../utils/sanitizeSummary";
import { NewsArticle } from "./newsTypes";

// Shown on the /news list page and homepage teasers
export const NEWS_LIST_LIMIT = 12;
// Bounded pool of articles eligible for static /news/[id] pages — keeps the
// indexable article set finite instead of letting any historical API id render
export const NEWS_STATIC_POOL_LIMIT = 48;

export const fetchNews = async (
  limit: number = NEWS_LIST_LIMIT,
  // `false` pins the response for the lifetime of the build — used by the
  // sitemap so its news URLs never drift from the frozen /news/[id] static
  // pool (dynamicParams = false there means that pool never grows between
  // deploys, so the sitemap must not "refresh" to ids outside it either).
  revalidate: number | false = 600
): Promise<NewsArticle[]> => {
  try {
    const response = await fetchWithTimeout(
      `https://api.spaceflightnewsapi.net/v4/articles/?limit=${limit}`,
      {
        next: { revalidate },
      } as RequestInit
    );
    if (!response.ok) return [];
    const data = await response.json();
    if (!Array.isArray(data?.results)) return [];
    return data.results.map((article: NewsArticle) => ({
      ...article,
      summary: sanitizeSummary(article.summary),
    }));
  } catch (error) {
    console.error("fetchNews: Error fetching news:", error);
    return [];
  }
};
