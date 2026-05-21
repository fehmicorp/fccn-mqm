// src/utils/theme.ts
import { themeOptions } from "./format";

export type Theme = "light" | "dark";

export const applyTheme = (key: string) => {
  if (typeof window === "undefined") return;

  // Logic: night -> dark, day -> light, anything else (def) -> dark
  const target: Theme = (key === "night" || key === "def") ? "dark" : "light";

  document.documentElement.setAttribute("data-theme", target);
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(target);
  
  localStorage.setItem("theme", target);
  console.log(`UI Theme applied: ${target}`);
};