"use client";

import { useEffect } from "react";

import Image from "next/image";

import { useSidebarStore } from "@/components/sidebar/lib/store";

import { setOnClickById } from "@/lib/dom";

import {
  asset,
  getBasePath,
} from "@/lib/url";

import {
  syncHashToStore,
} from "@/components/sidebar/lib/navigation";

import {
  useSidebarActions,
} from "@/components/sidebar/lib/action";

import {
  useSidebarMapper,
} from "@/components/sidebar/lib/mapper";

export default function MobileSidebarClient() {

  const {
    sidebarData,

    closeMobile,

    activeMain,
    activeSub,
    openMenu,

    setActiveMain,
    setActiveSub,
    setOpenMenu,

    sidebarUI,
  } = useSidebarStore();

  const {
    getMobileSidebarClass,
    textMapper,
  } = useSidebarMapper();

  const {
    handleMainClick: baseMainClick,
    handleSubClick: baseSubClick,
  } = useSidebarActions();

  /**
   * Main Click
   */
  function handleMainClick(item: any) {

    baseMainClick(item);

    if (!item.subitems) {
      closeMobile();
    }
  }

  /**
   * Sub Click
   */
  function handleSubClick(
    item: any,
    sub: any
  ) {

    baseSubClick(
      item,
      sub
    );

    closeMobile();
  }

  /**
   * Sync Hash
   */
  useEffect(() => {

    setOnClickById(
      "headerLogoMob",
      () => {
        window.location.href =
          getBasePath("url");
      }
    );

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

    <div className="flex flex-col h-full">

      {/* Header */}
      <div className="w-full h-12 flex items-center justify-between px-4 shrink-0 border-b border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900">

        <div className="flex items-center space-x-2">

          <Image
            width={32}
            height={32}
            src={asset("logo/icon_192.png")}
            id="headerLogoMob"
            className="w-7 h-7 cursor-pointer"
            alt="Logo"
          />

          <span className="text-lg font-semibold text-stone-900 dark:text-white">
            Accounts
          </span>
        </div>

        <span
          className="material-icons text-stone-500 dark:text-stone-400 cursor-pointer"

          onClick={closeMobile}
        >
          close
        </span>
      </div>

      {/* Navigation */}
      <nav className={sidebarUI.container.nav}>

        {sidebarData.map(
          (item: any, idx: number) => {

            const isMainActive =
              activeMain === item.href;

            const isMenuOpen =
              openMenu === item.label;

            return (

              <div
                key={idx}
                className="w-full"
              >

                <button
                  onClick={() =>
                    handleMainClick(item)
                  }

                  className={getMobileSidebarClass(
                    isMainActive
                  )}
                >

                  <span className="material-icons">
                    {item.icon}
                  </span>

                  <span className="flex-1 text-sm font-medium">
                    {item.label}
                  </span>

                  {item.subitems && (
                    <span
                      className={`
                        material-icons text-sm
                        transition-transform
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

                    <div className="space-y-1 p-1">

                      {item.subitems.map(
                        (
                          sub: any,
                          sid: number
                        ) => {

                          const isSubActive =
                            isMainActive &&
                            activeSub === sub.href;

                          return (
                            <div
                              key={sid}

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
          }
        )}
      </nav>
    </div>
  );
}