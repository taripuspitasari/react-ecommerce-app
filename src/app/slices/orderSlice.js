import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axiosClient from "../../axios-client";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (_, {getState, rejectWithValue}) => {
    try {
      const state = getState();
      const {selectedAddress, selectedPaymentMethod} = state.order;

      if (!selectedAddress || !selectedPaymentMethod) {
        return rejectWithValue({
          message: "Address and payment method are required",
        });
      }

      const payload = {
        address_id: selectedAddress.id,
        payment_method: selectedPaymentMethod,
      };
      console.log(payload);
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

export const fetchUserOrder = createAsyncThunk(
  "order/fetchUserCart",
  async (_, {rejectWithValue}) => {
    try {
      const response = await axiosClient.get("/orders");
      return response.data.data;
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
    builder
      .addCase(fetchUserOrder.pending, state => {
        state.loading = true;
      })
      .addCase(fetchUserOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.address = null;
        state.paymentMethod = null;
        state.orderHistory = action.payload;
      })
      .addCase(fetchUserOrder.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
  },
});

export const {setSelectedAddress, setPaymentMethod} = orderSlice.actions;
export default orderSlice.reducer;
