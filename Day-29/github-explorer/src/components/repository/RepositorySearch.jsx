import { useEffect, useState } from "react";

import { useDebounce } from "../../hooks/useDebounce";
import { useSearchParams } from "react-router-dom";

function RepositorySearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [repo, setRepo] = useState(searchParams.get("search") || "");
  const debouncedSearch = useDebounce(repo, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (debouncedSearch.trim()) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }

    params.set("page", "1");

    setSearchParams(params);
  }, [debouncedSearch]);

  useEffect(() => {
    setRepo(searchParams.get("search") || "");
  }, [searchParams]);

  return (
    <label className="block">
      <span className="sr-only">Search repositories</span>
      <div className="flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-200">
        <span className="mr-3 text-lg text-slate-400">⌕</span>
        <input
          type="text"
          placeholder="Search repositories..."
          value={repo}
          onChange={(e) => setRepo(e.target.value)}
          className="w-full border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
        />
      </div>
    </label>
  );
}

export default RepositorySearch;