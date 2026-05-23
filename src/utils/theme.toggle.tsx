"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

type Theme = "light" | "dark";

const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "light";

  const saved = localStorage.getItem("theme") as Theme | null;

  if (saved === "light" || saved === "dark") {
    return saved;
  }

  return window.matchMedia("(prefers-color-scheme: dark)")
    .matches
    ? "dark"
    : "light";
};

export default function ThemeSlider() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  // -----------------------------------
  // Initialize Theme
  // -----------------------------------
  useEffect(() => {
    const initialTheme = getInitialTheme();

    setTheme(initialTheme);
    setMounted(true);
  }, []);

  // -----------------------------------
  // Apply Theme
  // -----------------------------------
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    root.setAttribute("data-theme", theme);

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  // -----------------------------------
  // Prevent hydration mismatch
  // -----------------------------------
  if (!mounted) {
    return (
      <div className="w-16 h-8 rounded-full bg-stone-300 dark:bg-stone-700" />
    );
  }

  // -----------------------------------
  // Toggle Theme
  // -----------------------------------
  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "light" ? "dark" : "light"
    );
  };

  return (
    <button
      onClick={toggleTheme}
      className={`
        hidden md:inline-flex
        relative flex items-center
        w-16 h-8
        rounded-full
        p-1
        bg-stone-300 dark:bg-stone-700
        cursor-pointer
        overflow-hidden
        ${mounted ? "transition-colors duration-300" : ""}
      `}
    >
      {/* Background Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2 text-xs">
        <FiSun className="text-yellow-500" />
        <FiMoon className="text-white" />
      </div>

      {/* Slider */}
      <motion.div
        layout={mounted}
        initial={false}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
        className="
          relative z-10
          w-6 h-6
          rounded-full
          bg-white
          shadow-md
          flex items-center justify-center
        "
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