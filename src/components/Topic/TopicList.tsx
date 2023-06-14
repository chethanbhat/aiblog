import { Link } from "react-router-dom";
import { Topic } from "../../types";

const TopicList = ({
  topics,
  deleteTopic,
}: {
  topics: Topic[];
  deleteTopic: (id: string) => void;
}) => {
  return (
    <div className="w-full pr-4 flex-1 overflow-y-auto">
      {topics.length > 0 ? (
        topics.map((t: Topic) => (
          <Link
            to={`/write/${t._id}`}
            key={t._id}
            className="bg-white rounded-md mb-4 p-4 flex justify-between relative shadow"
          >
            <span
              onClick={() => deleteTopic(t._id)}
              className="absolute w-4 h-4 flex justify-center items-center top-[1%] left-[98.5%] rounded-full p-1 text-sm text-gray-400 hover:text-red-600 font-bold cursor-pointer"
            >
              x
            </span>
            <div className="flex-1">
              <h3 className="mb-4">{t.title}</h3>
              <div className="flex gap-2">
                {t.keywords.map((k) => (
                  <span className="border border-purple-700 text-purple-900 rounded-md px-1.5 py-1 cursor-pointer text-xs">
                    {k.keyword}
                  </span>
                ))}
              </div>
            </div>
            <button className="text-xs self-center bg-purple-900 text-white rounded px-2 py-1.5 shadow">
              Write
            </button>
          </Link>
        ))
      ) : (
        <div className="w-full h-full flex justify-center items-center text-center">
          Sorry, no topics found !
        </div>
      )}
    </div>
  );
};

export default TopicList;
