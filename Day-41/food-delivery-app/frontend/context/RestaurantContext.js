"use client"

import api from "@/lib/api";
import { useContext, useState, createContext, useCallback } from "react";
const RestaurantsContext = createContext(null);

// general
export function RestaurantProvider({children}){
const [loading, setLoading] = useState(false);
const [restaurants, setRestaurants] = useState([]);
const [error, setError] = useState("");
// --
// resturabnt deatil page state
const [currentRestaurant, setCurrentRestaurant] = useState(null);
const [menuItems, setMenuItems] = useState([]);
const [detailLoading, setDetailLoading] = useState(false);
const [detailError, setDetailError] = useState("");
// ---



const [cuisines, setCuisines] = useState([]);

const fetchCuisines = useCallback(async () => {
  try {
    const response = await api.get("/restaurants/cuisines");
    setCuisines(response.data);
  } catch (err) {
    console.error(err);
  }
}, []);

const fetchRestaurants = useCallback(async (filters = {}) => {
  setLoading(true);
  try {
   
    const params = new URLSearchParams(filters).toString();
    const url = params ? `/restaurants?${params}` : "/restaurants";

    const response = await api.get(url);
    setRestaurants(response.data);
    setError("");
  } catch (err) {
    setError("Could not fetch restaurants");
  } finally {
    setLoading(false);
  }
}, []);


const fetchRestaurantById = useCallback(async (id) => {
    setDetailLoading(true);
    try {
        const response = await api.get(`/restaurants/${id}`);
        setCurrentRestaurant(response.data.restaurant);
        setMenuItems(response.data.menuItems);
        setDetailError("");
    } catch (err) {
        console.log(err);
        setDetailError("Could not load this restaurant.");
    } finally {
        setDetailLoading(false);
    }
}, [])
async function updateRestaurant(id, formData) {
  await api.put(`/restaurants/${id}`, formData);
  await fetchRestaurants();
}
const createRestaurant = async(formData)=>{
    await api.post("/restaurants",formData);
    await fetchRestaurants();
}

const deleteRestaurant = async(id)=>{
    await api.delete(`/restaurants/${id}`);
    await fetchRestaurants();
}

const deleteRestaurantImage = async(restaurantId, imagePath)=>{
    await api.delete(`/restaurants/${restaurantId}/images`, { data: { imagePath } });
    await fetchRestaurants()
}

return(
<RestaurantsContext.Provider
value={{
    restaurants, loading, error, fetchRestaurants,
    createRestaurant, deleteRestaurant, deleteRestaurantImage,
    currentRestaurant, menuItems, detailLoading, detailError, fetchRestaurantById,cuisines, fetchCuisines,updateRestaurant
}}
>
{children}
</RestaurantsContext.Provider>
)
}


export function useRestaurants(){
    const context = useContext(RestaurantsContext);
  if (!context) {
    throw new Error("useRestaurants must be used inside a RestaurantProvider");
  }
  return context;
}