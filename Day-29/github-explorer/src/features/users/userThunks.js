import { getUser, searchUsers } from "../../api/githubApi";
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

export const searchUsersThunk = createAsyncThunk(
  "users/searchUsers",
  async (query, thunkAPI) => {
    try {
      const response = await searchUsers(query);
      return response.data.items;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to search users"
      );
    }
  }
);