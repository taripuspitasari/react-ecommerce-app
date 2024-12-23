import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosClient from "../../axios-client";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({query, category}, {rejectWithValue}) => {
    try {
      const response = await axiosClient.get(
        `/products?search=${query}&category=${category || ""}`
      );
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching products");
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
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
    query: "",
    category: null,
    loading: false,
    errors: null,
  },
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    setSelectedCategory(state, action) {
      state.category = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
    builder
      .addCase(fetchCategories.pending, state => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
  },
});

export const {setQuery, setSelectedCategory} = productSlice.actions;
export default productSlice.reducer;
