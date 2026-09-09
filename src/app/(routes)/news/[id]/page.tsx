import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/app/components/Container";
import SafeImage from "@/app/components/SafeImage";
import { AdUnit } from "@/app/components/AdUnit";
import { fetchNews, NEWS_STATIC_POOL_LIMIT } from "@/app/api/fetchNews";
import { fetchNewsById } from "@/app/api/fetchNewsById";
import { NewsArticle } from "@/app/api/newsTypes";
import { fetchLaunchById, LaunchDetail } from "@/app/api/fetchLaunchById";
import { CATEGORY_BACKGROUND, classifyCategory } from "../categoryBackground";
import {
  FaRegClock,
  FaExternalLinkAlt,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

export const revalidate = 3600;
export const dynamicParams = true;

type Props = { params: { id: string } };

// Single pinned fetch (revalidate: false) shared by generateStaticParams,
// generateMetadata and the page body, so all three always agree on exactly
// the same 48-article set for ids inside the pool.
const getArticlePool = (): Promise<NewsArticle[]> => fetchNews(NEWS_STATIC_POOL_LIMIT, false);

export async function generateStaticParams() {
  const articles = await getArticlePool();
  return articles.map((a) => ({ id: String(a.id) }));
}

// Resolves an id against the pinned pool first, falling back to a live
// per-id fetch for ids outside it — e.g. dynamicParams-generated pages, or
// any id the build-time pool missed because the news API was unavailable
// during that particular build. Also resolves the related-launch data and
// the substantive-content signal shared by generateMetadata and the page.
async function resolveArticle(id: string): Promise<{
  article: NewsArticle;
  relatedLaunch: LaunchDetail | null;
  hasSubstantiveContent: boolean;
} | null> {
  const pool = await getArticlePool();
  const article = pool.find((a) => String(a.id) === id) ?? (await fetchNewsById(id));
  if (!article) return null;

  const primaryLaunchId = article.launches?.[0]?.launch_id ?? null;
  const relatedLaunch = primaryLaunchId ? await fetchLaunchById(primaryLaunchId) : null;

  const summaryWordCount = article.summary.split(/\s+/).filter(Boolean).length;
  const hasSubstantiveContent = Boolean(relatedLaunch) || summaryWordCount >= 40;

  return { article, relatedLaunch, hasSubstantiveContent };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolved = await resolveArticle(params.id);
  if (!resolved) return { title: "Article Not Found | Space Googles" };
  const { article, hasSubstantiveContent } = resolved;
  return {
    title: `${article.title} | Space Googles`,
    description: article.summary,
    alternates: { canonical: `https://space-googles.co.uk/news/${article.id}` },
    openGraph: {
      title: article.title,
      description: article.summary,
      images: [{ url: article.image_url }],
      type: "article",
      publishedTime: article.published_at,
    },
    // Thin aggregator pages (no linked launch, short summary) are kept live
    // for visitors but excluded from Google's index — see sitemap.ts for
    // the matching exclusion.
    robots: hasSubstantiveContent ? undefined : { index: false, follow: true },
  };
}

export default async function ArticlePage({ params }: Props) {
  const resolved = await resolveArticle(params.id);
  if (!resolved) notFound();
  const { article, relatedLaunch, hasSubstantiveContent } = resolved;

  const allArticles = await getArticlePool();
  const related: NewsArticle[] = allArticles
    .filter((a) => String(a.id) !== params.id)
    .slice(0, 3);

  const category = classifyCategory(article.title, article.summary);
  const explainer = CATEGORY_BACKGROUND[category];

  const formattedDate = new Date(article.published_at).toLocaleDateString(
    undefined,
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );

  return (
    <section className="relative bg-deep-space text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[400px] bg-nebula-blue/5 blur-[120px] rounded-full" />
      </div>

      {/* Hero Image */}
      <div className="relative w-full h-64 md:h-[700px] mb-0 overflow-hidden">
        <SafeImage
          src={article.image_url}
          fill
          unoptimized
          className="object-cover"
          alt={article.title}
          fallbackSrc="/assets/crew/background-crew-desktop.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deep-space/50 to-deep-space" />
      </div>

      <Container
        classes={{
          container: "flex flex-col gap-10 relative mt-48 md:-mt-96 pb-28 z-10",
        }}
        size="md"
      >
        {/* Back Link */}
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-nebula-blue/60 hover:text-white font-Barlow-Condensed tracking-[2px] uppercase text-xs transition-colors"
        >
          <FaArrowLeft className="text-[10px]" />
          Back to News Feed
        </Link>

        {/* Article Header */}
        <header className="space-y-4">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="glass px-4 py-2 rounded-full text-xs font-bold tracking-[2px] uppercase border border-white/10 text-accent-gold">
              {article.news_site}
            </span>
            <div className="flex items-center gap-2 text-nebula-blue/60 text-sm font-Barlow">
              <FaRegClock className="text-[10px]" />
              {formattedDate}
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-Bellefair leading-tight">
            {article.title}
          </h1>
          {article.authors?.length > 0 && (
            <p className="text-nebula-blue/60 font-Barlow text-sm">
              By {article.authors.map((a) => a.name).join(", ")}
            </p>
          )}
        </header>

        {/* Article Body */}
        <div className="glass rounded-[32px] border border-white/10 p-8 md:p-12 space-y-6">
          <p className="text-[10px] font-Barlow-Condensed tracking-[3px] uppercase text-nebula-blue/50">
            Quick Summary
          </p>
          <p className="text-nebula-blue/90 font-Barlow text-lg leading-relaxed">
            {article.summary}
          </p>

          {/* Related Launch — real, article-specific data from Launch Library 2 */}
          {relatedLaunch ? (
            <div className="border border-accent-gold/30 bg-accent-gold/5 rounded-[20px] p-6 space-y-4">
              <p className="text-xs font-Barlow-Condensed tracking-[3px] uppercase text-accent-gold">
                Related Launch: {relatedLaunch.name}
              </p>
              <p className="text-nebula-blue/80 font-Barlow text-sm leading-relaxed">
                {relatedLaunch.missionDescription ??
                  "Mission details are being finalized by the launch provider."}
              </p>
              <dl className="grid grid-cols-2 gap-3 text-xs font-Barlow text-nebula-blue/70">
                <div>
                  <dt className="uppercase tracking-widest opacity-50">Rocket</dt>
                  <dd>{relatedLaunch.rocket.name}</dd>
                </div>
                <div>
                  <dt className="uppercase tracking-widest opacity-50">Pad</dt>
                  <dd>
                    {relatedLaunch.pad.name}
                    {relatedLaunch.pad.location ? `, ${relatedLaunch.pad.location}` : ""}
                  </dd>
                </div>
                <div>
                  <dt className="uppercase tracking-widest opacity-50">Status</dt>
                  <dd>{relatedLaunch.status.name}</dd>
                </div>
                <div>
                  <dt className="uppercase tracking-widest opacity-50">Date</dt>
                  <dd>
                    {new Date(relatedLaunch.net).toLocaleDateString(undefined, {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </dd>
                </div>
              </dl>
              <Link
                href="/launch"
                className="inline-flex items-center gap-2 text-white font-Barlow-Condensed tracking-[2px] uppercase text-sm hover:text-accent-gold transition-colors pt-1"
              >
                View Launch Schedule
                <FaArrowRight className="text-[10px]" />
              </Link>
            </div>
          ) : (
            /* Space Explainer — category background, honestly labeled as general context */
            <div className="border border-accent-gold/30 bg-accent-gold/5 rounded-[20px] p-6 space-y-4">
              <p className="text-xs font-Barlow-Condensed tracking-[3px] uppercase text-accent-gold">
                Space Explainer: {explainer.title}
              </p>
              {explainer.body.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-nebula-blue/80 font-Barlow text-sm leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
              <Link
                href={explainer.cta.href}
                className="inline-flex items-center gap-2 text-white font-Barlow-Condensed tracking-[2px] uppercase text-sm hover:text-accent-gold transition-colors pt-1"
              >
                {explainer.cta.label}
                <FaArrowRight className="text-[10px]" />
              </Link>
            </div>
          )}

          {/* AdSense in-article — skipped on the thinnest pages (no linked launch + very short summary) */}
          {hasSubstantiveContent && (
            <AdUnit slotId="9298088908" layout="in-article" format="fluid" />
          )}

          {/* External Link */}
          <div className="pt-4 border-t border-white/10">
            <p className="text-nebula-blue/50 font-Barlow text-xs mb-3 uppercase tracking-widest">
              Source: {article.news_site}
            </p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center gap-2 text-nebula-blue/60 hover:text-white font-Barlow-Condensed tracking-[1px] text-sm transition-colors"
            >
              Read full story at {article.news_site}
              <FaExternalLinkAlt className="text-xs" />
            </a>
          </div>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-Bellefair uppercase">
              More from the Feed
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.id}`}
                  className="glass-card rounded-[24px] border border-white/5 hover:border-white/20 p-2 flex flex-col hover:bg-white/5 transition-all group"
                >
                  <div className="relative h-40 w-full overflow-hidden rounded-[18px] mb-4">
                    <SafeImage
                      src={item.image_url}
                      unoptimized
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      alt={item.title}
                      fallbackSrc="/assets/crew/background-crew-desktop.jpg"
                    />
                  </div>
                  <div className="px-4 pb-4 space-y-2">
                    <p className="text-[10px] text-accent-gold font-Barlow-Condensed tracking-widest uppercase">
                      {item.news_site}
                    </p>
                    <p className="text-sm font-Bellefair leading-snug line-clamp-2 group-hover:text-nebula-blue transition-colors">
                      {item.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
