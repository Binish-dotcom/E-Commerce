import { useEffect, useState } from "react";

// Simple persisted dark-mode toggle for the Admin Dashboard.
// Adds/removes the "dark" class on <html>, matched by the
// `@custom-variant dark` rule in index.css.
const useAdminTheme = () => {
  const [isDark, setIsDark] = useState(() => localStorage.getItem("admin-theme") === "dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("admin-theme", isDark ? "dark" : "light");
  }, [isDark]);

  return { isDark, toggleTheme: () => setIsDark((prev) => !prev) };
};

export default useAdminTheme;
