import React from "react";
import Sidebar from "./Sidebar";

const Page = ({ content }: { content: React.ReactNode }) => {
  return (
    <main className="bg-blue-50 flex h-screen">
      <Sidebar />
      <div className="h-full overflow-y-auto p-6">{content}</div>
    </main>
  );
};

export default Page;
