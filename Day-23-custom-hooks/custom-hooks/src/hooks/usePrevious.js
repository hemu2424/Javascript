import { useEffect, useRef } from "react";

export function usePrevious(value){
    const previous = useRef();
    useEffect(()=>{
        previous.current = value;
    },[value])
    return previous.current
}