function UserCard({ user }) {
  if (!user) return null;

  const stats = [
    { label: "Followers", value: user.followers ?? 0 },
    { label: "Following", value: user.following ?? 0 },
    { label: "Repos", value: user.public_repos ?? 0 },
  ];

  return (
    <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_20px_60px_-20px_rgba(15,23,42,0.16)]">
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 px-6 py-8 text-white sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="h-20 w-20 rounded-2xl border-4 border-white/20 object-cover shadow-lg"
            />
            <div>
              <h1 className="text-2xl font-semibold">{user.name || user.login}</h1>
              <p className="text-sm text-slate-300">@{user.login}</p>
            </div>
          </div>
          <a
            href={user.html_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
          >
            View on GitHub
          </a>
        </div>
      </div>

      <div className="space-y-6 p-6 sm:p-8">
        <p className="max-w-2xl text-base leading-7 text-slate-600">{user.bio || "This developer has not added a bio yet."}</p>

        <div className="grid gap-3 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="font-medium text-slate-900">Location</p>
            <p className="mt-1">{user.location || "Not provided"}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="font-medium text-slate-900">Company</p>
            <p className="mt-1">{user.company || "Independent"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;