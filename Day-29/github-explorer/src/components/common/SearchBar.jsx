import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchUsersThunk } from "../../features/users/userThunks";

function SearchBar() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (!username.trim()) return;
    dispatch(searchUsersThunk(username));
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <label className="flex-1">
        <span className="sr-only">Search GitHub users</span>
        <div className="flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-200">
          <span className="mr-3 text-lg text-slate-400">⌕</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Search GitHub users"
            className="w-full border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />
        </div>
      </label>
      <button
        onClick={handleSearch}
        className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;