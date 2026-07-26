import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../features/filters/filterSlice";

export function CategoryFilter(){
    const dispatch = useDispatch();

    const category = useSelector((state)=>state.filters.category);

    function handleChange(e){
        dispatch(setCategory(e.target.value))
    }
    return (
        <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-600 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h18M7 8h10M5 12h14m-4 4h4m-8 0h4" />
            </svg>
            <select value={category} onChange={handleChange} className="w-full border-0 bg-transparent text-sm font-medium text-slate-700 outline-none">
                <option value="all">All</option>
                <option value="beauty">Beauty</option>
                <option value="fragrances">Fragrances</option>
                <option value="furniture">Furniture</option>
                <option value="groceries">Groceries</option>
            </select>
        </label>
    )
}