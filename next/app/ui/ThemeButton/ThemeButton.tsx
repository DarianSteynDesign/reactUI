import { useState } from "react";
import { useTheme } from "../../../context/ThemeContext";

const ThemeButton = ({ onThemeChange }: { onThemeChange: (theme: string) => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const themes = [
    { name: "Default", colors: ["#4745ff", "#6b69f6"] },
    { name: "Red", colors: ["#cb2e2e", "#f66969"] },
    { name: "Green", colors: ["#0ace79", "#0ace79"] },
  ];

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        style={{ background: theme.primary, color: theme.secondary }}
        className="w-10 h-10 rounded-full bg-gradient-to-r from-[#4745ff] to-[#6b69f6] shadow-sm shadow-slate-800 focus:outline-none"
        title="Change Theme"
      ></button>

      {isHovered && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 bg-white p-2 rounded-lg shadow-lg space-y-2 z-50">
          {themes.map((theme) => (
            <div
              key={theme.name}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => onThemeChange(theme.name)}
            >
              <div
                className="w-6 h-6 rounded-full"
                style={{
                  background: `linear-gradient(to right, ${theme.colors[0]}, ${theme.colors[1]})`,
                }}
              ></div>
              <span className="text-sm text-gray-700">{theme.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeButton;
