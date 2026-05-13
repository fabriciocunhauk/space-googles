export const fetchNews = async () => {
  const response = await fetch(
    "https://api.spaceflightnewsapi.net/v4/articles/?limit=12"
  );
  const data = await response.json();
  return data?.results;
};