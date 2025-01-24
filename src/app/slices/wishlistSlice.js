import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axiosClient from "../../axios-client";

export const fetchUserWishlist = createAsyncThunk(
  "wishlist/fetchUserWishlist",
  async (_, {rejectWithValue}) => {
    try {
      const response = await axiosClient.get("/wishlists");
      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 422) {
        return rejectWithValue(err.response.data);
      }
      throw err;
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (productId, {rejectWithValue}) => {
    try {
      const response = await axiosClient.post("/wishlists", {
        product_id: productId,
      });
      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 422) {
        return rejectWithValue(err.response.data);
      }
      throw err;
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (productId, {rejectWithValue}) => {
    try {
      const response = await axiosClient.delete(`/wishlists/${productId}`);
      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 422) {
        return rejectWithValue(err.response.data);
      }
      throw err;
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistItems: [],
    loading: false,
    errors: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserWishlist.pending, state => {
        state.loading = true;
      })
      .addCase(fetchUserWishlist.fulfilled, (state, action) => {
        state.wishlistItems = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchUserWishlist.rejected, state => {
        state.loading = false;
        state.errors = action.payload;
      });
    builder
      .addCase(addToWishlist.pending, state => {
        state.loading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlistItems = action.payload.data;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
    builder
      .addCase(removeFromWishlist.pending, state => {
        state.loading = true;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlistItems = action.payload.data;
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
  },
});

export default wishlistSlice.reducer;
