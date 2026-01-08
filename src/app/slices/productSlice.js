import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosClient from "../../axios-client";

export const loadProducts = createAsyncThunk(
  "products/loadProducts",
  async ({query = "", category = "", page = 1}, {rejectWithValue}) => {
    try {
      const response = await axiosClient.get(
        `/products?search=${query}&category=${category}&page=${page}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching products");
    }
  }
);

export const loadCategories = createAsyncThunk(
  "categories/loadCategories",
  async (_, {rejectWithValue}) => {
    try {
      const response = await axiosClient.get("/categories");
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching categories");
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    categories: [],
    loading: false,
    errors: null,
    pages: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadProducts.pending, state => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
        state.pages = action.payload.meta;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
    builder
      .addCase(loadCategories.pending, state => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(loadCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(loadCategories.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
  },
});

export default productSlice.reducer;
