import { useEffect, useState } from "react";

export function useDebounce(value,delay = 500){
    const[valuedebounce,setvalueDebounce] = useState(value);
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setvalueDebounce(value)
        },delay);

        return () =>{ clearTimeout(timer)};
    },[value,delay]);
    return valuedebounce
}