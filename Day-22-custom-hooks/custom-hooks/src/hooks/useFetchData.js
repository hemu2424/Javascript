import { useEffect, useState } from "react"

export function useFetchdata(url){
    const[loading,setloading] = useState(true);
    const[error,setError] = useState(null);
    const[data,setData] = useState([])

    useEffect(()=>{
       
        
        const fetchdata = async()=>{
            setloading(true);
        setError("");
            try{ 
            const fetched = await fetch(url);
            const json = await fetched.json();
setData(json);
        }
        catch(err){
            console.log(err)
            setError(err.message)
        }
        finally{
            setloading(false)
        }}
        fetchdata();
    },[url])

    return {
        data,loading,error
    }
}