import { createSelector } from "@reduxjs/toolkit";

export const selectProducts = (state) => state.products.items;

export const selectLoading = (state) => state.products.loading;

export const selectError = (state) => state.products.error;

export const selectSearch = (state) => state.filters.search;

export const selectCategory = (state) => state.filters.category;

export const selectSortBy = (state) => state.filters.sortBy; 

export const selectVisibleProducts = createSelector([selectProducts,selectSearch,selectCategory,selectSortBy],(products,search,category,sortby)=>{
   let result = [...products];
   if(search){
    result = result.filter((product)=>
        product.title.toLowerCase().includes(search.toLowerCase())
    )
   }
   if(category !== "all"){
    result = result.filter((product)=>
        product.category === category
    )
   }
   switch(sortby){
    case "price-low":
        result.sort(
            (a,b)=>a.price-b.price
        );
        break;
    case "price-high":
        result.sort((a,b)=>b.price-a.price)
        break;
    case "title":
        result.sort((a,b)=>a.title.localeCompare(b.title))
        break;
    
   }
   return result
})