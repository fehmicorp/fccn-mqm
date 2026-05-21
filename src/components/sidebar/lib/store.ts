"use client";

import { create } from "zustand";
import { ui } from "@/ui/sidebar";

/**
 * -----------------------------------
 * TYPES
 * -----------------------------------
 */

export type SubItem = {
  label: string;
  href: string;
};

export type SidebarItem = {
  label: string;
  icon: string;
  href: string;
  subitems?: SubItem[];
};

/**
 * Dynamic UI Type
 */
export type SidebarUI = typeof ui;

type SidebarState = {

  /**
   * -----------------------------------
   * STATE
   * -----------------------------------
   */

  mobileOpen: boolean;

  sidebarData: SidebarItem[];

  /**
   * Dynamic Sidebar UI
   */
  sidebarUI: SidebarUI;

  activeMain: string | null;
  activeSub: string | null;
  openMenu: string | null;

  isReady: boolean;
  isError: boolean;

  /**
   * -----------------------------------
   * ACTIONS
   * -----------------------------------
   */

  setSidebarData: (data: SidebarItem[]) => void;

  setSidebarUI: (
    ui: Partial<SidebarUI>
  ) => void;

  setError: () => void;

  setActiveMain: (
    href: string | null
  ) => void;

  setActiveSub: (
    href: string | null
  ) => void;

  setOpenMenu: (
    label: string | null
  ) => void;

  openMobile: () => void;

  closeMobile: () => void;

  toggleMobile: () => void;

  reset: () => void;
};

/**
 * -----------------------------------
 * STORE
 * -----------------------------------
 */

export const useSidebarStore =
  create<SidebarState>((set) => ({

    /**
     * -----------------------------------
     * INITIAL STATE
     * -----------------------------------
     */

    mobileOpen: false,

    sidebarData: [],

    /**
     * fallback ui
     */
    sidebarUI: ui,

    activeMain: null,
    activeSub: null,
    openMenu: null,

    isReady: false,
    isError: false,

    /**
     * -----------------------------------
     * DATA
     * -----------------------------------
     */

    setSidebarData: (sidebarData) =>
      set({
        sidebarData,
        isReady: true,
        isError: false,
      }),

    /**
     * -----------------------------------
     * UI
     * Deep Merge
     * -----------------------------------
     */

    setSidebarUI: (sidebarUI) =>
      set((state) => ({

        sidebarUI: {

          /**
           * ROOT
           */
          ...ui,
          ...state.sidebarUI,
          ...sidebarUI,

          /**
           * CONTAINER
           */
          container: {
            ...ui.container,
            ...state.sidebarUI.container,
            ...sidebarUI.container,
          },

          /**
           * STATE
           */
          state: {

            ...ui.state,
            ...state.sidebarUI.state,
            ...sidebarUI.state,

            /**
             * DEFAULT
             */
            def: {
              ...ui.state.def,
              ...state.sidebarUI.state?.def,
              ...sidebarUI.state?.def,
            },

            /**
             * ACTIVE
             */
            active: {
              ...ui.state.active,
              ...state.sidebarUI.state?.active,
              ...sidebarUI.state?.active,
            },

            /**
             * INACTIVE
             */
            inactive: {
              ...ui.state.inactive,
              ...state.sidebarUI.state?.inactive,
              ...sidebarUI.state?.inactive,
            },
          },

          /**
           * MOBILE
           */
          mobile: {
            ...ui.mobile,
            ...state.sidebarUI.mobile,
            ...sidebarUI.mobile,
          },
        },
      })),

    /**
     * -----------------------------------
     * ERROR
     * -----------------------------------
     */

    setError: () =>
      set({
        isError: true,
        isReady: false,
        sidebarData: [],
      }),

    /**
     * -----------------------------------
     * ACTIVE STATES
     * -----------------------------------
     */

    setActiveMain: (activeMain) =>
      set({ activeMain }),

    setActiveSub: (activeSub) =>
      set({ activeSub }),

    setOpenMenu: (openMenu) =>
      set({ openMenu }),

    /**
     * -----------------------------------
     * MOBILE
     * -----------------------------------
     */

    openMobile: () => {

      if (typeof document !== "undefined") {
        document.body.style.overflow = "hidden";
      }

      set({
        mobileOpen: true,
      });
    },

    closeMobile: () => {

      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }

      set({
        mobileOpen: false,
      });
    },

    toggleMobile: () =>
      set((state) => {

        const nextState = !state.mobileOpen;

        if (typeof document !== "undefined") {
          document.body.style.overflow =
            nextState ? "hidden" : "";
        }

        return {
          mobileOpen: nextState,
        };
      }),

    /**
     * -----------------------------------
     * RESET
     * -----------------------------------
     */

    reset: () =>
      set({

        mobileOpen: false,

        sidebarData: [],

        /**
         * restore fallback ui
         */
        sidebarUI: ui,

        activeMain: null,
        activeSub: null,
        openMenu: null,

        isReady: false,
        isError: false,
      }),
  }));
