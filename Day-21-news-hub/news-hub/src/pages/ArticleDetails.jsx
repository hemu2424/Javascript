import { Link, useLocation } from 'react-router-dom';

const ArticleDetails = () => {

    const location = useLocation();

    const article = location.state?.article;


    if(!article){
        return(<div className="rounded-2xl border border-dashed border-slate-300 bg-white p-16 text-center transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Article not found</h2>
            <Link className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-700" to="/">Back home</Link>

            </div>
        )
    }
   return (
    <article className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900">
      <img className="h-64 w-full object-cover sm:h-96" src={article.image} alt={article.title} />
      <div className="p-6 sm:p-10">
      <p className="mb-4 text-sm font-bold text-blue-600 dark:text-blue-400">{article.source.name}</p>
      <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl">{article.title}</h1>

      <p className="mt-5 text-sm font-medium text-slate-500 dark:text-slate-400">Published {article.publishedAt}</p>

      <p className="mt-8 text-lg font-medium leading-8 text-slate-700 dark:text-slate-300">{article.description}</p>

      <p className="mt-6 whitespace-pre-line leading-8 text-slate-600 dark:text-slate-300">{article.content}</p>

      <a
        href={article.url}
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/25"
      >
        Read Original Article ↗
      </a>
      </div>
    </article>
  );
}

export default ArticleDetails;