import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    search : "",
    category:"all",
    sortBy:"default",
};

const filterSlice = createSlice({
    name:"filter",
    initialState,
    reducers:{
        setSearch(state,action){
            state.search = action.payload;
        },
        setCategory(state,action){
            state.category = action.payload
        }
    },
})
export const {setSearch , setCategory} = filterSlice.actions;
export default filterSlice.reducer;