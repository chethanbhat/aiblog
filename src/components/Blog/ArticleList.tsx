import { useEffect, useState } from "react";
import { getBlogQuery, sanityClient } from "../../utils";
import { Blog } from "../../types";
import Spinner from "../Layout/Spinner";
import Article from "./Article";
import { Link } from "react-router-dom";

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
      <h3 className="text-sm md:text-xl font-semibold  text-gray-600 mb-4">
        Latest Blog
      </h3>
      <div className="w-full pb-4 flex flex-wrap justify-start gap-4 md:gap-6">
        {articles.map((a) => (
          <Article key={a._id} article={a} />
        ))}
      </div>
      <Link
        className="w-[150px] mx-auto mt-4 p-1 md:p-1 rounded border border-purple-900 flex items-center justify-center text-xs md:text-base"
        to="/"
      >
        Back
      </Link>
    </div>
  );
};

export default ArticleList;
