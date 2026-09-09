import { fetchWithTimeout } from "../utils/fetchWithTimeout";
import { sanitizeSummary } from "../utils/sanitizeSummary";
import { NewsArticle } from "./newsTypes";

// Runtime fallback for an id outside the build-time static pool (see
// news/[id]/page.tsx) — used only when the pinned pool doesn't contain the
// requested id, so a stale/empty build-time snapshot degrades to a live
// fetch instead of a hard 404.
export const fetchNewsById = async (id: string): Promise<NewsArticle | null> => {
  try {
    const response = await fetchWithTimeout(
      `https://api.spaceflightnewsapi.net/v4/articles/${id}`,
      { next: { revalidate: 3600 } } as RequestInit
    );
    if (!response.ok) return null;
    const article = await response.json();
    return { ...article, summary: sanitizeSummary(article.summary) };
  } catch (error) {
    console.error("fetchNewsById: Error fetching article:", error);
    return null;
  }
};
