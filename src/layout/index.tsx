"use client";

import { useOverlayStore } from "./store";
import AppsAside from "./overlay/apps";

export default function OverlayLayout() {
  const { activeOverlay, closeOverlay } = useOverlayStore();
  if (!activeOverlay) return null;

  return (
    <div
      id="globalOverlay"
      className="fixed inset-0 z-50 bg-black/60"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        onClick={closeOverlay}
      />

      {/* Overlay Content Switch */}
      {activeOverlay === "apps" && <AppsAside />}
    </div>
  );
}
