import React from "react";
import Sidebar from "./Sidebar";

const Page = ({ content }: { content: React.ReactNode }) => {
  return (
    <div>
      <Sidebar />
      {content}
    </div>
  );
};

export default Page;
