"use client";

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

const ThemeContext = createContext<{
  isDark?: boolean;
  toggleTheme?: () => void;
}>({});

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useLayoutEffect(() => {
    const theme = localStorage.getItem("theme");

    if (theme === "dark") {
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.removeItem("theme");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((state) => !state);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(ThemeContext);
  if (context === undefined)
    throw new Error("Dark Mode Context was used outside provider");
  return context;
}

export default ThemeProvider;
