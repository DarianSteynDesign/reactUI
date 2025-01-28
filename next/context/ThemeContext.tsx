import { createContext, useContext, useState, ReactNode } from "react";

const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState({ primary: "#4745ff", secondary: "#6b69f6" });

  const changeTheme = (themeName: string) => {
    switch (themeName) {
      case "Red":
        setTheme({ primary: "#cb2e2e", secondary: "#f66969" });
        break;
      case "Green":
        setTheme({ primary: "#0ace79", secondary: "#1c744e" });
        break;
      default:
        setTheme({ primary: "#4745ff", secondary: "#6b69f6" });
        break;
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
