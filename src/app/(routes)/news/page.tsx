"use client";
import { useEffect, useState } from "react";
import Container from "@/app/components/Container";
import background from "/public/assets/crew/background-crew-desktop.jpg";
import Image from "next/image";
import { fetchNews } from "@/app/api/fetchNews";
import { classNames } from "@/app/utils/tilwind-jit-set";

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

  return (
    <section
      style={{
        backgroundImage: `linear-gradient(rgba(11, 13, 23, 0.8), rgba(11, 13, 23, 0.8)), url(${background.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="relative min-h-screen pt-32 pb-20 text-white overflow-hidden"
    >
      <Container classes={{ container: "flex flex-col gap-10" }}>
        <header className="space-y-2 animate-in fade-in slide-in-from-top-4 duration-700">
          <p className="text-nebula-blue font-Barlow-Condensed tracking-[4.75px] uppercase">
            04 Interstellar News Feed
          </p>
          <h1 className="text-4xl md:text-5xl font-Bellefair text-glow uppercase">
            Latest Headlines
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          {news.map((item, index) => {
            const date = new Date(item.published_at).toLocaleDateString(undefined, {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            });

            return (
              <div 
                key={item.id} 
                className="glass-card group flex flex-col h-full hover:scale-[1.02] transition-all duration-500"
              >
                <div className="relative h-64 w-full mb-6 overflow-hidden rounded-xl">
                  <Image
                    src={item.image_url}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    width={500}
                    height={300}
                    alt={item.title}
                  />
                  <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                    {item.news_site}
                  </div>
                </div>

                <div className="flex flex-col flex-grow space-y-4">
                  <div className="space-y-2">
                    <span className="text-xs text-nebula-blue font-Barlow uppercase tracking-widest">{date}</span>
                    <h2 className="text-2xl font-Bellefair leading-tight group-hover:text-nebula-blue transition-colors">
                      {item.title}
                    </h2>
                  </div>
                  
                  <p className="text-nebula-blue font-Barlow text-base line-clamp-3 opacity-80">
                    {item.summary}
                  </p>

                  <div className="pt-4 mt-auto">
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-white font-Barlow-Condensed tracking-widest uppercase border-b border-transparent hover:border-white transition-all pb-1"
                    >
                      Read Full Story
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 11L11 1M11 1H1M11 1V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
