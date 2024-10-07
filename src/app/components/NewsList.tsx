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

  // console.log(news);

  return (
    <Container classes={{ container: "flex flex-col" }}>
      {news.map((news, index) => {
        const date = new Date(news.published_at).toLocaleString();

        return (
          <div key={index} className="grid grid-cols-3">
            <div className="col-span-2">
              <h1>{news.title}</h1>
              <p>{news.summary}</p>
              <span>{date}</span>
            </div>
            <Image src={news.image_url} width={300} height={300} alt="image" />
          </div>
        );
      })}
    </Container>
  );
}

export default NewsList;
