import { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
}

const UserContext = createContext<{ user: User | null }>({ user: null });

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/user", {
          credentials: "include",
        });
        //Todo - Add condition to skip this if we arent logged in
        // if (!response.ok) throw new Error("Unauthorized");
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
