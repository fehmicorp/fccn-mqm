"use client";

import DesktopSidebarClient from "./client";
import { useSidebarStore } from "@/components/sidebar/lib/store";

export default function DesktopSidebar() {
  const sidebarUI = useSidebarStore(
    (s) => s.sidebarUI
  );
  return (
    <aside className={sidebarUI.container.desktop}>
      <nav className={sidebarUI.container.nav}>
        <DesktopSidebarClient />
      </nav>
    </aside>
  );
}