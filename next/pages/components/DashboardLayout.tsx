import { useState } from "react";
import Image from "next/image";
import { useTheme } from "../../context/ThemeContext";
import Cart from "../../app/ui/Cart";

const DashboardLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex h-screen">
      <aside
        className={`transition-all duration-300 bg-gray-100 h-100 flex flex-col ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="p-4 flex flex-row items-center m-auto mt-0 mb-0">
          <div
            className={`transition-opacity duration-300 ${
              isCollapsed ? "opacity-0" : "opacity-100"
            }`}
          >
            <Image
              src="https://placehold.co/65x65"
              alt="Picture of the author"
              width={isCollapsed ? 40 : 65}
              height={isCollapsed ? 40 : 65}
              className="rounded-full"
            />

            <Cart />
          </div>
        </div>

        <nav
          className={`transition-opacity duration-300 ${
            isCollapsed ? "opacity-0" : "opacity-100"
          }`}
        >
          <ul className="space-y-2 px-2">
            <li>
              <a
                href="/dashboard"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-md"
              >
                Dashboard Home
              </a>
            </li>
            <li>
              <a
                href="/dashboard/subpage"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-md"
              >
                Subpage
              </a>
            </li>
          </ul>
        </nav>

        <div
          className={`flex mt-auto ${isCollapsed ? "flex-col" : "flex-row"}`}
        >
          <button
            onClick={toggleSidebar}
            className="p-2 bg-blue-500 text-white rounded-md m-10 mt-auto ml-auto mr-auto"
          >
            {isCollapsed ? "Open" : "Close"}
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 bg-gray-500 text-white rounded-md m-10 mt-auto ml-auto mr-auto"
          >
            {theme === "light" ? "Dark" : "Light"}
          </button>
        </div>
      </aside>

      <main className="flex-1 p-4">{children}</main>
    </div>
  );
};

export default DashboardLayout;
