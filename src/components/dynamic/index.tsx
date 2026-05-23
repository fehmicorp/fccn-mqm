"use client";

import React, { JSX, useEffect, useCallback, useMemo } from "react";
import { useSidebarStore } from "@/components/sidebar/lib/store";
import { useDynamicStore } from "./lib/store";
import { fetchContentData, LayoutCache, LAYOUT_TTL } from "@/calls/dynamic";

interface LayoutNode {
  id: string;
  type: string;
  pageTag: string | null;
  secTag: string | null;
  parent: string | null;
  className?: string;
  content?: string | null;
  children?: string[] | null;
  eleId?: string;
  map?: string;
  classMap?: {
    data: string;
    condition: "===" | "!==" | ">=" | "<=" | ">" | "<";
    value: any;
    true: string;
    false: string;
  };
}

export const Data: Record<string, any> = {
  brokerMetrics: {
    totalInFlight: 4329,
    globalThroughput: "1,240 msg/sec",
    avgLatency: "142ms",
    activeWorkers: 48,
    backpressureStatus: "Normal"
  },
  analyticsChannels: [
    {
      tag: "email",
      title: "Email Queue (SMTP/SES Cluster)",
      successRate: 98.42,
      ingressRate: "340 m/s",
      egressRate: "338 m/s",
      lag: 142,
      dlqCount: 14,
      p95Latency: "420ms",
      p99Latency: "1.2s",
      memoryUsage: "1.2",
      status: "optimal",
    },
    {
      tag: "whatsapp",
      title: "WhatsApp Business API Gateway",
      successRate: 99.89,
      ingressRate: "720 m/s",
      egressRate: "719 m/s",
      lag: 12,
      dlqCount: 2,
      p95Latency: "85ms",
      p99Latency: "210ms",
      memoryUsage: "2.4",
      status: "optimal",
    },
    {
      tag: "sms",
      title: "SMS Aggregator Node (Twilio/Infobip)",
      successRate: 94.12,
      ingressRate: "180 m/s",
      egressRate: "145 m/s",
      lag: 1890,
      dlqCount: 142,
      p95Latency: "850ms",
      p99Latency: "4.6s",
      memoryUsage: "850",
      status: "degraded",
    }
  ]
};

/**
 * Safely parses mustache strings and looks up values across nested paths
 * falling back gracefully to base context scopes.
 */
function resolveTemplateValue(
  templateStr: string | null | undefined, 
  itemCtx: Record<string, any>, 
  globalCtx: Record<string, any>
): string {
  if (!templateStr) return "";
  
  const mustacheRegex = /\{\{\s*([\w.]+)\s*\}\}/g;
  
  return templateStr.replace(mustacheRegex, (_, path: string) => {
    try {
      let value = path.split(".").reduce<any>((acc, objKey) => acc?.[objKey], itemCtx);
      
      if (value === undefined || value === null) {
        value = path.split(".").reduce<any>((acc, objKey) => acc?.[objKey], globalCtx);
      }

      return value === null || value === undefined ? "" : String(value);
    } catch {
      return "";
    }
  });
}

/**
 * Evaluates operational conditions against runtime values dynamically
 */
function evaluateCondition(leftOperand: any, condition: string, rightOperand: any): boolean {
  switch (condition) {
    case "===": return leftOperand === rightOperand;
    case "!==": return leftOperand !== rightOperand;
    case ">=":  return Number(leftOperand) >= Number(rightOperand);
    case "<=":  return Number(leftOperand) <= Number(rightOperand);
    case ">":   return Number(leftOperand) > Number(rightOperand);
    case "<":   return Number(leftOperand) < Number(rightOperand);
    default:    return false;
  }
}

