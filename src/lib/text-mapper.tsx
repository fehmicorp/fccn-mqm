export type TextVariant = "head" | "sidebar" | "sectionH" | "label" | "body" | "def" | "cardtextpri" | "cardtextsec";

interface TextConfig {
  as: keyof JSX.IntrinsicElements;
  className: string;
}

export const textMapper: Record<TextVariant, TextConfig> = {
  // Heading for Header
  head: {
    as: "h2",
    className: "text-lg font-semibold text-black dark:text-stone-50",
  },
  // Default fallback
  def: {
    as: "span",
    className: "text-base text-stone-800 dark:text-stone-200",
  },
  // Sidebar items
  sidebar: {
    as: "span",
    className: "text-sm",
  },
  // Main page/section headers
  sectionH: {
    as: "h1",
    className: "text-stone-800 dark:text-stone-100 text-2xl font-light my-1 hidden sm:block",
  },
  // THE MISSING VARIANTS:
  label: {
    as: "span",
    className: "text-stone-600 dark:text-stone-400 text-xs md:text-sm font-light select-none",
  },
  body: {
    as: "h2",
    className: "text-stone-800 dark:text-stone-200 text-sm md:text-md font-light select-none",
  },
  // Add these to your textMapper object
  cardtextpri: {
    as: "h2",
    className: "text-lg font-semibold text-stone-900 dark:text-stone-50",
  },
  cardtextsec: {
    as: "p",
    className: "text-sm text-stone-500 dark:text-stone-400 mt-1 leading-relaxed",
  },
};