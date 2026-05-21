"use client";

import { useEffect, useState } from "react";
import registry from "@/section/registry";

type Section = {
  id: string;
  href: string;
};

export default function SectionRegistry() {
  const [active, setActive] = useState<string>("dashboard");

  useEffect(() => {
    const updateFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) {
        setActive("dashboard");
        return;
      }
      setActive(hash);
    };
    updateFromHash();
    window.addEventListener("hashchange", updateFromHash);
    return () => {
      window.removeEventListener("hashchange", updateFromHash);
    };
  }, []);
  const SectionComponent = registry[active];

  if (!SectionComponent) {
    return <div className="p-4">Section not found</div>;
  }
  return <SectionComponent />;
}