"use client";

import { create } from "zustand";

interface SectionState {
  main: string | null;
  sub: string | null;

  setSection: (main: string, sub?: string) => void;
  scrollToSection: (main: string, sub: string) => void;
}

export const useSectionStore = create<SectionState>((set) => ({
  main: null,
  sub: null,

  setSection: (main, sub) => {
    set({ main, sub: sub || null });
  },

  scrollToSection: (main, sub) => {
    const id = `${main}-${sub}`;
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  },
}));