"use client";

import { useSidebarStore } from "@/components/sidebar/lib/store";
import { useSectionStore } from "@/section/store";
import { updateHash } from "@/components/sidebar/lib/navigation";

export const useSidebarActions = () => {
  const { setActiveMain, setActiveSub, setOpenMenu, openMenu } = useSidebarStore();
  const { setSection } = useSectionStore();
  const handleMainClick = (item: any, isTablet: boolean = false) => {
    setActiveMain(item.href);
    if (item.subitems) {
      if (isTablet || !item.subitems) {
        setActiveSub("");
        setSection(item.href);
        updateHash(item.href);
      } else {
        setOpenMenu(openMenu === item.label ? "" : item.label);
      }
    } else {
      setActiveSub("");
      setSection(item.href);
      updateHash(item.href);
    }
  };

  const handleSubClick = (item: any, sub: any) => {
    setActiveMain(item.href);
    setActiveSub(sub.href);
    setSection(item.href, sub.href);
    updateHash(item.href, sub.href);    
  };

  return { handleMainClick, handleSubClick };
};