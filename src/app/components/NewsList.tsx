"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Container from "./Container";

type NewsData = {
  count: number;
  next: string;
  previous: null;
  results: News[];
};

type News = {
  id: number;
  image_url: string;
  news_site: string;
  published_at: string;
  summary: string;
  title: string;
  updated_at: string;
  url: string;
};

function NewsList() {
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch(
        "https://api.spaceflightnewsapi.net/v4/reports/"
      );
      const data = await response.json();
      setNews(data?.results);
    };

    fetchNews();
  }, []);

  return (
    <Container
      classes={{ container: "flex flex-col gap-6 overflow-scroll pb-20" }}
    >
      {news.map((news, index) => {
        const date = new Date(news.published_at).toLocaleString();

        return (
          <div key={index} className="grid grid-cols-3 gap-10">
            <div className="col-span-1">
              <Image
                src={news.image_url}
                className="w-full"
                width={500}
                height={300}
                alt="image"
              />
            </div>
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
  );
}

export default NewsList;
