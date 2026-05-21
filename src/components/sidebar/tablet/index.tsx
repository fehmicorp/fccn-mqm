"use client";

import TabletSidebarClient from "./client";
import { useSidebarStore } from "@/components/sidebar/lib/store";

export default function TabletSidebar() {

  const sidebarUI = useSidebarStore(
    (s) => s.sidebarUI
  );

  return (
    <aside className={sidebarUI.container.tablet}>
      <nav className={`${sidebarUI.container.nav}`}>
        <TabletSidebarClient />
      </nav>
    </aside>
  );
}