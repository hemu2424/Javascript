import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRepo } from "../../api/githubapi";

export const repository = createAsyncThunk(
     "repositories/fetchRepositories",
     async(userName,thunkAPI) => {
        try{
            const response = await getRepo(userName)
            return response.data
        }
        catch(error){
            console.log(error)
             return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch repositories")

        }

     }
)