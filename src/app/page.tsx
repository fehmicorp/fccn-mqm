
import SectionRegistry from "@/section/registry";
import Dash from "./dash";

export default function Root() {
  
  return (
    <div className="flex flex-col w-full space-y-6 bg-stone-100 dark:bg-stone-900/50 pb-20 px-4 min-h-full lg:px-10 xl:px-12 py-4 animate-in fade-in duration-500">
      {/* <SectionRegistry /> */}
      <Dash/>
    </div>
  )
}