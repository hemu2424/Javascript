import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getRepositories,
  getRepository,
} from "../../api/githubApi";

export const fetchRepositories = createAsyncThunk(
  "repositories/fetchRepositories",
  async (username, thunkAPI) => {
    try {
      const response = await getRepositories(username);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch repositories"
      );
    }
  }
);

export const fetchRepository = createAsyncThunk(
  "repositories/fetchRepository",
  async ({ owner, repo }, thunkAPI) => {
    try {
      const response = await getRepository(owner, repo);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch repository"
      );
    }
  }
);