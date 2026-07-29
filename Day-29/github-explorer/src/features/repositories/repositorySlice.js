import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRepositories,
  fetchRepository,
} from "./repositoryThunks";

const initialState = {
  repositories: [],
  repository: null,
  loading: false,
  error: null,
};

const repositorySlice = createSlice({
  name: "repositories",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchRepositories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchRepositories.fulfilled, (state, action) => {
        state.loading = false;
        state.repositories = action.payload;
      })

      .addCase(fetchRepositories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchRepository.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchRepository.fulfilled, (state, action) => {
        state.loading = false;
        state.repository = action.payload;
      })

      .addCase(fetchRepository.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default repositorySlice.reducer;