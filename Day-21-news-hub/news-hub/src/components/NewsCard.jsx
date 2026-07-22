import { Link } from "react-router-dom";
import { useBookmarks } from "../hooks/useBookmarks";
import { Bookmark, BookmarkCheck, Calendar, ExternalLink } from "lucide-react";

function NewsCard({ article }) {

  const {addBookmark,removeBookmark,isBookmarked} = useBookmarks();

  function handleBookmark(){
    if(isBookmarked(article.url)){
      removeBookmark(article.url)
    }
    else{
      addBookmark(article);
    }
  }
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900">
      <div className="relative overflow-hidden bg-slate-100 dark:bg-slate-800">
      <img
        src={article.image}
        alt={article.title}
        className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-blue-700 shadow-sm backdrop-blur dark:bg-slate-900/90 dark:text-blue-300">
        {article.source.name}
      </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
      <div className="mb-3 flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400"><Calendar size={14} /> {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : "Latest"}</div>
      <h2 className="line-clamp-2 text-lg font-bold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-400">{article.title}</h2>

      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{article.description}</p>
      <div className="mt-5 flex items-center justify-between gap-3">
      <button onClick={handleBookmark} aria-label={isBookmarked(article.url) ? "Remove bookmark" : "Bookmark article"} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${isBookmarked(article.url) ? "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300" : "text-slate-500 hover:bg-slate-100 hover:text-blue-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-blue-400"}`}>
        {isBookmarked(article.url) ? <BookmarkCheck size={17} /> : <Bookmark size={17} />} <span className="hidden sm:inline">{isBookmarked(article.url)?"Saved":"Save"}</span>
      </button>

      <Link
        to="/article"
        state={{article}}
      className="flex items-center gap-1 rounded-lg bg-slate-900 px-3 py-2 text-sm font-bold text-white transition-colors duration-300 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:bg-blue-600 dark:hover:bg-blue-700"
      >
        Read More <ExternalLink size={15} />
      </Link>
      </div>
      </div>
    </article>
  );
}

export default NewsCard;