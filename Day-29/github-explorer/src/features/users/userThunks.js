import { getUser } from "../../api/githubapi";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk(
    "users/fetchUser",
    async(userName,thunkAPI)=>{
        console.log("Thunk started:", userName);
        try{
            const response = await getUser(userName);
            console.log("API Response:", response.data);
            return response.data;
        }
        catch(error)
        {console.log(error)
            return thunkAPI.rejectWithValue(
                error.response.data?.message || "Something went wrong"
                
        )

        }
    }
)