import { MetadataRoute } from "next";
import { fetchNews } from "./api/fetchNews";
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
    const articles = await fetchNews();
    newsRoutes = articles.map((a: { id: number; published_at: string }) => ({
      url: `${baseUrl}/news/${a.id}`,
      lastModified: new Date(a.published_at),
    }));
  } catch {
    // silently skip if news API is unavailable at build time
  }

  return [...staticRoutes, ...planetRoutes, ...newsRoutes];
}
