import { title } from "@/app/config";
import { label } from "framer-motion/m";

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
  const headTitle = title.split("||")[0].trim();
  document.title = `${item?.label} | ${headTitle}`;
  if (item) setOpenMenu(item.label);
};

export const updateHash = (label: string, main: string, sub?: string) => {
  const headTitle = title.split("||")[0].trim();
  document.title = `${label} | ${headTitle}`;
  if (sub) {
    window.location.hash = `${main}/${sub}`;
  } else {
    window.location.hash = `${main}`;
  }
};