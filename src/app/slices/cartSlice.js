import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axiosClient from "../../axios-client";

export const fetchUserCart = createAsyncThunk(
  "cart/fetchUserCart",
  async (_, {rejectWithValue}) => {
    try {
      const response = await axiosClient.get("/cart");
      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 422) {
        return rejectWithValue(err.response.data);
      }
      throw err;
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({userId, cartDetails}, {rejectWithValue}) => {
    try {
      const payload = {
        user_id: userId,
        cart_details: cartDetails,
      };
      const response = await axiosClient.post("/cart", payload);
      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 422) {
        return rejectWithValue(err.response.data);
      }
      throw err;
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    cartItems: [],
    loading: false,
    errors: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserCart.pending, state => {
        state.loading = true;
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.details;
        state.cartTotalQuantity = action.payload.total_quantity;
        state.cartTotalAmount = action.payload.total_amount;
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
    builder
      .addCase(addToCart.pending, state => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        console.log("API Response: ", action.payload);
        state.loading = false;
        state.cartItems = action.payload.details;
        state.cartTotalQuantity = action.payload.total_quantity;
        state.cartTotalAmount = action.payload.total_amount;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
  },
});

export default cartSlice.reducer;
