"use client";

import React, { JSX } from "react";
import { mainSections } from "@/data/section";

type Node = (typeof mainSections)[number];

// build lookup map ONCE (important performance fix)
const nodeMap = new Map<string, Node>(
  mainSections.map((node) => [node.id, node])
);
function renderNode(id: string): React.ReactNode {
  const node = nodeMap.get(id);

  if (!node) return null;

  const children = node.children?.map(renderNode);

  const inner = node.content ?? children; // 👈 IMPORTANT FIX

  switch (node.type) {
    case "section":
      return (
        <section key={node.id} className={node.className}>
          {inner}
        </section>
      );

    case "div":
      return (
        <div key={node.id} className={node.className}>
          {inner}
        </div>
      );

    case "p":
      return (
        <p key={node.id} className={node.className}>
          {inner}
        </p>
      );

    case "span":
      return (
        <span key={node.id} className={node.className}>
          {inner}
        </span>
      );

    case "h1":
    case "h2":
    case "h3":
      const Tag = node.type as keyof JSX.IntrinsicElements;
      return (
        <Tag key={node.id} className={node.className}>
          {inner}
        </Tag>
      );

    default:
      return (
        <div key={node.id} className="text-red-500">
          Unknown type: {node.type}
        </div>
      );
  }
}

export default function DynamicLayout() {
  const root = mainSections.find((n) => n.parent === null);

  if (!root) return null;

  return <>{renderNode(root.id)}</>;
}