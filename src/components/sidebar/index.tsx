"use client";

import SidebarInitializer from "./lib/Initializer";
import DesktopSidebar from "./desktop";
import TabletSidebar from "./tablet";
import MobileSidebar from "./mobile";
import { useSidebarStore } from "./lib/store";
import SidebarSkeleton from "./lib/skeleton";

export default function Sidebar() {
  const { isReady } = useSidebarStore();

  return (
    <>
      <SidebarInitializer/>

      {!isReady ? (
        <SidebarSkeleton />
      ) : (
        <>
          <div className="hidden lg:block">
            <DesktopSidebar />
          </div>

          <div className="hidden sm:block lg:hidden">
            <TabletSidebar />
          </div>

          <MobileSidebar />
        </>
      )}
    </>
  );
}