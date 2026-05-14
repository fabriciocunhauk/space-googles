"use client";
import { useEffect, useState } from "react";
import Container from "@/app/components/Container";
import background from "/public/assets/crew/background-crew-desktop.jpg";
import Image from "next/image";
import { fetchNews } from "@/app/api/fetchNews";
import { classNames } from "@/app/utils/classNames";
import { FaRegClock, FaExternalLinkAlt, FaStar } from "react-icons/fa";

type NewsData = {
  id: number;
  image_url: string;
  news_site: string;
  published_at: string;
  summary: string;
  title: string;
  updated_at: string;
  url: string;
};

export default function News() {
  const [news, setNews] = useState<NewsData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      try {
        const planetInfo = await fetchNews();
        setNews(planetInfo);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
    getNews();
  }, []);

  const featuredNews = news[0];
  const remainingNews = news.slice(1);

  return (
    <section
      style={{
        backgroundImage: `linear-gradient(rgba(11, 13, 23, 0.9), rgba(11, 13, 23, 0.9)), url(${background.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
      }}
      className="relative min-h-screen pt-44 pb-20 text-white overflow-hidden"
    >
      <Container classes={{ container: "flex flex-col gap-16" }}>
        <header className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
          <p className="text-nebula-blue font-Barlow-Condensed tracking-[4.75px] uppercase flex items-center gap-2">
            <span className="opacity-50">04</span> Interstellar News Feed
          </p>
          <h1 className="text-5xl md:text-6xl font-Bellefair text-glow uppercase">
            Latest Headlines
          </h1>
        </header>

        {/* Skeletons while loading */}
        {loading ? (
          <>
            <div className="glass rounded-[40px] overflow-hidden border border-white/5 h-[500px] animate-pulse">
              <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                <div className="bg-white/5 h-full" />
                <div className="p-16 space-y-6 flex flex-col justify-center">
                  <div className="h-4 w-32 bg-white/5 rounded" />
                  <div className="h-12 w-full bg-white/10 rounded" />
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-white/5 rounded" />
                    <div className="h-4 w-5/6 bg-white/5 rounded" />
                  </div>
                  <div className="h-12 w-48 bg-white/10 rounded-full mt-4" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="glass rounded-[32px] p-2 space-y-6 h-[450px] animate-pulse">
                  <div className="h-64 w-full bg-white/5 rounded-[24px]" />
                  <div className="p-4 space-y-4">
                    <div className="h-4 w-32 bg-white/5 rounded" />
                    <div className="h-6 w-full bg-white/10 rounded" />
                    <div className="h-12 w-full bg-white/5 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Featured News Hero */}
            {featuredNews && (
              <div className="animate-in fade-in zoom-in duration-1000">
                <div className="glass rounded-[40px] overflow-hidden border border-white/20 group cursor-pointer relative shadow-glow-sm hover:shadow-glow transition-all">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <div className="relative h-96 lg:h-full min-h-[400px] overflow-hidden">
                      <Image
                        src={featuredNews.image_url}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-1000"
                        alt={featuredNews.title}
                      />
                      <div className="absolute top-6 left-6 glass px-4 py-2 rounded-full flex items-center gap-2 text-xs font-bold tracking-[2px] uppercase">
                        <FaStar className="text-accent-gold" />
                        Featured Report
                      </div>
                    </div>
                    <div className="p-10 lg:p-16 flex flex-col justify-center space-y-6 bg-gradient-to-br from-white/10 to-transparent">
                      <div className="space-y-3">
                        <p className="text-accent-gold font-Barlow-Condensed tracking-[3px] uppercase text-sm">
                          {featuredNews.news_site}
                        </p>
                        <h2 className="text-4xl md:text-5xl font-Bellefair leading-tight">
                          {featuredNews.title}
                        </h2>
                        <p className="text-nebula-blue font-Barlow text-lg leading-relaxed opacity-80">
                          {featuredNews.summary}
                        </p>
                      </div>
                      <div className="flex items-center gap-6 pt-4">
                        <a
                          href={featuredNews.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white text-black px-10 py-4 rounded-full font-Bellefair text-xl hover:scale-110 transition-all flex items-center gap-3"
                        >
                          READ FULL STORY <FaExternalLinkAlt className="text-sm" />
                        </a>
                        <div className="flex items-center gap-2 text-nebula-blue/60 text-sm">
                          <FaRegClock />
                          {new Date(featuredNews.published_at).toLocaleDateString(
                            undefined,
                            { dateStyle: "long" }
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              {remainingNews.map((item, index) => {
                const date = new Date(item.published_at).toLocaleDateString(
                  undefined,
                  {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  }
                );

                return (
                  <div
                    key={item.id}
                    className="glass-card group flex flex-col h-full hover:bg-white/5 transition-all duration-500 rounded-[32px] border border-white/5 hover:border-white/20 p-2"
                  >
                    <div className="relative h-64 w-full overflow-hidden rounded-[24px]">
                      <Image
                        src={item.image_url}
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                        width={500}
                        height={300}
                        alt={item.title}
                      />
                      <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border border-white/10">
                        {item.news_site}
                      </div>
                    </div>

                    <div className="flex flex-col flex-grow p-6 space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[10px] text-nebula-blue/60 font-Barlow uppercase tracking-widest">
                          <FaRegClock />
                          {date}
                        </div>
                        <h2 className="text-2xl font-Bellefair leading-tight group-hover:text-glow transition-all">
                          {item.title}
                        </h2>
                      </div>

                      <p className="text-nebula-blue font-Barlow text-sm line-clamp-3 opacity-70">
                        {item.summary}
                      </p>

                      <div className="pt-4 mt-auto">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-3 text-white font-Barlow-Condensed tracking-[2px] uppercase text-xs hover:text-nebula-blue transition-all"
                        >
                          EXPLORE REPORT
                          <FaExternalLinkAlt className="text-[10px]" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </Container>
    </section>
  );
}
