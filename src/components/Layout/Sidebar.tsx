import { Link, NavLink, useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import { useUser } from "../../context";
import { ReactNode } from "react";
import {
  BlogIcon,
  CategoriesIcon,
  GitHubIcon,
  LogoIcon,
  LogoutIcon,
} from "../Icons/SVGIcons";

const Sidebar = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  return (
    <aside className="w-1/6 h-full p-6 bg-violet-900 text-white flex flex-col">
      {/* Brand */}
      <Link
        to="/"
        className="h-[150px] text-xl font-bold hover:text-amber-300 flex items-center"
      >
        <span className="mr-2">
          <LogoIcon />
        </span>
        AI Blog Writer
      </Link>
      {/* Menu */}
      <nav>
        <MenuItem url="/" title="Categories" icon={<CategoriesIcon />} />
        <MenuItem url="/blog" title="Blog" icon={<BlogIcon />} />
        <button
          onClick={() => {
            googleLogout();
            localStorage.removeItem("user");
            setUser(null);
            navigate("/");
          }}
          className="flex items-center cursor-pointer text-white hover:text-amber-300"
        >
          <span className="mr-2">
            <LogoutIcon />
          </span>
          Logout
        </button>
      </nav>
      {/* Footer */}
      <div className="flex-1 flex flex-col justify-end">
        <div className="pb-6 mb-6 border-b border-blue-100 flex items-center">
          <img
            src={user?.image}
            alt={user?.username}
            className="w-8 h-8 mr-2 rounded-full"
          />
          <span>{user?.username || user?.email}</span>
        </div>
        <a
          className="hover:text-amber-300 group"
          href="https://github.com/chethanbhat/aiblog"
        >
          <h5 className="flex items-center mb-4">
            Star this Project on
            <span className="mx-2">
              <GitHubIcon />
            </span>{" "}
          </h5>
        </a>

        <a className="hover:text-amber-300" href="https://chethanbhat.com">
          @2023 - chethanbhat.com
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;

export const MenuItem = ({
  url,
  title,
  icon,
}: {
  url: string;
  title: string;
  icon: ReactNode;
}) => {
  return (
    <NavLink
      className={({ isActive }) =>
        `mb-4 flex items-center  ${
          isActive
            ? `font-semibold text-amber-300`
            : `text-white hover:text-amber-300`
        }`
      }
      to={url}
    >
      <span className="mr-2">{icon}</span>
      {title}
    </NavLink>
  );
};
