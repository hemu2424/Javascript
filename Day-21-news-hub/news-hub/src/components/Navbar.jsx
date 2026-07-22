import { NavLink, useNavigate } from "react-router-dom";
import categories from "../utils/categories";
import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { Bookmark, ChevronDown, Home, Newspaper, Search } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
function Navbar() {
const [search, setSearch] = useState("");
const navigate = useNavigate();
const debouncesearch = useDebounce(search,500)
 const { theme, toggleTheme } = useTheme();

useEffect(()=>{
    if(!debouncesearch.trim()) return;
    navigate(`/search?q=${encodeURIComponent(debouncesearch)}`)
},[debouncesearch,navigate])

function handleSubmit(e) {
  e.preventDefault();

  if (!search.trim()) return;

  navigate(`/search?q=${encodeURIComponent(search)}`, { replace: true });

  setSearch("");
}

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900/95">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
      <NavLink to="/" className="mr-auto flex items-center gap-2 text-xl font-extrabold tracking-tight text-slate-900 transition-colors duration-300 dark:text-white">
        <span className="rounded-xl bg-blue-600 p-2 text-white shadow-lg shadow-blue-600/20"><Newspaper size={20} /></span>
        News<span className="text-blue-600">Hub</span>
      </NavLink>

      <ul className="order-3 flex w-full flex-wrap gap-1 overflow-visible pb-1 text-sm font-semibold lg:order-2 lg:w-auto lg:pb-0">
        <li>
          <NavLink
  to="/"
  className={({ isActive }) => `flex items-center gap-1 whitespace-nowrap rounded-lg px-3 py-2 transition-colors duration-300 ${isActive ? "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"}`}
>
  <Home size={16} /> Home
</NavLink>
        </li>

        <li className="relative">
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center gap-1 whitespace-nowrap rounded-lg px-3 py-2 text-slate-600 transition-colors duration-300 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white [&::-webkit-details-marker]:hidden">
              Categories <ChevronDown size={16} className="transition-transform group-open:rotate-180" />
            </summary>
            <div className="absolute left-0 top-full z-50 mt-2 grid min-w-56 grid-cols-2 gap-1 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/10 transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/30">
              {categories.map((category) => (
                <NavLink
                  key={category}
                  to={`/category/${category}`}
                  className={({ isActive }) => `rounded-xl px-3 py-2 text-sm capitalize transition-colors duration-300 ${isActive ? "bg-blue-50 font-bold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"}`}
                >
                  {category}
                </NavLink>
              ))}
            </div>
          </details>
        </li>

        <li>
          <NavLink
  to="/"
  className={({ isActive }) => `flex items-center gap-1 whitespace-nowrap rounded-lg px-3 py-2 transition-colors duration-300 ${isActive ? "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"}`} to="/bookmarks"><Bookmark size={16} /> Bookmarks</NavLink>
        </li>

        <li>
          <NavLink
  to="/"
  className={({ isActive }) => `whitespace-nowrap rounded-lg px-3 py-2 transition-colors duration-300 ${isActive ? "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"}`} to="/about">About</NavLink>
        </li>
      </ul>

      <form onSubmit={handleSubmit} className="order-2 flex w-full gap-2 sm:w-auto lg:order-3">
        <input
  type="text"
  placeholder="Search news..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition-colors duration-300 placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 sm:w-44 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400"
/>

        <button type="submit" className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/25">
          <Search size={16} /> <span className="hidden sm:inline">Search</span>
        </button>
        <button type="button" onClick={toggleTheme} className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition-colors duration-300 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
  Toggle Theme
</button>
        
      </form>
      
      </div>
      
    </nav>
  );
}

export default Navbar;