import { useSelector } from "react-redux";
import { selectbookMark } from "../../features/bookmarks/bookmarkSelector";
import RepositoryCard from "../../components/repository/RepositoryCard";

function BookmarksPage() {
  const Bookmarks = useSelector(selectbookMark);

  if (Bookmarks.length === 0) {
    return (
      <section className="rounded-[32px] border border-slate-200 bg-white px-6 py-16 text-center shadow-sm sm:px-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-3xl">
          ★
        </div>
        <h1 className="mt-6 text-3xl font-semibold text-slate-900">No bookmarks yet</h1>
        <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-slate-600">
          Save repositories you love to revisit them here whenever you want.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Bookmarks</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Your saved repositories</h1>
        <p className="mt-3 text-sm text-slate-600">Keep track of the repositories you want to come back to later.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Bookmarks.map((bookmark) => (
          <RepositoryCard key={bookmark.id} repository={bookmark} />
        ))}
      </div>
    </section>
  );
}

export default BookmarksPage;