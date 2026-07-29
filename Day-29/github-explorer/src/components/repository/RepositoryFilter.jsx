import { useSelector } from "react-redux";
import { selectRepositoryLanguage, selectRepositorySort } from "../../features/repositories/repositoryFilterSelector";
import { useSearchParams } from "react-router-dom";

function RepositoryFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const language = useSelector(selectRepositoryLanguage);
  const sort = useSelector(selectRepositorySort);

  const handlefilter = (e) => {
    const params = new URLSearchParams(searchParams);
    params.set("language", e.target.value);
    params.set("page", "1");
    setSearchParams(params);
  };

  const handleSort = (e) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", e.target.value);
    params.set("page", "1");
    setSearchParams(params);
  };

  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Filter repositories</p>
        <p className="text-sm text-slate-500">Refine the results with modern controls.</p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="text-sm text-slate-600">
          <span className="mb-1 block">Language</span>
          <select
            value={language}
            onChange={handlefilter}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
          >
            <option value="all">All</option>
            <option value="JavaScript">JavaScript</option>
            <option value="TypeScript">TypeScript</option>
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="Python">Python</option>
          </select>
        </label>

        <label className="text-sm text-slate-600">
          <span className="mb-1 block">Sort by</span>
          <select
            value={sort}
            onChange={handleSort}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
          >
            <option value="default">Default</option>
            <option value="stars">Stars</option>
            <option value="forks">Forks</option>
            <option value="updated">Updated</option>
            <option value="name">Name</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export default RepositoryFilter;