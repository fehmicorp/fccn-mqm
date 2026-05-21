"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

type Theme = "light" | "dark";

export default function ThemeSlider() {
  const [theme, setTheme] = useState<Theme>("light");

  // -----------------------------------
  // Initialize Theme
  // -----------------------------------
  useEffect(() => {
    const saved =
      (localStorage.getItem("theme") as Theme) || "light";

    applyTheme(saved);
  }, []);

  // -----------------------------------
  // Apply Theme
  // -----------------------------------
  const applyTheme = (next: Theme) => {
    const root = document.documentElement;

    // data-theme for custom css vars
    root.setAttribute("data-theme", next);

    // tailwind dark mode
    if (next === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", next);
    setTheme(next);
  };

  // -----------------------------------
  // Toggle Theme
  // -----------------------------------
  const toggleTheme = () => {
    applyTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="
        relative flex items-center
        w-16 h-8
        rounded-full
        p-1
        transition-colors
        duration-300
        bg-stone-300 dark:bg-stone-700
        cursor-pointer
        overflow-hidden
      "
    >
      {/* Background Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2 text-xs">
        <FiSun className="text-yellow-500" />
        <FiMoon className="text-white" />
      </div>

      {/* Slider */}
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
        className={`
          relative z-10
          w-6 h-6
          rounded-full
          bg-white
          shadow-md
          flex items-center justify-center
        `}
        animate={{
          x: theme === "dark" ? 32 : 0,
        }}
      >
        {theme === "light" ? (
          <FiSun className="text-yellow-500 text-sm" />
        ) : (
          <FiMoon className="text-stone-800 text-sm" />
        )}
      </motion.div>
    </button>
  );
}