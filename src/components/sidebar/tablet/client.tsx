"use client";

import { useEffect } from "react";

import { useSidebarStore } from "@/components/sidebar/lib/store";

import { syncHashToStore } from "@/components/sidebar/lib/navigation";

import { useSidebarActions } from "@/components/sidebar/lib/action";

import { useSidebarMapper } from "@/components/sidebar/lib/mapper";

export default function TabletSidebarClient() {

  const {
    sidebarData,
    activeMain,

    setActiveMain,
    setActiveSub,
    setOpenMenu,
  } = useSidebarStore();

  const {
    getTabletSidebarClass,
  } = useSidebarMapper();

  const {
    handleMainClick,
  } = useSidebarActions();

  /**
   * Sync Hash
   */
  useEffect(() => {

    const sync = () =>
      syncHashToStore(
        sidebarData,
        setActiveMain,
        setActiveSub,
        setOpenMenu
      );

    sync();

    window.addEventListener(
      "hashchange",
      sync
    );

    return () =>
      window.removeEventListener(
        "hashchange",
        sync
      );

  }, [
    sidebarData,
    setActiveMain,
    setActiveSub,
    setOpenMenu,
  ]);

  return (
    <>
      {sidebarData.map(
        (item: any, idx: number) => {

          const isActive =
            activeMain === item.href;

          return (
            <div
              key={idx}

              onClick={() =>
                handleMainClick(
                  item,
                  true
                )
              }

              className={getTabletSidebarClass(
                isActive
              )}

              title={item.label}
            >

              <span
                className={`
                  material-icons text-[24px]
                  transition-transform duration-200
                  ${isActive
                    ? "scale-100"
                    : "group-hover:scale-110"
                  }
                `}
              >
                {item.icon}
              </span>
            </div>
          );
        }
      )}
    </>
  );
}