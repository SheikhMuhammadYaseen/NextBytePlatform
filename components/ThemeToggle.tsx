import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";
import clsx from "clsx";

const ThemeToggle: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
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