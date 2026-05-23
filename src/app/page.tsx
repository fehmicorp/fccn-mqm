import DynamicLayout from "@/components/dynamic";
import Dash from "./dash";

export default function Root() {
  
  return (
    <div className="flex flex-col w-full space-y-6 bg-white dark:bg-stone-900/50 pb-20 min-h-full py-4 animate-in fade-in duration-500">
      <DynamicLayout />
      {/* <Dash/> */}
    </div>
  )
}