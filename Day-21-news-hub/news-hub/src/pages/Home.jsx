import { useCallback, useContext, useState } from "react";
import { getTopHeadlines } from "../services/newsServices";
import NewsGrid from "../components/NewsGrid";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import useNews from "../hooks/useNews";
import { Pagination } from "../components/Pagination";
import { ThemeContext } from "../context/ThemeContext";
import { useTheme } from "../hooks/useTheme";

function Home() {
  const[page,setPage] = useState(1);
  const fetchTopHeadlines = useCallback(
    () => getTopHeadlines(page),
    [page]
  );
 

  const {
    articles,
    loading,
    error,
    hasNext,
    totalPages,
} = useNews({
    fetchFunction: fetchTopHeadlines,
    dependencies: [page],
});
   
   if (loading) {
  return <Loading />;
}

if (error) {
  return <ErrorMessage message={error} />;
}

  return (
    <section className="space-y-8">
      

    <header className="rounded-3xl bg-gradient-to-br from-blue-700 to-indigo-800 px-6 py-10 text-white shadow-xl shadow-blue-900/10 transition-colors duration-300 dark:from-blue-800 dark:to-indigo-950 sm:px-10">
      <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-blue-200">Stay informed</p>
      <h1 className="max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">Top headlines, thoughtfully curated.</h1>
      <p className="mt-4 max-w-xl text-blue-100 dark:text-blue-200">Discover the stories shaping the world today, all in one trusted place.</p>
    </header>
    <NewsGrid articles={articles} />
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

export default Home;