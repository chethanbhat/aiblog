import { useEffect, useState } from "react";
import { getKeywordsQuery, sanityClient } from "../../utils";
import { Category } from "./CategoryHome";
import Spinner from "../Layout/Spinner";

export interface Keyword {
  _id: string;
  keyword: string;
}

const AddTopicModal = ({
  categories,
  activeCategory,
  cancel,
}: {
  categories: Category[];
  activeCategory: Category;
  cancel: () => void;
}) => {
  const [loading, setLoading] = useState(true);
  const [topic, setTopic] = useState("");
  const [allKeywords, setAllKeywords] = useState<Keyword[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<Keyword[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    activeCategory._id
  );
  const [newKeyword, setNewKeyword] = useState("");

  useEffect(() => {
    getKeywords();
  }, []);

  const getKeywords = async () => {
    setLoading(true);
    const _keywords = await sanityClient.fetch(getKeywordsQuery);
    setAllKeywords(_keywords);
    setLoading(false);
  };

  const addNewKeyword = async () => {
    await sanityClient
      .create({
        _type: "keywords",
        keyword: newKeyword,
      })
      .then((res) => {
        setAllKeywords((prev) => {
          return [...prev, res];
        });
      });
    setNewKeyword("");
  };

  const addNewTopic = async () => {
    await sanityClient
      .create({
        _type: "topic",
        title: topic,
        keywords: selectedKeywords.map((sk) => {
          return { _type: "reference", _ref: sk._id, _key: sk._id };
        }),
        category: {
          _type: "reference",
          _ref: selectedCategory,
        },
      })
      .then((res) => {
        console.log(res);
        // Close Modal
        cancel();
      });
  };

  return (
    <div className="min-w-full min-h-screen fixed top-0 left-0 overflow-hidden bg-gray-900/20 flex justify-center items-center z-[100]">
      <div
        className={
          "w-[576px] min-h-[452px] bg-white shadow-lg rounded-2xl overflow-hidden z-[50] flex flex-col"
        }
      >
        <div className="bg-violet-900 p-4 text-white">
          <h3 className="text-center">Add a topic</h3>
        </div>
        <div className="p-6 flex-1">
          {/* Topic */}
          <div className="mb-4">
            <label className="block mb-2">Topic</label>
            <input
              autoFocus
              className="border border-gray-400 rounded-lg p-2 block w-full"
              type="text"
              placeholder="Add topic title"
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          {/* Category */}
          <div className="mb-4">
            <label className="block mb-2">Category</label>
            <select
              className="w-1/3 border border-gray-400 rounded-lg p-2"
              onChange={(e) => setSelectedCategory(e.target.value)}
              defaultValue={selectedCategory}
            >
              {categories.map((c: Category) => (
                <option key={c._id} value={c._id}>
                  {c.category}
                </option>
              ))}
            </select>
          </div>
          {/* Keywords */}
          <div className="mb-4">
            <label className="block mb-2">Keywords (select atleast one)</label>
            {loading && <Spinner />}
            <div className="flex flex-wrap gap-4">
              {allKeywords.map((k: Keyword) => (
                <span
                  onClick={() => {
                    if (
                      selectedKeywords
                        .map((sk) => sk.keyword)
                        .includes(k.keyword)
                    ) {
                      setSelectedKeywords((prev) => {
                        return prev.filter((sk) => sk._id !== k._id);
                      });
                    } else {
                      setSelectedKeywords((prev) => {
                        return [...prev, k];
                      });
                    }
                  }}
                  key={k._id}
                  className={`${
                    selectedKeywords.map((sk) => sk.keyword).includes(k.keyword)
                      ? "bg-purple-700 text-white"
                      : "bg-gray-200 text-black"
                  } rounded-md px-1.5 py-1 cursor-pointer`}
                >
                  {k.keyword.toLocaleLowerCase()}
                </span>
              ))}
            </div>
          </div>
          {/* Keywords */}
          <div className="mb-4 flex items-center">
            <label className="mr-4">Add Keyword</label>
            <input
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              type="text"
              className="w-[250px] border-b border-gray-400 focus:ring-0 focus:outline-none"
            />
            <button
              onClick={() => {
                if (
                  !allKeywords
                    .map((ak: Keyword) => ak.keyword.toLocaleLowerCase())
                    .includes(newKeyword.toLocaleLowerCase())
                ) {
                  addNewKeyword();
                }
              }}
              className="bg-purple-200 font-bold w-8 h-8 px-1 py-1 ml-4 flex justify-center items-center"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex justify-end items-center p-4">
          <button
            onClick={cancel}
            className="bg-gray-400 hover:bg-gray-600  text-white shadow-lg text-sm px-2 py-1.5 rounded-md mr-6"
          >
            Cancel
          </button>
          <button
            disabled={topic.length < 1 || selectedKeywords.length < 1}
            onClick={addNewTopic}
            className="bg-purple-900 disabled:bg-purple-50 disabled:text-black disabled:cursor-not-allowed    hover:bg-purple-700 shadow-lg text-white text-sm px-2 py-1.5 rounded-md"
          >
            Add Topic
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTopicModal;
