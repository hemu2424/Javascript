import { useSearchParams } from "react-router-dom";

function Pagination({ totalItems, itemsPerPage = 10 }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevious = () => {
    if (currentPage === 1) return;

    const params = new URLSearchParams(searchParams);
    params.set("page", String(currentPage - 1));
    setSearchParams(params);
  };

  const handleNext = () => {
    if (currentPage === totalPages) return;

    const params = new URLSearchParams(searchParams);
    params.set("page", String(currentPage + 1));
    setSearchParams(params);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-[24px] border border-slate-200 bg-white px-4 py-4 shadow-sm sm:flex-row sm:gap-4">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>

      <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;