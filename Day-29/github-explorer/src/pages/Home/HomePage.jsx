import SearchBar from "../../components/common/SearchBar";
import UserList from "../../components/user/UserList";

function HomePage() {
  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.18)] sm:p-10 lg:p-14">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-600">
              <span className="mr-2 h-2.5 w-2.5 rounded-full bg-emerald-500" />
              Search GitHub users and repositories in seconds
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                Explore the open source world with clarity.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                Find developers, inspect repositories, save favorites, and stay focused with a calmer way to browse GitHub.
              </p>
            </div>
            <div className="max-w-xl rounded-2xl border border-slate-200 bg-slate-50 p-3 shadow-inner">
              <SearchBar />
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-8 text-white shadow-xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
              <span className="text-3xl font-semibold">GH</span>
            </div>
            <div className="mt-8 space-y-4">
              <h2 className="text-2xl font-semibold">Built for focused discovery</h2>
              <p className="text-sm leading-7 text-slate-300">
                Browse repositories, compare projects, and keep the ones you love close at hand.
              </p>
              <div className="flex flex-wrap gap-2 pt-3">
                <span className="rounded-full bg-white/10 px-3 py-1 text-sm">Clean UI</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-sm">Fast search</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-sm">Bookmarks</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Discover</p>
            <h2 className="text-2xl font-semibold text-slate-900">Popular GitHub profiles</h2>
          </div>
          <p className="text-sm text-slate-500">Search for a username to explore their repositories.</p>
        </div>
        <UserList />
      </section>
    </div>
  );
}

export default HomePage;