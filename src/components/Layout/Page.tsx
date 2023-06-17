import React, { useEffect, useState, useRef } from "react";
import Sidebar from "./Sidebar";
import { useUser } from "../../context";
import { useNavigate } from "react-router-dom";
import { MenuIcon } from "../Icons/SVGIcons";

const Page = ({ content }: { content: React.ReactNode }) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef<any>(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setShowSidebar(false);
      }
    }
    const closeOnEscPress = (e: any) => {
      if (e.key === "Escape") {
        setShowSidebar(false);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside as any);
    document.addEventListener("keydown", closeOnEscPress, false);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside as any);
      document.removeEventListener("keydown", closeOnEscPress, false);
    };
  }, [sidebarRef]);

  return (
    <main className="bg-blue-50 flex h-screen overflow-hidden relative">
      <span
        onClick={() => setShowSidebar((prev) => !prev)}
        className={`inline-block md:hidden absolute top-2 left-2 cursor-pointer z-50 ${
          showSidebar ? "text-white" : "text-violet-950"
        }`}
      >
        <MenuIcon active={showSidebar} />
      </span>
      <div className="hidden md:block w-1/6">
        <Sidebar />
      </div>
      <div ref={sidebarRef} className="h-full block md:hidden absolute z-40">
        {showSidebar && <Sidebar />}
      </div>

      <div className="pt-12 md:pt-4 flex-1 w-full h-full overflow-y-auto p-3 md:p-6">
        {content}
      </div>
    </main>
  );
};

export default Page;
