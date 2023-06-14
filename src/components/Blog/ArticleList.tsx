import { useEffect, useState } from "react";
import { getBlogQuery, sanityClient } from "../../utils";
import { Blog } from "../../types";
import Spinner from "../Layout/Spinner";
import Article from "./Article";

const ArticleList = () => {
  const [articles, setArticles] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async () => {
    setLoading(true);
    const _articles = await sanityClient.fetch(getBlogQuery);
    setArticles(_articles);
    setLoading(false);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <h3 className="text-xl font-semibold  text-gray-600 mb-4">Latest Blog</h3>
      <div className="w-full pb-8 flex flex-wrap justify-start gap-6">
        {articles.map((a) => (
          <Article key={a._id} article={a} />
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
