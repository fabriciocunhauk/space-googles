"use client";
import { useEffect, useState } from "react";
import Container from "@/app/components/Container";
import background from "/public/assets/crew/background-crew-desktop.jpg";
import Image from "next/image";
import { fetchNews } from "@/app/api/fetchNews";

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

  useEffect(() => {
    const getNews = async () => {
      const planetInfo = await fetchNews();
      setNews(planetInfo);
    };
    getNews();
  }, []);

  return (
    <section
      style={{
        backgroundImage: `url(${background.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="flex justify-center text-white h-screen pt-52"
    >
      <Container
        classes={{ container: "flex flex-col gap-6 overflow-scroll pb-20" }}
      >
        {news.map((news, index) => {
          const date = new Date(news.published_at).toLocaleString();

          return (
            <div key={index} className="flex flex-col lg:flex-row gap-10">
              <Image
                src={news.image_url}
                className="object-cover w-full h-[400px] lg:max-h-[300px] rounded"
                width={500}
                height={300}
                alt="image"
              />

              <div className="flex flex-col justify-between col-span-2">
                <div className="space-y-4">
                  <h1 className="text-3xl">{news.title}</h1>
                  <p>{news.summary}</p>
                </div>
                <span>{date}</span>
              </div>
            </div>
          );
        })}
      </Container>
    </section>
  );
}
