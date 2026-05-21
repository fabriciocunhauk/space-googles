import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://space-googles.co.uk";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/launch`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/crew`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/planets`,
      lastModified: new Date(),
    },
  ];
}
