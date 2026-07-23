import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/app/components/Container";
import SafeImage from "@/app/components/SafeImage";
import { AdUnit } from "@/app/components/AdUnit";
import { fetchNews } from "@/app/api/fetchNews";
import { fetchNewsById, NewsArticle } from "@/app/api/fetchNewsById";
import { CATEGORY_BACKGROUND, classifyCategory } from "../categoryBackground";
import {
  FaRegClock,
  FaExternalLinkAlt,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

export const revalidate = 3600;

type Props = { params: { id: string } };

export async function generateStaticParams() {
  const articles: NewsArticle[] = await fetchNews();
  return articles.map((a) => ({ id: String(a.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await fetchNewsById(params.id);
  if (!article) return { title: "Article Not Found | Space Googles" };
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
  };
}

export default async function ArticlePage({ params }: Props) {
  const [article, allArticles] = await Promise.all([
    fetchNewsById(params.id),
    fetchNews(),
  ]);

  if (!article) notFound();

  const related: NewsArticle[] = (allArticles as NewsArticle[])
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
        </header>

        {/* Article Body */}
        <div className="glass rounded-[32px] border border-white/10 p-8 md:p-12 space-y-6">
          <p className="text-[10px] font-Barlow-Condensed tracking-[3px] uppercase text-nebula-blue/50">
            Quick Summary
          </p>
          <p className="text-nebula-blue/90 font-Barlow text-lg leading-relaxed">
            {article.summary}
          </p>

          {/* Space Explainer — category background, honestly labeled as general context */}
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

          {/* AdSense in-article */}
          <AdUnit slotId="9298088908" layout="in-article" format="fluid" />

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
