import { useState } from "react";
import Image from "next/image";
import { useTheme } from "../../context/ThemeContext";
import Cart from "../../app/ui/Cart";
import SidebarToggle from "../../app/ui/Menu/SidebarToggle";

const DashboardLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex h-screen bg-white" style={{ background: theme.secondary, color: theme.primary }}>
      <aside
        style={{ background: theme.primary, color: theme.secondary }}
        className={`transition-all duration-300 bg-gray-100 h-100 flex flex-col ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <SidebarToggle
          isCollapsed={isCollapsed}
          toggleSidebar={toggleSidebar}
          theme={theme}
        />

        <nav
          className={`transition-opacity duration-300 ${
            isCollapsed ? "opacity-0" : "opacity-100"
          }`}
        >
          <ul className="space-y-2 px-2">
            <li>
              <a
                href="/dashboard"
                className="block px-4 py-2 text-white hover:border-b-white hover:border-b-2"
              >
                Dashboard Home
              </a>
            </li>
            <li>
              <a
                href="/dashboard/subpage"
                className="block px-4 py-2 text-white hover:border-b-white hover:border-b-2"
              >
                Subpage
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-4">{children}</main>
    </div>
  );
};

export default DashboardLayout;
