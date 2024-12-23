import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axiosClient from "../../axios-client";

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (payload, {rejectWithValue}) => {
    try {
      const response = await axiosClient.post("/signup", payload);
      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 422) {
        return rejectWithValue(err.response.data.errors);
      }
      throw err;
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload, {rejectWithValue}) => {
    try {
      const response = await axiosClient.post("/login", payload);
      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 422) {
        return rejectWithValue(err.response.data);
      }
      throw err;
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, {dispatch, rejectWithValue}) => {
    try {
      await axiosClient.post("/logout");
      dispatch(authSlice.actions.clearAuth());
    } catch (err) {
      return rejectWithValue("Logout failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    token: null,
    loading: false,
    errors: null,
  },
  reducers: {
    clearAuth: state => {
      state.user = {};
      state.token = null;
      state.loading = false;
      state.errors = null;
      localStorage.removeItem("ACCESS_TOKEN");
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;

        localStorage.setItem("ACCESS_TOKEN", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload?.errors || {
          email: [action.payload?.message],
        };
      })
      .addCase(signupUser.pending, state => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("ACCESS_TOKEN", action.payload.token);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
  },
});

export const {clearAuth} = authSlice.actions;
export default authSlice.reducer;
