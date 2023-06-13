import { useState, useEffect } from "react";
import { getCategoriesQuery, sanityClient } from "../../utils";
import AddTopicModal from "./AddTopicModal";

export interface Category {
  _id: string;
  category: string;
}

const allCategory = {
  _id: "000",
  category: "All",
};

const CategoryHome = () => {
  const [activeTab, setActiveTab] = useState<Category>(allCategory);
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const _categories = await sanityClient.fetch(getCategoriesQuery);
    setCategories(_categories);
  };

  return (
    <div className="w-full">
      {showModal && (
        <AddTopicModal
          activeCategory={activeTab._id === "000" ? categories[0] : activeTab}
          categories={categories}
          cancel={() => setShowModal(false)}
        />
      )}
      <CategoryTabs
        categories={categories}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setShowModal={setShowModal}
      />
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
    <div className="w-full flex justify-between items-center">
      <nav className="w-3/4 flex justify-evenly">
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
          <Tab tab={t} activeTab={activeTab} setActiveTab={setActiveTab} />
        ))}
      </nav>
      <button
        onClick={() => setShowModal(true)}
        className="bg-violet-900 hover:bg-violet-700 text-white py-2 px-3 rounded-md text-sm"
      >
        Add Topic
      </button>
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
          ? "font-bold border-b-2 border-purple-900"
          : "font-normal border-b-2 border-transparent"
      } text-purple-900 cursor-pointer hover:text-purple-700 px-4 py-2`}
    >
      {tab?.category}
    </span>
  );
};
