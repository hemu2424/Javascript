import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProductsApi } from "./productAPI";

const initialState = {
  items: [],
  loading: false,
  error: null,
};


export const fetchProduct = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    return await fetchProductsApi();
  }
);

const productSlice = createSlice({
  name: "products",

  initialState,

  reducers: {
    clearProducts(state) {
      state.items = [];
    },

    setProducts(state, action) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })

      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearProducts, setProducts } = productSlice.actions;

export default productSlice.reducer;