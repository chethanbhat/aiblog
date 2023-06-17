import { Blog } from "../../types";
import { urlFor } from "../../utils";

const Article = ({ article }: { article: Blog }) => {
  return (
    <div className="w-[360px] p-4 rounded-md bg-white mb-2 md:mb-8">
      <h2 className="text-base md:text-xl text-gray-600 font-medium mb-4">
        {article.topic.title}
      </h2>
      <h5 className="text-sm mb-2 flex items-center">
        <img
          className="w-6 h-6 rounded-full mr-2"
          src={article.createdBy.image}
          alt=""
        />{" "}
        <div className="font-medium">{article.createdBy.username}</div>
      </h5>
      <img
        src={urlFor(article.imageUrl).width(400).url()}
        alt={article.topic.title}
        className="mb-4"
      />
      <p className="mb-4 text-sm">{article.article}</p>
      <h5 className="text-sm mb-4">
        Category:{" "}
        <span className="font-medium">{article.category.category}</span>
      </h5>
      <div className="flex gap-2 mb-4">
        {article.keywords.map((k) => (
          <span
            id={k._id}
            className="lowercase border border-violet-700 text-violet-900 rounded-md px-1.5 py-1 text-xs"
          >
            {k.keyword}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Article;
