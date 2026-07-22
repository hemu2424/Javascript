import { useCallback, useState } from 'react'
import NewsGrid from '../components/NewsGrid'
import { useSearchParams } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';
import { searchNews } from '../services/newsServices';
import useNews from '../hooks/useNews';
import { Pagination } from '../components/Pagination';

const Search = () => {
const [searchParams] = useSearchParams();
const [page, setPage] = useState(1);

  const query = searchParams.get("q");
  const fetchSearchNews = useCallback(
    () => searchNews(query, page),
    [query, page]
  );
const {loading,error,articles,totalPages,hasNext} = useNews({
    fetchFunction: fetchSearchNews,
    dependencies: [query, page],
});


  if (loading) return <Loading />;

  if (error) return <ErrorMessage message={error} />;

  return (
    <section className="space-y-8">
      <header className="rounded-3xl border border-blue-100 bg-blue-50/70 px-6 py-8 transition-colors duration-300 dark:border-blue-900/60 dark:bg-blue-950/30 sm:px-10"><p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">Search results</p><h1 className="break-words text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">Results for “{query}”</h1></header>
      {articles.length === 0 ? (<div className="rounded-2xl border border-dashed border-slate-300 bg-white p-16 text-center transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900"><h2 className="text-xl font-bold text-slate-800 dark:text-white">No stories found</h2><p className="mt-2 text-slate-500 dark:text-slate-400">Try searching for a different topic.</p></div>):(<NewsGrid articles={articles}/>)
      }
      <Pagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
        hasPrevious={page > 1}
        hasNext={hasNext}
      />
    </section>
  )
}

export default Search
