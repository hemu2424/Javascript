import { Heart, Newspaper } from "lucide-react";

const Footer = () => {
  return <footer className="border-t border-slate-200 bg-white transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-center text-sm text-slate-500 dark:text-slate-400 sm:flex-row sm:px-6 lg:px-8 sm:text-left"><div className="flex items-center gap-2 font-bold text-slate-800 dark:text-white"><Newspaper size={18} className="text-blue-600" /> NewsHub</div><p className="flex items-center gap-1">Built for curious minds <Heart size={15} className="fill-red-500 text-red-500" /></p><p>© {new Date().getFullYear()} NewsHub</p></div></footer>
}

export default Footer
