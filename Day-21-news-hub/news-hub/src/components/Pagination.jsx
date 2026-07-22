import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({
    page,
    totalPages,
    setPage,
    hasPrevious,
    hasNext,
}){
     
return (
    <div className="mt-10 flex items-center justify-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900">
       <button
        onClick={() => setPage((prev) => prev - 1)}
        disabled={!hasPrevious}
        className="flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition-colors duration-300 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent dark:border-slate-700 dark:text-slate-200 dark:hover:border-blue-700 dark:hover:bg-slate-800 dark:hover:text-blue-300 dark:disabled:hover:bg-transparent"
      >
        <ChevronLeft size={17} /> Previous
      </button>
      <span>
    <span className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200">Page {page} of {totalPages}</span>
</span>
      <button
      onClick={()=> setPage((prev)=> prev +1)}
      disabled={!hasNext}
      className="flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition-colors duration-300 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent dark:border-slate-700 dark:text-slate-200 dark:hover:border-blue-700 dark:hover:bg-slate-800 dark:hover:text-blue-300 dark:disabled:hover:bg-transparent"
      >
        Next <ChevronRight size={17} />
      </button>
    </div>
)
}