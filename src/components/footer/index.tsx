"use client";

import { DNS } from "@/lib/url";

export default function Footer() {
  return (
    <footer
      className="
        w-full h-10 flex items-center justify-center select-none
        text-xs
        text-gray-700 bg-slate-400/30 border-t border-white/40
        dark:text-stone-400 dark:bg-stone-950/80 dark:border-white/20
        shadow-lg
      "
    >
      &copy; 2025
      <a
        href={DNS("main")}
        className="ml-1 text-slate-800 hover:text-blue-800 dark:text-slate-400 dark:hover:text-blue-400"
      >
        Fehmi Corporation
      </a>
      . All rights reserved.
    </footer>
  );
}