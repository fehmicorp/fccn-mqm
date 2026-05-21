"use client";

import { create } from "zustand";
import { data as fallbackData, ui as fallbackUI } from "@/ui/header";

export type HeaderData = typeof fallbackData;
export type HeaderUI = typeof fallbackUI;
type HeaderState = {
  data: HeaderData;
  ui: HeaderUI;
  setHeaderData: (data: Partial<HeaderData>) => void;
  setHeaderUI: (ui: Partial<HeaderUI>) => void;
  reset: () => void;
}
export const useHeaderStore = create<HeaderState>((set) => ({
  data: fallbackData,
  ui: fallbackUI,
  setHeaderData: (data) => set((state) => ({ data: { ...state.data, ...data } })),
  setHeaderUI: (ui) => set((state) => ({ ui: { ...state.ui, ...ui } })),
  reset: () => set({ data: fallbackData, ui: fallbackUI }),
}));