import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-screen h-screen overflow-hidden text-xl bg-violet-950 text-white flex flex-col justify-center items-center">
      404, Page not found!
      <Link
        className="w-[150px] mx-auto mt-4 p-1 md:p-1 rounded border border-violet-900 flex items-center justify-center text-xs md:text-base"
        to="/"
      >
        Back
      </Link>
    </div>
  );
};

export default NotFound;
