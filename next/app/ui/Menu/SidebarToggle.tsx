import { Menu, X } from "lucide-react";

const SidebarToggle = ({ isCollapsed, toggleSidebar, theme }: { isCollapsed: boolean; toggleSidebar: () => void; theme: any }) => {
  return (
    <div className={`flex mt-5 ${isCollapsed ? "flex-col" : "flex-row"}`}>
      <button
        style={{ background: theme.secondary, color: "white" }}
        onClick={toggleSidebar}
        className="p-2 rounded-md m-10 mt-auto ml-auto mr-auto flex items-center justify-center"
        aria-label={isCollapsed ? "Open Menu" : "Close Menu"}
      >
        {isCollapsed ? (
          <Menu className="w-6 h-6" />
        ) : (
          <X className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};

export default SidebarToggle;
