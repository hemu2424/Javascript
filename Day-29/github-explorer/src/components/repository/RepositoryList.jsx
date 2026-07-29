import { useSelector } from "react-redux";
import RepositoryCard from "./RepositoryCard";
import {
  selectRepositoryLoading,
  selectRepositoryError,
} from "../../features/repositories/repositorySelector";
import { selectFilteredRepositories } from "../../features/repositories/repositoryMemoSelectors";
import { useSearchParams } from "react-router-dom";
import Pagination from "./Pagination";

function RepositoryList() {
  const loading = useSelector(selectRepositoryLoading);
  const error = useSelector(selectRepositoryError);
  const filteredRepositories = useSelector(selectFilteredRepositories);
  const [searchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRepositories = filteredRepositories.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="animate-pulse rounded-[24px] border border-slate-200 bg-slate-50 p-5">
            <div className="h-5 w-2/3 rounded bg-slate-200" />
            <div className="mt-4 space-y-2">
              <div className="h-3 rounded bg-slate-200" />
              <div className="h-3 w-4/5 rounded bg-slate-100" />
            </div>
            <div className="mt-6 h-8 rounded-full bg-slate-200" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[24px] border border-red-200 bg-red-50 p-6 text-red-700">
        <h3 className="font-semibold">Unable to load repositories</h3>
        <p className="mt-1 text-sm">{error}</p>
      </div>
    );
  }

  if (paginatedRepositories.length === 0) {
    return (
      <div className="rounded-[24px] border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-600">
        <p className="text-lg font-semibold text-slate-700">No repositories found.</p>
        <p className="mt-2 text-sm">Try changing the search or filter values.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {paginatedRepositories.map((repository) => (
          <RepositoryCard key={repository.id} repository={repository} />
        ))}
      </div>

      <Pagination totalItems={filteredRepositories.length} itemsPerPage={itemsPerPage} />
    </div>
  );
}

export default RepositoryList;