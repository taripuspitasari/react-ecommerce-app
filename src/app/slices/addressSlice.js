import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axiosClient from "../../axios-client";

export const fetchUserAddress = createAsyncThunk(
  "address/fetchUserAddress",
  async (_, {rejectWithValue}) => {
    try {
      const response = await axiosClient.get("address");
      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 422) {
        return rejectWithValue(err.response.data.errors);
      }
      throw err;
    }
  }
);

export const addNewAddress = createAsyncThunk(
  "address/addAddress",
  async (payload, {rejectWithValue}) => {
    try {
      const response = await axiosClient.post("address", payload);
      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 422) {
        return rejectWithValue(err.response.data.errors);
      }
      throw err;
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (addressId, {rejectWithValue}) => {
    try {
      const response = await axiosClient.delete(`/address/${addressId}`);
      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 422) {
        return rejectWithValue(err.response.data.errors);
      }
      throw err;
    }
  }
);

export const getAddress = createAsyncThunk(
  "address/getAddress",
  async (addressId, {rejectWithValue}) => {
    try {
      const response = await axiosClient.get(`/address/${addressId}`);
      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 422) {
        return rejectWithValue(err.response.data.errors);
      }
      throw err;
    }
  }
);

export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({addressId, payload}, {rejectWithValue}) => {
    try {
      const response = await axiosClient.put(`/address/${addressId}`, payload);
      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 422) {
        return rejectWithValue(err.response.data.errors);
      }
      throw err;
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState: {
    addresses: [],
    loading: false,
    errors: null,
    address: {},
  },
  reducers: {
    setAddress(state) {
      state.address = {};
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserAddress.pending, state => {
        state.loading = true;
      })
      .addCase(fetchUserAddress.fulfilled, (state, action) => {
        state.addresses = action.payload;
        state.loading = false;
        state.errors = null;
      })
      .addCase(fetchUserAddress.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
    builder
      .addCase(addNewAddress.pending, state => {
        state.loading = true;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.addresses = action.payload;
        state.loading = false;
        state.errors = null;
      })
      .addCase(addNewAddress.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
    builder.addCase(deleteAddress.fulfilled, (state, action) => {
      state.addresses = action.payload;
      state.loading = false;
      state.errors = null;
    });
    builder.addCase(getAddress.fulfilled, (state, action) => {
      state.address = action.payload;
      state.loading = false;
      state.errors = null;
    });
    builder
      .addCase(updateAddress.pending, state => {
        state.loading = true;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.addresses = action.payload;
        state.loading = false;
        state.errors = null;
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
  },
});

export default addressSlice.reducer;
export const {setAddress} = addressSlice.actions;
