import NewsGrid from '../components/NewsGrid'
import { useBookmarks } from '../hooks/useBookmarks'

const Bookmarks = () => {
  const {bookmarks} = useBookmarks()
  return (
    <section className="space-y-8">
    <header className="border-b border-slate-200 pb-6 transition-colors duration-300 dark:border-slate-700"><p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">Your reading list</p><h1 className="text-3xl font-black capitalize tracking-tight text-slate-900 dark:text-white sm:text-4xl">Bookmarks</h1></header>

    {bookmarks.length === 0 ?(
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-16 text-center transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900"><div className="mx-auto mb-4 w-fit rounded-full bg-blue-50 p-4 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400"><span className="text-3xl">♡</span></div><h2 className="text-xl font-bold text-slate-800 dark:text-white">No bookmarks yet</h2><p className="mt-2 text-slate-500 dark:text-slate-400">Save articles to build your personal reading list.</p></div>):(<NewsGrid articles={bookmarks}/>)
     }

    </section>
  )
}

export default Bookmarks
