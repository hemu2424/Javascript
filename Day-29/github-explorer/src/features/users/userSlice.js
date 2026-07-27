import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "./userThunks";

const initialState = {
    user:null,
    loading:false,
    error:null,
};

const  userSlice = createSlice({
    name:"users",
    initialState,
    reducer:{},
    extraReducers:(builder) =>{
        builder
        .addCase(fetchUser.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.user = action.payload;
            console.log(action);

        })
        .addCase(fetchUser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
    }
})

export default userSlice.reducer