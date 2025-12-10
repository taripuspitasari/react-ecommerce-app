import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axiosClient from "../../axios-client";

export const loadUserAddresses = createAsyncThunk(
  "address/loadUserAddresses",
  async (_, {rejectWithValue}) => {
    try {
      const response = await axiosClient.get("address");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.errors);
    }
  }
);

export const createNewAddress = createAsyncThunk(
  "address/addAddress",
  async (payload, {rejectWithValue}) => {
    try {
      const response = await axiosClient.post("address", payload);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.errors);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (addressId, {rejectWithValue}) => {
    try {
      await axiosClient.delete(`/address/${addressId}`);
      return addressId;
    } catch (err) {
      return rejectWithValue(err.response.data.errors);
    }
  }
);

export const getAddressById = createAsyncThunk(
  "address/getAddressById",
  async (addressId, {rejectWithValue}) => {
    try {
      const response = await axiosClient.get(`/address/${addressId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.errors);
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
      return rejectWithValue(err.response.data.errors);
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
      .addCase(loadUserAddresses.pending, state => {
        state.loading = true;
      })
      .addCase(loadUserAddresses.fulfilled, (state, action) => {
        state.addresses = action.payload.data;
        state.loading = false;
        state.errors = null;
      })
      .addCase(loadUserAddresses.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
    builder
      .addCase(createNewAddress.pending, state => {
        state.loading = true;
      })
      .addCase(createNewAddress.fulfilled, (state, action) => {
        state.addresses.push(action.payload.data);
        state.loading = false;
        state.errors = null;
      })
      .addCase(createNewAddress.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
    builder
      .addCase(deleteAddress.pending, state => {
        state.loading = true;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.addresses = state.addresses.filter(
          item => item.id !== action.payload
        );
        state.loading = false;
        state.errors = null;
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
    builder
      .addCase(getAddressById.pending, state => {
        state.loading = true;
      })
      .addCase(getAddressById.fulfilled, (state, action) => {
        state.address = action.payload.data;
        state.loading = false;
        state.errors = null;
      })
      .addCase(getAddressById.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
    builder
      .addCase(updateAddress.pending, state => {
        state.loading = true;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.addresses = state.addresses.map(item =>
          item.id !== action.payload.data.id ? item : action.payload.data
        );
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
