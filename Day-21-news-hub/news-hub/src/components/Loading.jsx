function Loading() {
  return <section className="space-y-6" aria-label="Loading news">
    <div className="h-10 w-64 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[1, 2, 3, 4].map((item) => <div key={item} className="overflow-hidden rounded-2xl bg-white shadow-sm transition-colors duration-300 dark:bg-slate-900"><div className="h-52 animate-pulse bg-slate-200 dark:bg-slate-800" /><div className="space-y-3 p-5"><div className="h-4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" /><div className="h-4 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" /><div className="h-16 animate-pulse rounded bg-slate-100 dark:bg-slate-800" /></div></div>)}
    </div>
  </section>;
}

export default Loading;