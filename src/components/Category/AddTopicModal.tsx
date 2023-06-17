import { useEffect, useState } from "react";
import { getKeywordsQuery, sanityClient } from "../../utils";
import Spinner from "../Layout/Spinner";
import { Category, Keyword } from "../../types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useUser } from "../../context";

const AddTopicModal = ({
  categories,
  activeCategory,
  cancel,
}: {
  categories: Category[];
  activeCategory: Category;
  cancel: () => void;
}) => {
  const [topic, setTopic] = useState("");
  const [allKeywords, setAllKeywords] = useState<Keyword[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<Keyword[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    activeCategory._id
  );
  const [newKeyword, setNewKeyword] = useState("");
  const { user } = useUser();
  const queryClient = useQueryClient();

  // Fetch Keywords using React Query
  const {
    isLoading: isKeywordsLoading,
    error: keywordError,
    data: keywordData,
  } = useQuery({
    queryKey: ["fetchKeywords"],
    queryFn: async () => {
      let result: Keyword[] = await sanityClient.fetch(getKeywordsQuery);
      return result;
    },
  });

  useEffect(() => {
    if (keywordData && keywordData?.length > 0) {
      setAllKeywords(keywordData);
    }
    if (keywordError) {
      console.log("Error fetching categories!");
    }
  }, [keywordData, keywordError]);

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
        queryClient.invalidateQueries(["fetchKeywords"]);
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
        createdBy: {
          _type: "reference",
          _ref: user?.id,
        },
      })
      .then((res) => {
        console.log(res);
        queryClient.invalidateQueries(["fetchTopics"]);
        queryClient.invalidateQueries(["fetchTopicByID"]);
        // Close Modal
        cancel();
      });
  };

  return (
    <div className="min-w-full min-h-screen fixed top-0 left-0 overflow-hidden bg-gray-900/20 flex justify-center items-center z-[100]">
      <div
        className={
          "w-[90%] md:w-[640px] min-h-[250px] md:min-h-[452px] overflow-y-auto bg-white shadow-lg rounded-2xl overflow-hidden z-[50] flex flex-col"
        }
      >
        <div className="bg-violet-900 p-2 md:p-4 text-white">
          <h3 className="text-center">Add a topic</h3>
        </div>
        <div className="p-4 md:p-6 flex-1">
          {/* Topic */}
          <div className="mb-4">
            <label className="block mb-2 text-sm md:text-base">Topic</label>
            <input
              autoFocus
              className="border border-gray-400 rounded-lg p-1 md:p-2 block w-full text-sm md:text-base"
              type="text"
              placeholder="Add topic title"
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          {/* Category */}
          <div className="mb-4">
            <label className="block mb-2 text-sm md:text-base">Category</label>
            <select
              className="w-full md:w-1/3 border border-gray-400 rounded-lg p-1 md:p-2 text-sm md:text-base"
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
          <div className="mb-8">
            <label className="block mb-2 text-sm md:text-base">
              Keywords (select atleast one)
            </label>
            {isKeywordsLoading && <Spinner />}
            <div className="max-h-[100px] md:max-h-[250px] overflow-y-auto flex flex-wrap gap-2">
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
                        return [k, ...prev];
                      });
                    }
                  }}
                  key={k._id}
                  className={`${
                    selectedKeywords.map((sk) => sk.keyword).includes(k.keyword)
                      ? "bg-violet-700 text-white"
                      : "bg-gray-200 text-black"
                  } rounded-md px-1.5 py-1 cursor-pointer text-xs self-center`}
                >
                  {k.keyword.toLocaleLowerCase()}
                </span>
              ))}
            </div>
          </div>
          {/* Keywords */}
          <div className="mb-4 flex flex-wrap items-center">
            <label className="mr-4 text-sm md:text-base">Add Keyword</label>
            <input
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              type="text"
              className="w-full md:w-[250px] border-b border-gray-400 focus:ring-0 focus:outline-none text-sm md:text-base"
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
              className="bg-violet-200 font-bold mt-4 md:mt-0 md:ml-4 w-[50px] md:w-8 md:h-8 px-1 py-1 flex justify-center items-center"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex justify-end items-center p-2 md:p-4">
          <button
            onClick={cancel}
            className="bg-gray-400 hover:bg-gray-600  text-white shadow-lg text-xs md:text-sm px-2 py-1.5 rounded-md mr-6"
          >
            Cancel
          </button>
          <button
            disabled={topic.length < 1 || selectedKeywords.length < 1}
            onClick={addNewTopic}
            className="bg-violet-900 disabled:bg-violet-50 disabled:text-black disabled:cursor-not-allowed    hover:bg-violet-700 shadow-lg text-white text-xs md:text-sm px-2 py-1.5 rounded-md"
          >
            Add Topic
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTopicModal;
