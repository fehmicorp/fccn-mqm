"use client";

import { create } from "zustand";

type OverlayID = "apps" | null;

interface OverlayState {
  activeOverlay: OverlayID;

  openOverlay: (id: OverlayID) => void;
  closeOverlay: () => void;
}

export const useOverlayStore = create<OverlayState>((set) => ({
  activeOverlay: null,

  openOverlay: (id) => {
    // lock background scroll
    document.body.style.overflow = "hidden";
    set({ activeOverlay: id });
  },

  closeOverlay: () => {
    document.body.style.overflow = "";
    set({ activeOverlay: null });
  },
}));
