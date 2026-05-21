export type RawSidebarItem = {
  id: string;
  label: string;
  icon: string | null;
  href: string;
  parent: string | false;
  hasChildren: boolean;
};

export type SidebarItem = {
  label: string;
  icon: string;
  href: string;
  subitems?: { label: string; href: string }[];
};

export type SidebarResponse = {
  data: SidebarItem[];
  ui: Record<string, any>;
};

export function transformSidebar(raw: {
  data: RawSidebarItem[];
  ui?: Record<string, any>;
}): SidebarResponse {

  const parentMap: Record<string, SidebarItem> = {};
  const result: SidebarItem[] = [];

  // -------------------------
  // Create Parent Items
  // -------------------------
  raw.data.forEach((item) => {
    if (!item.parent) {
      const parent: SidebarItem = {
        label: item.label,
        icon: item.icon || "circle",
        href: item.href,
      };

      if (item.hasChildren) {
        parent.subitems = [];
      }

      parentMap[item.id] = parent;
      result.push(parent);
    }
  });

  // -------------------------
  // Attach Child Items
  // -------------------------
  raw.data.forEach((item) => {
    if (item.parent && parentMap[item.parent]) {
      parentMap[item.parent].subitems?.push({
        label: item.label,
        href: item.href,
      });
    }
  });

  return {
    data: result,
    ui: raw.ui || {},
  };
}