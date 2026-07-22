import { useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getNewsByCategory } from '../services/newsServices';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import NewsGrid from '../components/NewsGrid';
import useNews from '../hooks/useNews';
import { Pagination } from '../components/Pagination';

const Category = () => {
  
    const {category} = useParams();
    const [page, setPage] = useState(1);
    const fetchCategoryNews = useCallback(
      () => getNewsByCategory(category, page),
      [category, page]
    );

    const {loading,error,articles,hasNext,totalPages} =useNews({
    fetchFunction: fetchCategoryNews,
    dependencies: [category, page],
});
    if(loading) return <Loading/>;
    if(error) return <ErrorMessage message={error}/>;

  return (
    <section className="space-y-8">
      <header className="border-b border-slate-200 pb-6 transition-colors duration-300 dark:border-slate-700"><p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">Explore the latest</p><h2 className="text-3xl font-black capitalize tracking-tight text-slate-900 dark:text-white sm:text-4xl">{category} news</h2></header>
      {
        articles.length === 0 ? (<p className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center font-medium text-slate-500 transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">No news found</p>):(<NewsGrid articles={articles}/>)
      }
      <Pagination page={page} totalPages={totalPages} setPage={setPage} hasPrevious={page > 1} hasNext={hasNext}/>
    </section>
  )
}

export default Category
