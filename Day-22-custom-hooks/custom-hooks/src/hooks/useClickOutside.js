export function useClickOutSide(ref,callback){
    useEffect(()=>{
         
        function handleClick(event){
            if(!ref.current) return;

            if(!ref.current.contains(event.target))
                callbacks()


        }
        document.addEventListener("click",handleClick)
         return () => {
      document.removeEventListener("click", handleClick);
    };
    },[ref,callback])
}