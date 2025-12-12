import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axiosClient from "../../axios-client";

export const loadUserOrders = createAsyncThunk(
  "order/loadUserOrders",
  async (_, {rejectWithValue}) => {
    try {
      const response = await axiosClient.get("/orders");
      return response.data.data;
    } catch (err) {
      return rejectWithValue("Failed to load order. Please try again");
    }
  }
);

export const createNewOrder = createAsyncThunk(
  "order/createNewOrder",
  async (payload, {rejectWithValue}) => {
    try {
      const response = await axiosClient.post("/orders", payload);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.errors);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    loading: false,
    errors: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadUserOrders.pending, state => {
        state.loading = true;
      })
      .addCase(loadUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(loadUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
    builder
      .addCase(createNewOrder.pending, state => {
        state.loading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
  },
});

export default orderSlice.reducer;
