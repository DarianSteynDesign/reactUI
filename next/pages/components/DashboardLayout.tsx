import { useState } from "react";
import Image from "next/image";
import { useTheme } from "../../context/ThemeContext";

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
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        <div className="p-4 flex flex-row items-center">
          <div
            className={`transition-opacity duration-300 ${
              isCollapsed ? "opacity-0" : "opacity-100"
            }`}
          >
            <Image
              src="https://placehold.co/150x150"
              alt="Picture of the author"
              width={isCollapsed ? 40 : 150}
              height={isCollapsed ? 40 : 150}
              className="rounded-full"
            />
          </div>

          <button
            onClick={toggleSidebar}
            className="mb-4 p-2 bg-blue-500 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {isCollapsed ? "▶" : "◀"}
          </button>
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

        <button
            onClick={toggleTheme}
            className="p-2 bg-blue-500 text-white rounded-md m-10 mt-auto"
          >
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
      </aside>

      <main className="flex-1 p-4">{children}</main>
    </div>
  );
};

export default DashboardLayout;
