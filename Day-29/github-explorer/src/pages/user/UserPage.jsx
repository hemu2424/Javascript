import { useParams, useSearchParams } from "react-router-dom";
import { selectError, selectLoading, selectUser } from "../../features/users/userSelectors";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../features/users/userThunks";
import UserCard from "../../components/user/UserCard";
import { fetchRepositories } from "../../features/repositories/repositoryThunks";
import RepositoryList from "../../components/repository/RepositoryList";
import RepositorySearch from "../../components/repository/RepositorySearch";
import RepositoryFilter from "../../components/repository/RepositoryFilter";
import { setLanguage, setSearch, setSortBy } from "../../features/repositories/repositoryFilterSlice";

function UserPage() {
  const { username } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(fetchUser(username));
    dispatch(fetchRepositories(username));
  }, [dispatch, username]);

  useEffect(() => {
    dispatch(setSearch(searchParams.get("search") || ""));
    dispatch(setLanguage(searchParams.get("language") || "all"));
    dispatch(setSortBy(searchParams.get("sort") || "default"));
  }, [dispatch, searchParams]);

  return (
    <div className="space-y-8">
      {loading && (
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-48 rounded bg-slate-200" />
            <div className="h-4 w-64 rounded bg-slate-100" />
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-[28px] border border-red-200 bg-red-50 p-6 text-red-700">
          <h3 className="font-semibold">We couldn’t fetch this profile</h3>
          <p className="mt-1 text-sm">{error}</p>
        </div>
      )}

      <UserCard user={user} />

      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Repositories</p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-900">Browse this developer’s projects</h2>
          </div>
          <p className="text-sm text-slate-500">Search, filter, and explore each repository in one place.</p>
        </div>

        <div className="space-y-4">
          <RepositorySearch />
          <RepositoryFilter />
          <RepositoryList />
        </div>
      </section>
    </div>
  );
}

export default UserPage;