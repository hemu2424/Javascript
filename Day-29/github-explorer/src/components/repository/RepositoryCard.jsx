import { useDispatch, useSelector } from "react-redux";
import { memo } from "react";
import { Link } from "react-router-dom";
import { selectbookMark } from "../../features/bookmarks/bookmarkSelector";
import { addBookmark, removeBookmark } from "../../features/bookmarks/bookmarkSlice";

function RepositoryCard({ repository }) {
  const bookmark = useSelector(selectbookMark);
  const dispatch = useDispatch();
  const check = bookmark.some((mark) => mark.id === repository.id);

  const handleBookmark = () => {
    if (check) {
      dispatch(removeBookmark(repository.id));
    } else {
      dispatch(addBookmark(repository));
    }
  };

  return (
    <article className="group flex h-full flex-col rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start justify-between gap-3">
        <Link
          to={`/users/${repository.owner.login}/repos/${repository.name}`}
          className="text-lg font-semibold text-slate-900 transition hover:text-slate-700"
        >
          <h3 className="line-clamp-2">{repository.name}</h3>
        </Link>
        <button
          onClick={handleBookmark}
          className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
        >
          {check ? "Saved" : "Save"}
        </button>
      </div>

      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
        {repository.description || "No description available for this repository."}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {repository.language ? (
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
            {repository.language}
          </span>
        ) : null}
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
          ★ {repository.stargazers_count ?? 0}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
          ⑂ {repository.forks_count ?? 0}
        </span>
      </div>

      <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
        <span>Updated {repository.updated_at ? new Date(repository.updated_at).toLocaleDateString() : "recently"}</span>
        <Link
          to={`/users/${repository.owner.login}/repos/${repository.name}`}
          className="font-medium text-slate-700 transition group-hover:text-slate-900"
        >
          Details →
        </Link>
      </div>
    </article>
  );
}

export default memo(RepositoryCard);