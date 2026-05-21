// src/lib/ui.tsx

export const ui = {
  container: {
    subItem: "overflow-hidden transition-all duration-300 ease-in-out bg-stone-100/50 dark:bg-stone-900/40 rounded-md",
    desktop: "w-72 h-screen fixed top-0 pt-12 left-0 z-20 bg-slate-200 dark:bg-black flex flex-col",
    tablet: "w-16 h-screen fixed top-12 left-0 z-20 bg-slate-900 border-r border-gray-800 flex flex-col",
    mobile: "absolute left-0 top-0 w-72 h-screen bg-white dark:bg-stone-950 transform transition-transform duration-300shadow-2xl flex flex-col",
    nav: "flex-1 overflow-y-auto px-3 py-4 pb-25 space-y-2 scrollbar-hide"
  },
  state:{
    def: {
      text: "text-sm font-medium tracking-wide",
      dot: "bg-slate-300 dark:bg-stone-600",
      items: "bg-transparent text-slate-900 hover:bg-slate-200/50 dark:text-stone-400 dark:hover:bg-stone-800/50 dark:hover:text-stone-100"
    },
    active: {
      text: "text-slate-900 dark:text-white font-semibold bg-stone-200 dark:bg-stone-900",
      dot: "bg-lime-500 scale-125",
      items: "bg-stone-800 text-stone-200 dark:bg-stone-800 dark:text-stone-50 shadow-sm"
    },
    inactive: {
      text: "text-slate-500 dark:text-stone-400 hover:text-slate-900 dark:hover:text-stone-200 hover:bg-slate-100 dark:hover:bg-stone-800/40",
      dot: "bg-slate-300 dark:bg-stone-600",
      items: "bg-transparent text-slate-900 hover:bg-slate-200/50 dark:text-stone-400 dark:hover:bg-stone-800/50 dark:hover:text-stone-100"
    }
  },
  mobile: {
    wrapper: "fixed inset-0 z-50 flex",
    overlay: "absolute inset-0 bg-stone-500/10 backdrop-blur-xs",
    open: "translate-x-0",
    close: "-translate-x-full"
  },
};