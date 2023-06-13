import { useState } from "react";

const CategoryHome = () => {
  const [activeTab, setActiveTab] = useState(CategoryTypes.All);

  return (
    <div className="w-full">
      <CategoryTabs activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default CategoryHome;

export const CategoryTabs = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: CategoryTypes;
  setActiveTab: (tab: CategoryTypes) => void;
}) => {
  return (
    <div className="w-full flex justify-between items-center">
      <nav className="w-3/4 flex justify-evenly">
        <Tab
          tab={CategoryTypes.All}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <Tab
          tab={CategoryTypes.World}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <Tab
          tab={CategoryTypes.India}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <Tab
          tab={CategoryTypes.Technology}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <Tab
          tab={CategoryTypes.Entertainment}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <Tab
          tab={CategoryTypes.Sports}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </nav>
      <button className="bg-violet-900 hover:bg-violet-700 text-white py-2 px-3 rounded-md text-sm">
        Add Topic
      </button>
    </div>
  );
};

export const Tab = ({
  tab,
  activeTab,
  setActiveTab,
}: {
  tab: CategoryTypes;
  activeTab: CategoryTypes;
  setActiveTab: (tab: CategoryTypes) => void;
}) => {
  return (
    <span
      onClick={() => setActiveTab(tab)}
      className={`${
        activeTab === tab
          ? "font-bold border-b-2 border-purple-900"
          : "font-normal border-b-2 border-transparent"
      } text-purple-900 cursor-pointer hover:text-purple-700 px-4 py-2`}
    >
      {tab}
    </span>
  );
};

enum CategoryTypes {
  All = "All",
  World = "World",
  India = "India",
  Technology = "Technology",
  Entertainment = "Entertainment",
  Sports = "Sports",
}
