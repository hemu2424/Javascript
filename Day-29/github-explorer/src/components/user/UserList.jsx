import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUsers, selectLoading, selectError } from "../../features/users/userSelectors";

function UserList() {
  const users = useSelector(selectUsers);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="animate-pulse rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-slate-200" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-24 rounded bg-slate-200" />
                <div className="h-3 w-32 rounded bg-slate-100" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
        <h3 className="font-semibold">We hit a snag</h3>
        <p className="mt-1 text-sm">{error}</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-600">
        <p className="text-lg font-semibold text-slate-700">Start exploring</p>
        <p className="mt-2 text-sm">Search for a GitHub user to see their profile and repositories.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {users.map((user) => (
        <div key={user.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="h-14 w-14 rounded-full border border-slate-200 object-cover"
            />
            <div className="min-w-0">
              <h3 className="truncate text-lg font-semibold text-slate-900">{user.login}</h3>
              <p className="text-sm text-slate-500">GitHub profile</p>
            </div>
          </div>

          <Link
            to={`/users/${user.login}`}
            className="mt-5 inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            View Profile
          </Link>
        </div>
      ))}
    </div>
  );
}

export default UserList;