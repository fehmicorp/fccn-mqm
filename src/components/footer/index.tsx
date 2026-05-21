export default function FooterLayout() {
    return(
      <footer
        className="w-full h-auto flex-row items-center justify-center py-2
              text-sm text-gray-600 bg-slate-400/30 backdrop-blur-md 
              shadow-lg border-t border-white/40">
              <div className="w-full flex items-center justify-center space-x-2 text-xs mb-2">
                <a href="/terms hover:text-blue-600 hover:underline">Terms</a>
                <span className="px-1 text-gray-400">|</span>
                <a href="/privacy hover:text-blue-600 hover:underline">Privacy</a>
                <span className="px-1 text-gray-400">|</span>
                <a href="/security hover:text-blue-600 hover:underline">Security</a>
              </div>
              <span className="text-xs w-full flex items-center justify-center">
                &copy; 2025, Create with <span className="px-1 text-red-600 text-xs">♥</span> by Fehmi Corporation
              </span>
      </footer>
    )
}