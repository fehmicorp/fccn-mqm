"use client";

import { useEffect, useCallback } from "react";
import { useSidebarStore } from "@/components/sidebar/lib/store";
import { useHeaderStore, } from "@/components/header/store";
import { fetchData } from "@/calls/sidebar";
import { UICCache, TTL } from "@/components/sidebar/lib/cache";

export default function SidebarInitializer() {
  const setSidebarData = useSidebarStore((s) => s.setSidebarData);
  const setSidebarUI = useSidebarStore((s) => s.setSidebarUI);
  const setHeaderData = useHeaderStore( (s) => s.setHeaderData );
  const setHeaderUI = useHeaderStore( (s) => s.setHeaderUI );
  const setError = useSidebarStore((s) => s.setError);

  const loadData = useCallback(async (forceFetch = false) => {
    // 1. Check Cache first
    const cachedData = UICCache.get();
    
    if (cachedData && !forceFetch) {
      setSidebarData(cachedData.sidebar.data);
      setSidebarUI(cachedData.sidebar.ui);
      setHeaderData(cachedData.header.data);
      setHeaderUI(cachedData.header.ui);
      return;
    }
    try {
      const data = await fetchData();
      setSidebarData(data.sidebar.data);
      setSidebarUI(data.sidebar.ui);
      setHeaderData(data.header.data);
      setHeaderUI(data.header.ui);
    } catch (err) {
      setError();
    }
  }, [setSidebarData, setSidebarUI, setHeaderData, setHeaderUI, setError]);

  useEffect(() => {
    // Initial attempt
    loadData();

    // Refresh interval - only fetch when TTL expires
    const interval = setInterval(() => {
      loadData(true); // Force fetch on the interval
    }, TTL);

    return () => clearInterval(interval);
  }, [loadData]);

  return null;
}