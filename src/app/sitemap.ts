import { MetadataRoute } from "next";
import { fetchNews, NEWS_STATIC_POOL_LIMIT } from "./api/fetchNews";
import { NewsArticle } from "./api/newsTypes";
import { PLANET_LIST } from "./(routes)/planets/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://space-googles.co.uk";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/news`, lastModified: new Date() },
    { url: `${baseUrl}/planets`, lastModified: new Date() },
    { url: `${baseUrl}/launch`, lastModified: new Date() },
    { url: `${baseUrl}/crew`, lastModified: new Date() },
    { url: `${baseUrl}/agencies`, lastModified: new Date() },
    { url: `${baseUrl}/stations`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date() },
    { url: `${baseUrl}/terms`, lastModified: new Date() },
  ];

  const planetRoutes: MetadataRoute.Sitemap = PLANET_LIST.map((name) => ({
    url: `${baseUrl}/planets/${name}`,
    lastModified: new Date(),
  }));

  let newsRoutes: MetadataRoute.Sitemap = [];
  try {
    // revalidate: false pins this to the same build-time snapshot that
    // news/[id]'s generateStaticParams used, so the sitemap can't drift
    // ahead of that static pool.
    const articles = await fetchNews(NEWS_STATIC_POOL_LIMIT, false);
    // Only submit articles that news/[id] itself indexes — a linked launch
    // or a summary long enough to count as substantive (mirrors
    // hasSubstantiveContent in news/[id]/page.tsx, which noindexes the
    // rest). Checking launches.length here (not a resolved fetchLaunchById)
    // avoids 48 extra API calls at sitemap-build time; a page this misses
    // still just falls back to noindex, never the other way around.
    newsRoutes = articles
      .filter((a: NewsArticle) => {
        const wordCount = a.summary.split(/\s+/).filter(Boolean).length;
        return a.launches?.length > 0 || wordCount >= 40;
      })
      .map((a: NewsArticle) => ({
        url: `${baseUrl}/news/${a.id}`,
        lastModified: new Date(a.published_at),
      }));
  } catch {
    // silently skip if news API is unavailable at build time
  }

  return [...staticRoutes, ...planetRoutes, ...newsRoutes];
}
