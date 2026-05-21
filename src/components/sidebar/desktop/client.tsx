"use client";

import { useEffect } from "react";
import { useSidebarStore } from "@/components/sidebar/lib/store";
import { Text } from "@/components/form/Text";
import { syncHashToStore } from "@/components/sidebar/lib/navigation";
import { useSidebarActions } from "@/components/sidebar/lib/action";
import { useSidebarMapper } from "@/components/sidebar/lib/mapper";

export default function DesktopSidebarClient() {

  const {
    sidebarData,
    activeMain,
    activeSub,
    openMenu,

    setActiveMain,
    setActiveSub,
    setOpenMenu,
  } = useSidebarStore();

  const {
    getSidebarClass,
    textMapper,
  } = useSidebarMapper();

  const {
    handleMainClick,
    handleSubClick,
  } = useSidebarActions();

  /**
   * Sync URL Hash
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
      {sidebarData.map((item: any, index: number) => {
        const isMainActive =
          activeMain === item.href;
        const isMenuOpen =
          openMenu === item.label;
        return (
          <div
            key={index}
            className="w-full"
          >

            <button
              onClick={() =>
                handleMainClick(item)
              }
              className={getSidebarClass(
                isMainActive
              )}
            >

              <span className="material-icons text-[20px]">
                {item.icon}
              </span>

              <Text
                variant="sidebar"
                label={item.label}
                className="flex-1"
              />

              {item.subitems && (
                <span
                  className={`
                    material-icons text-sm
                    transition-transform duration-200
                    ${isMenuOpen
                      ? "rotate-180"
                      : ""
                    }
                  `}
                >
                  expand_more
                </span>
              )}
            </button>

            {item.subitems && (

              <div
                className={textMapper.subItemContainer(
                  isMenuOpen
                )}
              >

                <div className="space-y-1 pb-2 bg-slate-50/50 dark:bg-stone-900/20 rounded-b-md">

                  {item.subitems.map(
                    (sub: any, idx: number) => {

                      const isSubActive =
                        isMainActive &&
                        activeSub === sub.href;

                      return (
                        <div
                          key={idx}
                          onClick={() =>
                            handleSubClick(
                              item,
                              sub
                            )
                          }
                          className={textMapper.subItem(
                            isSubActive
                          )}
                        >

                          <div
                            className={textMapper.dot(
                              isSubActive
                            )}
                          />

                          <span>
                            {sub.label}
                          </span>

                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}