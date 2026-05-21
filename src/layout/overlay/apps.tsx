"use client";

export default function AppsOverlay() {
  return (
    <aside className="absolute top-0 right-0 h-full w-full sm:w-[40%] xl:w-[35%] bg-slate-900 shadow-xl overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-white mb-4">
          All Applications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-slate-800 rounded-lg p-4 text-white hover:bg-slate-700 transition"
            >
              App {i + 1}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}