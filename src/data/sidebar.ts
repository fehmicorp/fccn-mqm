export const sidebarData = [
  {"id":"001", "tab":"sbitem", "label":"Dashboard", "icon":"dashboard", "href":"dashboard", "parent": false, "hasChildren": false},
  {"id":"002", "tab":"sbitem", "label":"Queues", "icon":"pending_actions", "href":"queues", "parent": false, "hasChildren": true},
  {"id": "101", "tag": "sbitem","label": "Active", "icon": null, "href": "active", "parent": "002", "hasChildren": false},
  {"id": "102", "tag": "sbitem","label": "Failed", "icon": null, "href": "failed", "parent": "002", "hasChildren": false},
  // {"id":"101", "tab":"sbitem", "label":"Active", "icon":null, "href":"active", "parent": "002", "hasChildren": false},
  // {"id":"102", "tab":"sbitem", "label":"Failed", "icon":null, "href":"failed", "parent": "002", "hasChildren": false},
  {"id":"005", "tab":"sbitem", "label":"Templates", "icon":"description", "href":"templates", "parent": false, "hasChildren": false},
  {"id":"006", "tab":"sbitem", "label":"Settings", "icon":"settings", "href":"settings", "parent": false, "hasChildren": false}
];

export const sidebarUI = {
  container: {
    subItem: "overflow-hidden transition-all duration-300 ease-in-out bg-stone-100/50 dark:bg-stone-700/40 rounded-md border border-slate-300/50 dark:border-stone-600/50 cursor-pointer",
    desktop: "w-72 h-screen fixed top-0 pt-12 left-0 z-20 bg-slate-200 dark:bg-stone-900 border-r border-slate-400/50 flex flex-col",
    tablet: "w-16 h-screen fixed top-12 left-0 z-20 bg-slate-200 dark:bg-stone-900 border-r border-slate-400/50 flex flex-col",
    mobile: "absolute left-0 top-0 w-72 h-screen bg-slate-200 dark:bg-stone-950 transform transition-transform duration-300shadow-2xl flex flex-col",
    nav: "flex-1 overflow-y-auto px-3 py-4 pb-25 space-y-2 scrollbar-hide"
  },
  state:{
    def: {
      text: "text-xs font-light tracking-wide hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800/40",
      dot: "bg-stone-300 dark:bg-stone-600",
      items: "bg-transparent text-stone-900 hover:bg-stone-200/50 dark:text-stone-400 dark:hover:bg-stone-600/30 dark:hover:text-stone-100"
    },
    active: {
      text: "text-stone-900 dark:text-white font-medium bg-slate-500/20 dark:bg-stone-900/50 hover:bg-slate-500/30 dark:hover:bg-stone-900/70",
      dot: "bg-lime-500 scale-125",
      items: "bg-stone-800 text-stone-200 dark:bg-stone-700 dark:text-stone-50 shadow-sm"
    },
    inactive: {
      text: "text-stone-500 dark:text-stone-400 bg-transparent font-light hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800/40 hover:shadow-sm",
      dot: "bg-stone-300 dark:bg-stone-600",
      items: "bg-transparent text-stone-900 hover:bg-stone-200/50 dark:text-stone-400 dark:hover:bg-stone-600/30 dark:hover:text-stone-100"
    }
  },
  mobile: {
    wrapper: "fixed inset-0 z-50 flex",
    overlay: "absolute inset-0 bg-stone-500/10 backdrop-blur-xs",
    open: "transtone-x-0",
    close: "-transtone-x-full"
  },
}
export const headerData = {
  title: "Messaging Queue Manager",
  logo: "logo/icon_192.png",
  profilePic: "user.png"

}
export const headerUI = {
  container: "w-full fixed top-0 z-30 h-12 bg-stone-100 dark:bg-stone-950 flex items-center justify-between navigationTop shadow px-4",
  leftSection: "flex items-center space-x-2",
  mobileMenu: "sm:hidden flex justify-center items-center",
  logo: "w-7 h-7 object-contain hidden sm:block cursor-pointer",
  title: "text-head",
  rightSection: "flex justify-center items-center space-x-4",
  themeToggle: "theme-toggle",
  appsView: "flex items-center justify-center cursor-pointer text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100",
  profilePic: {
    width: 192,
    height: 192,
    imageClass: "w-full h-full object-cover",
    class: "w-10 h-10 rounded-full overflow-hidden border-3 border-green-500  cursor-pointer dark:border-green-400 dark:bg-stone-100"
  }
}