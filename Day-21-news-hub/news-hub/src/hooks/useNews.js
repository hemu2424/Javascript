import { useEffect, useState } from "react";
import { PAGE_SIZE } from "../utils/constants";

function useNews({
    fetchFunction,
    dependencies = [],
}){
    const[loading,setLoading] = useState(true);
    const[error,setError] = useState("");
    const[articles,setArticles] = useState([])
    const[hasNext,setHasNext] = useState(false)
    const [totalPages, setTotalPages] = useState(1);
    const currentPage = dependencies[dependencies.length - 1];
    

    useEffect(()=>{
        async function fetchData(){
            setLoading(true);
            setError("")

         try{   const data = await fetchFunction();
            setArticles(data.articles || []);
            const pages = Math.ceil(data.totalArticles / PAGE_SIZE);
            setTotalPages(pages);
            setHasNext(currentPage < pages);
        }
        catch(err){
            setError(err.message || "Failed to fetch news");
        }
        finally{
            setLoading(false)
        }
    }
    fetchData()
    },[fetchFunction, currentPage])
    return {
        articles,loading,error,hasNext,totalPages

    }
}
export default useNews