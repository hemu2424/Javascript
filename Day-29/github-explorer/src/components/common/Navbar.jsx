import { Link, NavLink } from "react-router-dom";

const navLinkClass = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-medium transition ${
    isActive ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
  }`;

function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-lg font-semibold text-white shadow-sm">
            GH
          </div>
          <div>
            <p className="text-base font-semibold tracking-tight text-slate-900">GitHub Explorer</p>
            <p className="text-xs text-slate-500">Discover repositories with ease</p>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/bookmarks" className={navLinkClass}>
            Bookmarks
          </NavLink>
          <Link
            to="/"
            className="ml-1 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-900"
            aria-label="Search"
          >
            <span className="text-lg">⌕</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;