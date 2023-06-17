import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useUser } from "../../context";
import { useNavigate } from "react-router-dom";
import { MenuIcon } from "../Icons/SVGIcons";

const Page = ({ content }: { content: React.ReactNode }) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <main className="bg-blue-50 flex h-screen relative">
      <span
        onClick={() => setShowSidebar((prev) => !prev)}
        className={`inline-block md:hidden absolute top-2 left-2 cursor-pointer z-50 ${
          showSidebar ? "text-white" : "text-purple-950"
        }`}
      >
        <MenuIcon />
      </span>
      <div className="hidden md:block w-1/6">
        <Sidebar />
      </div>
      <div className="h-full block md:hidden absolute z-40">
        {showSidebar && <Sidebar />}
      </div>

      <div className="pt-12 md:pt-4 flex-1 w-full h-full overflow-y-auto p-3 md:p-6">
        {content}
      </div>
    </main>
  );
};

export default Page;
