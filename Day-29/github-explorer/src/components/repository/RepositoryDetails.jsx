function RepositoryDetails({ repository }) {
  if (!repository) return null;

  const stats = [
    { label: "Stars", value: repository.stargazers_count ?? 0 },
    { label: "Forks", value: repository.forks_count ?? 0 },
    { label: "Watchers", value: repository.watchers_count ?? 0 },
    { label: "Open issues", value: repository.open_issues_count ?? 0 },
  ];

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_20px_60px_-20px_rgba(15,23,42,0.16)]">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 px-6 py-8 text-white sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-300">Repository overview</p>
              <h1 className="mt-2 text-3xl font-semibold">{repository.full_name}</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                {repository.description || "No description was provided for this repository."}
              </p>
            </div>
            <a
              href={repository.html_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
            >
              Open on GitHub
            </a>
          </div>
        </div>

        <div className="grid gap-3 p-6 sm:grid-cols-2 lg:grid-cols-4 sm:p-8">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
              <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Repository details</h2>
          <div className="mt-5 space-y-3 text-sm text-slate-600">
            <div className="flex justify-between rounded-2xl bg-slate-50 px-4 py-3">
              <span className="font-medium text-slate-700">Language</span>
              <span>{repository.language || "Unknown"}</span>
            </div>
            <div className="flex justify-between rounded-2xl bg-slate-50 px-4 py-3">
              <span className="font-medium text-slate-700">Default branch</span>
              <span>{repository.default_branch || "main"}</span>
            </div>
            <div className="flex justify-between rounded-2xl bg-slate-50 px-4 py-3">
              <span className="font-medium text-slate-700">Created</span>
              <span>{repository.created_at ? new Date(repository.created_at).toLocaleDateString() : "Unknown"}</span>
            </div>
            <div className="flex justify-between rounded-2xl bg-slate-50 px-4 py-3">
              <span className="font-medium text-slate-700">Updated</span>
              <span>{repository.updated_at ? new Date(repository.updated_at).toLocaleDateString() : "Unknown"}</span>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Owner</h2>
          <div className="mt-5 flex items-center gap-4">
            <img
              src={repository.owner?.avatar_url}
              alt={repository.owner?.login}
              className="h-14 w-14 rounded-2xl object-cover"
            />
            <div>
              <p className="font-semibold text-slate-900">{repository.owner?.login || "Owner"}</p>
              <p className="text-sm text-slate-500">Repository maintainer</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RepositoryDetails;