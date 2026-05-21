import { useSidebarStore } from "@/components/sidebar/lib/store";

/**
 * -----------------------------------
 * SHARED BASE STYLES
 * -----------------------------------
 */

const desktopBase = `
  w-full text-left flex items-center
  space-x-3 rounded-md px-3 py-2
  transition-all duration-200
  group cursor-pointer
`;

const tabletBase = `
  w-12 h-12 flex items-center
  justify-center rounded-md
  transition-all duration-200
  group mx-auto cursor-pointer
`;

const mobileBase = `
  w-full text-left flex items-center
  space-x-3 px-3 py-4
  rounded-md transition-all duration-200
`;

/**
 * -----------------------------------
 * MAPPER HOOK
 * -----------------------------------
 */

export const useSidebarMapper = () => {

  const sidebarUI = useSidebarStore(
    (s) => s.sidebarUI
  );

  /**
   * -----------------------------------
   * DESKTOP
   * -----------------------------------
   */

  const getSidebarClass = (
    isActive: boolean
  ) => {

    const state = isActive
      ? sidebarUI.state.active.items
      : sidebarUI.state.inactive.items;

    return `
      ${desktopBase}
      ${state}
    `;
  };

  /**
   * -----------------------------------
   * TABLET
   * -----------------------------------
   */

  const getTabletSidebarClass = (
    isActive: boolean
  ) => {

    const state = isActive
      ? sidebarUI.state.active.items
      : sidebarUI.state.inactive.items;

    return `
      ${tabletBase}
      ${state}
    `;
  };

  /**
   * -----------------------------------
   * MOBILE
   * -----------------------------------
   */

  const getMobileSidebarClass = (
    isActive: boolean
  ) => {

    const state = isActive
      ? sidebarUI.state.active.items
      : sidebarUI.state.inactive.items;

    return `
      ${mobileBase}
      ${state}
    `;
  };

  /**
   * -----------------------------------
   * TEXT MAPPER
   * -----------------------------------
   */

  const textMapper = {

    /**
     * Sidebar Text
     */
    sidebar: sidebarUI.state.inactive.text,

    /**
     * Submenu Container
     */
    subItemContainer: (
      isOpen: boolean
    ) => `
      ${sidebarUI.container.subItem}

      ${isOpen
        ? "max-h-96 opacity-100 mt-1"
        : "max-h-0 opacity-0"
      }
    `,

    /**
     * Submenu Item
     */
    subItem: (
      isActive: boolean
    ) => `

      flex items-center
      space-x-2
      group cursor-pointer
      transition-all
      px-3 py-1.5
      rounded-md pl-6

      ${isActive
        ? sidebarUI.state.active.text
        : sidebarUI.state.inactive.text
      }
    `,

    /**
     * Dot
     */
    dot: (
      isActive: boolean
    ) => `

      w-1.5 h-1.5
      rounded-full
      transition-all

      ${isActive
        ? sidebarUI.state.active.dot
        : sidebarUI.state.inactive.dot
      }
    `,
  };

  return {

    sidebarUI,

    getSidebarClass,
    getTabletSidebarClass,
    getMobileSidebarClass,

    textMapper,
  };
};
