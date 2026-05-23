import { create } from "zustand";

interface LayoutState {
  layoutData: any | null;
  isLayoutReady: boolean;
  layoutError: boolean;
  setLayoutData: (data: any) => void;
  setLayoutReady: (ready: boolean) => void;
  setLayoutError: () => void;
}

export const useDynamicStore = create<LayoutState>((set) => ({
  layoutData: null,
  isLayoutReady: false,
  layoutError: false,
  setLayoutData: (data) => set({ layoutData: data, layoutError: false }),
  setLayoutReady: (ready) => set({ isLayoutReady: ready }),
  setLayoutError: () => set({ layoutError: true, isLayoutReady: true }),
}));