import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";
import clsx from "clsx";

const ThemeToggle: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Set the theme after the component has mounted
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Update localStorage and the document's class on theme change
  useEffect(() => {
    if (darkMode) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div
      className={clsx("themeToggle", darkMode ? "bg-white" : "bg-sky-400")}
      onClick={() => setDarkMode(!darkMode)}
    >
      <span className="text-white">
        <FaMoon size={18} />
      </span>
      <div
        className="ball"
        style={darkMode ? { left: "2px" } : { right: "2px" }}
      ></div>
      <span className="ml-auto text-yellow-400">
        <BsSunFill size={18} />
      </span>
    </div>
  );
};

export default ThemeToggle;