export default function DynamicLayout() {
  const sidebarData = useSidebarStore((state) => state.sidebarData);
  const isSidebarReady = useSidebarStore((state) => state.isReady);
  const activeMain = useSidebarStore((state) => state.activeMain);
  const activeSub = useSidebarStore((state) => state.activeSub);
  
  const setActiveMain = useSidebarStore((state) => state.setActiveMain);
  const setActiveSub = useSidebarStore((state) => state.setActiveSub);

  const layoutData = useDynamicStore((state) => state.layoutData) as LayoutNode[] | null;
  const isLayoutReady = useDynamicStore((state) => state.isLayoutReady);
  const layoutError = useDynamicStore((state) => state.layoutError);
  
  const setLayoutData = useDynamicStore((state) => state.setLayoutData);
  const setLayoutReady = useDynamicStore((state) => state.setLayoutReady);
  const setLayoutError = useDynamicStore((state) => state.setLayoutError);

  const nodeMap = useMemo(() => {
    const map = new Map<string, LayoutNode>();
    if (!layoutData || !Array.isArray(layoutData)) return map;
    for (const node of layoutData) {
      map.set(node.id, node);
    }
    return map;
  }, [layoutData]);

  const loadLayoutData = useCallback(async (forceFetch = false) => {
    if (!activeMain) return;
    try {
      const networkPayload = await fetchContentData(activeMain, activeSub);
      setLayoutData(networkPayload);
      LayoutCache.set(activeMain, activeSub, networkPayload);
      setLayoutReady(true);
    } catch (err) {
      setLayoutError();
    }
  }, [activeMain, activeSub, setLayoutData, setLayoutReady, setLayoutError]);

  useEffect(() => {
    if (!isSidebarReady || sidebarData.length === 0) return;

    function evaluateHashRouting() {
      const currentHash = window.location.hash.replace("#", "");
      if (!currentHash) {
        const firstRoute = sidebarData[0];
        if (!firstRoute) return;

        if (firstRoute.subitems && firstRoute.subitems.length > 0) {
          const firstSub = firstRoute.subitems[0];
          window.location.hash = `${firstRoute.href}/${firstSub.href}`;
        } else {
          window.location.hash = firstRoute.href;
        }
        return;
      }

      const [mainPath, subPath] = currentHash.split("/");
      setActiveMain(mainPath || null);
      setActiveSub(subPath || null);
    }

    evaluateHashRouting();
    window.addEventListener("hashchange", evaluateHashRouting);
    return () => window.removeEventListener("hashchange", evaluateHashRouting);
  }, [sidebarData, isSidebarReady, setActiveMain, setActiveSub]);

  useEffect(() => {
    if (!activeMain) return;
    loadLayoutData();
    const pollingInterval = setInterval(() => { loadLayoutData(true); }, LAYOUT_TTL);
    return () => clearInterval(pollingInterval);
  }, [activeMain, activeSub, loadLayoutData]);

  /**
   * Recursive tree walking processor supporting collection data loops & operational conditionals
   */
  function renderNode(id: string, currentItemCtx: Record<string, any> = {}): React.ReactNode {
    const node = nodeMap.get(id);
    if (!node) return null;

    if (node.pageTag !== activeMain) return null;
    if (activeSub && node.secTag !== activeSub) return null;

    // 💡 SCENARIO A: Collection structural looping map engine
    if (node.map && Array.isArray(Data[node.map])) {
      const collectionDataset = Data[node.map] as Array<Record<string, any>>;

      const innerLoopContent = collectionDataset.map((itemData, index) => {
        return node.children?.map((childId) => {
          return (
            <React.Fragment key={`${childId}-loop-${index}-${itemData.tag || index}`}>
              {renderNode(childId, itemData)}
            </React.Fragment>
          );
        });
      });

      const elementProps = {
        id: node.eleId || undefined,
        className: node.className || undefined,
      };

      return <div key={node.id} {...elementProps}>{innerLoopContent}</div>;
    }

    // 💡 SCENARIO B: Operational Style evaluation engine (===, !==, >=, <=, etc.)
    let runtimeStyles = node.className || "";
    if (node.classMap) {
      const { data: dataField, condition, value: targetValue, true: trueClass, false: falseClass } = node.classMap;
      const actualValue = currentItemCtx[dataField];
      
      const isConditionMet = evaluateCondition(actualValue, condition, targetValue);
      runtimeStyles = `${runtimeStyles} ${isConditionMet ? trueClass : falseClass}`.trim();
    }

    const children = node.children
      ?.map((childId) => renderNode(childId, currentItemCtx))
      .filter(Boolean);

    const inner = node.content !== undefined && node.content !== null
      ? resolveTemplateValue(node.content, currentItemCtx, Data)
      : children;

    const elementProps = {
      id: node.eleId || undefined,
      className: runtimeStyles || undefined,
    };

    switch (node.type) {
      case "section":
        return <section key={node.id} {...elementProps}>{inner}</section>;
      case "div":
        return <div key={node.id} {...elementProps}>{inner}</div>;
      case "p":
        return <p key={node.id} {...elementProps}>{inner}</p>;
      case "span":
        return <span key={node.id} {...elementProps}>{inner}</span>;
      case "h1":
      case "h2":
      case "h3": {
        const Tag = node.type as keyof JSX.IntrinsicElements;
        return <Tag key={node.id} {...elementProps}>{inner}</Tag>;
      }
      default:
        return (
          <div key={node.id} className="text-red-500 font-mono text-xs p-2">
            Unknown layout node interface target: {node.type}
          </div>
        );
    }
  }

  if (!isSidebarReady || !isLayoutReady || !activeMain) {
    return (
      <div className="w-full h-48 flex flex-col items-center justify-center gap-2 text-sm text-slate-400 font-medium">
        <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <span>Assembling application UI views...</span>
      </div>
    );
  }

  if (layoutError) {
    return (
      <div className="p-6 border border-red-200 dark:border-red-950/50 bg-red-50/50 dark:bg-red-950/10 rounded-xl text-center text-sm text-red-500 font-medium">
        Could not connect to layout channels. Retrying context aggregation pipeline...
      </div>
    );
  }

  const activeRootNode = layoutData?.find(
    (n) => n.parent === null && n.pageTag === activeMain && (activeSub ? n.secTag === activeSub : !n.secTag)
  );

  if (!activeRootNode) {
    return (
      <div className="p-6 border border-dashed border-slate-300 dark:border-slate-800 rounded-xl text-center text-sm text-slate-400">
        Missing structured configuration matrix matched for coordinates:{" "}
        <span className="font-mono text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 px-1.5 py-0.5 rounded">
          #{activeMain}{activeSub ? `/${activeSub}` : ""}
        </span>
      </div>
    );
  }

  return <>{renderNode(activeRootNode.id)}</>;
}