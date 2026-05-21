export default function SidebarSkeleton() {
  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:flex flex-col mt-12 w-72 h-screen fixed top-0 left-0 bg-slate-200 dark:bg-black p-4 space-y-3 animate-pulse">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-10 rounded-md bg-slate-300 dark:bg-stone-800" />
        ))}
      </div>

      {/* Tablet */}
      <div className="hidden sm:flex lg:hidden flex-col w-16 h-screen fixed top-0 left-0 bg-slate-900 p-2 space-y-3 animate-pulse">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="w-10 h-10 mx-auto rounded-md bg-slate-700" />
        ))}
      </div>

      {/* Mobile (only when open ideally, but safe fallback) */}
      <div className="sm:hidden fixed inset-0 z-40 flex animate-pulse">
        <div className="absolute inset-0 bg-black/30" />
        <div className="w-72 h-full bg-white dark:bg-stone-950 p-4 space-y-3">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-10 rounded-md bg-slate-200 dark:bg-stone-800" />
          ))}
        </div>
      </div>
    </>
  );
}