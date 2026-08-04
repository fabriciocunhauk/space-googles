export type NewsArticleAuthor = { name: string; socials: unknown | null };
export type NewsArticleLaunchRef = { launch_id: string; provider: string };

export type NewsArticle = {
  id: number;
  image_url: string;
  news_site: string;
  published_at: string;
  summary: string;
  title: string;
  updated_at: string;
  url: string;
  authors: NewsArticleAuthor[];
  launches: NewsArticleLaunchRef[];
};
