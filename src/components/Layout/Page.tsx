import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { useUser } from "../../context";
import { useNavigate } from "react-router-dom";

const Page = ({ content }: { content: React.ReactNode }) => {
  const { user } = useUser();
  const navigate = useNavigate();
  console.log(user);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <main className="bg-blue-50 flex h-screen">
      <Sidebar />
      <div className="flex-1 w-full h-full overflow-y-auto p-6">{content}</div>
    </main>
  );
};

export default Page;
