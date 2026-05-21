export const mainSections = [
  {
    id: "10020",
    type: "section",
    className:
      "scroll-mt-16 w-full mx-auto text-slate-900 dark:text-slate-100 font-sans antialiased",
    children: ["10021"],
    parent: null,
  },
  {
    id: "10021",
    type: "div",
    className:
      "flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800",
    children: ["10022"],
    parent: "10020",
  },
  {
    id: "10022",
    type: "div",
    children: ["10023", "10026"],
    parent: "10021",
  },
  {
    id: "10023",
    type: "div",
    className: "flex items-center gap-3",
    children: ["10024", "10025"],
    parent: "10022",
  },

  {
    id: "10024",
    type: "h1",
    className: "text-3xl font-extrabold tracking-tight sm:text-4xl",
    content: "System Telemetry",
    children: null,
    parent: "10023",
  },

  {
    id: "10025",
    type: "span",
    className:
      "px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 animate-pulse",
    content: "Engine Live",
    children: null,
    parent: "10023",
  },

  {
    id: "10026",
    type: "p",
    className: "text-sm text-slate-500 dark:text-slate-400 mt-1",
    content:
      "Cluster-wide data pipelines for transactional and event-driven messaging tasks.",
    children: null,
    parent: "10022",
  },
];