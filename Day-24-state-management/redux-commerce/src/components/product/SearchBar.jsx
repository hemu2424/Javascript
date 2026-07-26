import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../../features/filters/filterSlice";

function SearchBar(){
    const dispatch = useDispatch();

    const search = useSelector((state)=> state.filters.search);

    function handleChange(e){
        dispatch(setSearch(e.target.value))
    }
    return(
        <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 shadow-sm transition focus-within:border-blue-400 focus-within:bg-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
                type="text"
                placeholder="Search products"
                value={search}
                onChange={handleChange}
                className="w-full border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
        </label>
    )
}

export default SearchBar