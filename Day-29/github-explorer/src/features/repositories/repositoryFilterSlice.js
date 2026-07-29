import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    search: "",
    language: "all",
    sortBy: "default"
}

const repositoryFilterSlice = createSlice({
    name: "repositoryFilter",
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload
        },
        setLanguage:(state,action) =>{
            state.language = action.payload
        },
        setSortBy:(state,action) => {
            state.sortBy = action.payload
        }
    }
})

export const { setLanguage, setSearch, setSortBy } = repositoryFilterSlice.actions;
export default repositoryFilterSlice.reducer;