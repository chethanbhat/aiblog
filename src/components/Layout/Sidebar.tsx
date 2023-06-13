import { Link, NavLink, useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import { useUser } from "../../context";

const Sidebar = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  return (
    <aside className="w-1/6 h-full p-6 bg-violet-900 text-white flex flex-col">
      {/* Brand */}
      <Link to="/" className="h-[150px] text-xl font-bold hover:text-amber-300">
        AI Blog Generator
      </Link>
      {/* Menu */}
      <nav>
        <MenuItem url="/" title="Categories" />
        <MenuItem url="/blog" title="Blog" />
        <button
          onClick={() => {
            googleLogout();
            localStorage.removeItem("user");
            setUser(null);
            navigate("/");
          }}
          className="block cursor-pointer text-white hover:text-amber-300"
        >
          Logout
        </button>
      </nav>
      {/* Footer */}
      <div className="flex-1 flex flex-col justify-end">
        <div className="mb-6 border-b border-blue-100"></div>
        <a className="hover:text-amber-300" href="https://chethanbhat.com">
          @2023 - chethanbhat.com
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;

export const MenuItem = ({ url, title }: { url: string; title: string }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        `block mb-4  ${
          isActive
            ? `font-semibold text-amber-300`
            : `text-white hover:text-amber-300`
        }`
      }
      to={url}
    >
      {title}
    </NavLink>
  );
};
