import { useState, useEffect } from "react";
import {
  getCategoriesQuery,
  getTopicsByCategoryQuery,
  getTopicsQuery,
  sanityClient,
} from "../../utils";
import AddTopicModal from "./AddTopicModal";
import { Category, Topic } from "../../types";
import TopicList from "../Topic/TopicList";
import Spinner from "../Layout/Spinner";
import { WriteIcon } from "../Icons/SVGIcons";

const allCategory = {
  _id: "000",
  category: "All",
};

const CategoryHome = () => {
  const [activeTab, setActiveTab] = useState<Category>(allCategory);
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [topicsLoading, setTopicsLoading] = useState(false);
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getTopics();
  }, [categories, activeTab, showModal]);

  const getCategories = async () => {
    setLoading(true);
    const _categories = await sanityClient.fetch(getCategoriesQuery);
    setCategories(_categories);
    setLoading(false);
  };

  const getTopics = async () => {
    setTopicsLoading(true);
    const _topics = await sanityClient.fetch(
      activeTab._id === "000"
        ? getTopicsQuery
        : getTopicsByCategoryQuery(activeTab._id)
    );
    setTopics(_topics);
    setTopicsLoading(false);
  };

  const deleteTopic = async (topicID: string) => {
    await sanityClient.delete(topicID);
    getTopics();
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="w-full h-full">
      {showModal && (
        <AddTopicModal
          activeCategory={activeTab._id === "000" ? categories[0] : activeTab}
          categories={categories}
          cancel={() => setShowModal(false)}
        />
      )}
      <div className="h-full flex flex-col">
        <CategoryTabs
          categories={categories}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setShowModal={setShowModal}
        />
        {topicsLoading ? (
          <Spinner />
        ) : (
          <TopicList topics={topics} deleteTopic={deleteTopic} />
        )}
      </div>
    </div>
  );
};

export default CategoryHome;

export const CategoryTabs = ({
  categories,
  activeTab,
  setActiveTab,
  setShowModal,
}: {
  categories: Category[];
  activeTab: Category | null;
  setActiveTab: (tab: Category) => void;
  setShowModal: (val: boolean) => void;
}) => {
  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold mb-4 text-gray-600">Categories</h3>
      <div className="flex justify-between items-center mb-6">
        <nav className="max-w-3/4 flex justify-start">
          {/* Default All Category */}
          <Tab
            tab={{
              _id: "none",
              category: "All",
            }}
            activeTab={activeTab}
            setActiveTab={() => setActiveTab(allCategory)}
          />
          {/* Rest of Categories */}
          {categories.map((t: Category) => (
            <Tab
              key={t._id}
              tab={t}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ))}
        </nav>
        <button
          onClick={() => setShowModal(true)}
          className="bg-violet-900 hover:bg-violet-700 text-white py-2 px-3 rounded-md text-sm flex items-center"
        >
          <span className="mr-2">
            <WriteIcon />{" "}
          </span>
          Add Topic
        </button>
      </div>
    </div>
  );
};
// Category Tab
export const Tab = ({
  tab,
  activeTab,
  setActiveTab,
}: {
  tab: Category;
  activeTab: Category | null;
  setActiveTab: (tab: Category) => void;
}) => {
  return (
    <span
      onClick={() => setActiveTab(tab)}
      className={`${
        activeTab?.category === tab?.category
          ? "font-bold border-b-2 border-violet-900"
          : "font-normal border-b-2 border-transparent"
      } text-violet-900 cursor-pointer hover:text-violet-700 px-4 py-2`}
    >
      {tab?.category}
    </span>
  );
};
