import { Link } from "react-router-dom";
import { Topic } from "../../types";
import { DeleteIcon, PencilIcon } from "../Icons/SVGIcons";

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
              className="absolute flex justify-center items-center top-[2%] left-[90%] md:left-[98%] rounded-full p-1 text-sm text-gray-500 hover:text-red-600 font-bold cursor-pointer"
            >
              <DeleteIcon />
            </span>
            <div className="flex-1">
              <h3 className="mb-4 text-sm md:text-base">{t.title}</h3>
              <div className="gap-2 hidden md:flex">
                {t.keywords.map((k) => (
                  <span className="border border-violet-700 text-violet-900 rounded-md px-1.5 py-1 cursor-pointer text-xs lowercase self-center truncate">
                    {k.keyword}
                  </span>
                ))}
              </div>
            </div>
            <button className="mt-8 md:mt-4 flex items-center text-xs self-center bg-violet-900 hover:bg-violet-700 text-white rounded px-2 py-1.5 shadow">
              <span className="mr-2">
                <PencilIcon />
              </span>
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
