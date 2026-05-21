// src/lib/dom/events.ts
"use client";

/**
 * Attach an onClick listener to an element using its ID.
 * The handler runs only on the client.
 */
export function setOnClickById(id: string, handler: () => void) {
  if (typeof window === "undefined") return; // Ensure client-side

  const el = document.getElementById(id);
  if (!el) return;

  el.addEventListener("click", handler);
}