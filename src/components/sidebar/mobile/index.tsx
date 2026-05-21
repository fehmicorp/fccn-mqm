"use client";

import { useEffect } from "react";

import { useSidebarStore } from "../lib/store";

import { setOnClickById } from "@/lib/dom";

import MobileSidebarClient from "./client";

import { useOverlayStore } from "@/layout/store";

import { getBasePath } from "@/lib/url";

export default function MobileSidebar() {

  const baseHref =
    getBasePath("url");

  const {
    sidebarData,
    sidebarUI,

    setOpenMenu,

    mobileOpen,
    openMobile,
    closeMobile,
  } = useSidebarStore();

  const {
    openOverlay,
  } = useOverlayStore();

  useEffect(() => {

    setOnClickById(
      "headerLogo",
      () => {
        window.location.href =
          baseHref;
      }
    );

    setOnClickById(
      "headerAppsView",
      () => {
        openOverlay("apps");
      }
    );

    setOnClickById(
      "headerProfilePic",
      () => {
        alert(
          "Profile button clicked!"
        );
      }
    );

    setOnClickById(
      "headerMobileMenu",
      () => {
        openMobile();
      }
    );

    const hash =
      window.location.hash.replace(
        "#",
        ""
      );

    if (hash) {

      const [main] =
        hash.split("/");

      const item =
        sidebarData.find(
          (x) => x.href === main
        );

      if (item) {
        setOpenMenu(item.label);
      }
    }

  }, [
    baseHref,
    openMobile,
    setOpenMenu,
    sidebarData,
    openOverlay,
  ]);

  return (
    <>
      {mobileOpen && (

        <div
          className={
            sidebarUI.mobile.wrapper
          }
        >

          {/* Overlay */}
          <div
            className={
              sidebarUI.mobile.overlay
            }

            onClick={closeMobile}
          />

          {/* Sidebar */}
          <aside
            className={`
              ${sidebarUI.container.mobile}

              ${mobileOpen
                ? sidebarUI.mobile.open
                : sidebarUI.mobile.close
              }
            `}

            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <MobileSidebarClient />
          </aside>
        </div>
      )}
    </>
  );
}