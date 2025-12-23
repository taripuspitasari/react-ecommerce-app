import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axiosClient from "../../axios-client";
import {logout} from "./authSlice";

export const loadUserWishlists = createAsyncThunk(
  "wishlist/loadUserWishlists",
  async (_, {rejectWithValue}) => {
    try {
      const response = await axiosClient.get("/wishlists");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const toggleWishlist = createAsyncThunk(
  "wishlist/toggleWishlist",
  async (productId, {rejectWithValue}) => {
    try {
      const response = await axiosClient.post("wishlists", {
        product_id: productId,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlists: [],
    loading: false,
    errors: null,
  },
  reducers: {
    clearWishlist(state) {
      state.wishlists = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(logout.fulfilled, state => {
      state.wishlists = [];
    });
    builder
      .addCase(loadUserWishlists.pending, state => {
        state.loading = true;
      })
      .addCase(loadUserWishlists.fulfilled, (state, action) => {
        state.wishlists = action.payload.data;
        state.loading = false;
      })
      .addCase(loadUserWishlists.rejected, state => {
        state.loading = false;
        state.errors = action.payload;
      });
    builder
      .addCase(toggleWishlist.pending, state => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(toggleWishlist.fulfilled, (state, action) => {
        const {data, message} = action.payload;
        if (message === "added") {
          state.wishlists.push(data);
        } else {
          state.wishlists = state.wishlists.filter(item => item !== data);
        }
        state.loading = false;
      })
      .addCase(toggleWishlist.rejected, state => {
        state.loading = false;
        state.errors = action.payload;
      });
  },
});

export const {clearWishlist} = wishlistSlice.actions;
export default wishlistSlice.reducer;
