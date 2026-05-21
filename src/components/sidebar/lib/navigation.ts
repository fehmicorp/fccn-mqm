/**
 * Synchronizes the application state based on the URL hash.
 */
export const syncHashToStore = (
  sidebarData: any[],
  setActiveMain: (val: string) => void,
  setActiveSub: (val: string) => void,
  setOpenMenu: (val: string) => void
) => {
  const hash = window.location.hash.replace("#", "");
  if (!hash) return;

  const [main, sub] = hash.split("/");
  setActiveMain(main);
  if (sub) setActiveSub(sub);

  const item = sidebarData.find((x) => x.href === main);
  if (item) setOpenMenu(item.label);
};

/**
 * Updates the browser hash without a full page reload.
 */
export const updateHash = (main: string, sub?: string) => {
  if (sub) {
    window.location.hash = `${main}/${sub}`;
  } else {
    window.location.hash = `${main}`;
  }
};