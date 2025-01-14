import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axiosClient from "../../axios-client";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async ({address, paymentMethod}, {rejectWithValue}) => {
    try {
      const payload = {
        address,
        payment_method: paymentMethod,
      };
      const response = await axiosClient.post("/orders", payload);
      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 422) {
        return rejectWithValue(err.response.data);
      }
      throw err;
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    selectedAddress: null,
    selectedPaymentMethod: null,
    orderHistory: [],
    loading: false,
    errors: null,
  },
  reducers: {
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
    setPaymentMethod: (state, action) => {
      state.selectedPaymentMethod = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createOrder.pending, state => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.address = null;
        state.paymentMethod = null;
        state.orderHistory = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
  },
});

export const {setAddress, setPaymentMethod} = orderSlice.actions;
export default orderSlice.reducer;
