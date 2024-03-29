import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoIoArroFoward } from "react-icons/io";

import logo from "../assets/logo.png";
import SidebarContext from "../context/SidebarContext";
import AuthContext from "../context/AuthContext";

const Sidebar = () => {
  const { toggleSidebar, setToggleSidebar } = useContext(SidebarContext);
  const { user } = useContext(AuthContext);
  const handleCloseSidebar = () => {
    if (toggleSidebar) setToggleSidebar(false);
  };
  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-2 pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" className="w-full" />
        </Link>
        <div className="flex flex-col gap-5 mt-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <RiHomeFill />
            Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">
            Discover categories
          </h3>
          {/* we dont want to show the last category => others */}
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSidebar}
              key={category.name}
            >
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
          onClick={handleCloseSidebar}
        >
          <img
            src={user.image}
            alt="user-profile"
            className="w-10 h-10 rouded-full"
          />
          <p>{user.userName}</p>
        </Link>
      )}
    </div>
  );
};
const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duriation-200 ease-in-out capitalize";

const isActiveStyle =
  "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duriation-200  ease-in-out capitalize";

// temporary categories just to see the layout
const categories = [
  { name: "Animals" },
  { name: "Wallpapers" },
  { name: "Gaming" },
  { name: "Coding" },
  { name: "Others" },
];
export default Sidebar;
