// src/lib/dom/setText.ts
"use client";

/**
 * Update the innerText of a DOM element by ID (client-side only)
 */
export function changeTextById(id: string, text: string) {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;

  el.textContent = text;
  el.setAttribute("title", text);
}
