"use client"

import api from "@/lib/api";
import { useContext, useState, createContext, useCallback } from "react";
const ResturantsContext = createContext(null);


export function  ResturantProvider({children}){
const[loading,setLoading] = useState(false);
const[resturants,setResturants] = useState([]);
const[error,setError] = useState("");




const  fetchResturants =  useCallback(async () =>{
    setLoading(true);
    try{
        const response = await api.get("/resturant");
        setResturants(response.data);
        setError("")


    }
    catch(err){
        console.log(err)
        setError("not able to fetch products",err)
}
finally{
    setLoading(false);
}

},[])

const createResturants = async(formData)=>{
    await api.post("/resturants",formData);
    await fetchResturants();

}

const deleteResturants = async(id)=>{
    await api.delete(`/resturant/:${id}`);
    await fetchResturants();

}

const deleteResturantImage = async(resturantId,ImagePath)=>{
    await api.delete(`/resturant/:${resturantId}images/`,{data:{ImagePath}});
    await fetchResturants()
}

return(
<ResturantsContext.Provider
value={{
    resturants,loading,error,fetchResturants,createResturants,deleteResturants,deleteResturantImage
}}
>
{children}

</ResturantsContext.Provider>

)


}


export function useRestaurants(){
    const context = useContext(ResturantsContext);
  if (!context) {
    throw new Error("useRestaurants must be used inside a RestaurantProvider");
  }
  return context;
}