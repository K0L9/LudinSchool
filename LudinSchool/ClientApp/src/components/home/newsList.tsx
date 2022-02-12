import { useEffect } from "react";
import NewsCard from "../common/news";
import { useActions } from "../../hooks/useActions";

const NewsList = () => {
  const { fetchNews } = useActions();
  useEffect(() => {
    fetchNews({ pageCount: 1, pageSize: 1 });
  }, []);

  return (
    <div className="newsList">
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
    </div>
  );
};

export default NewsList;
