import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axiosClient from "../../axios-client";
import {alertSuccess} from "../../components/alert";

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (payload, {rejectWithValue}) => {
    try {
      const response = await axiosClient.post("/signup", payload);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data.errors);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload, {rejectWithValue}) => {
    try {
      const response = await axiosClient.post("/login", payload);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, {rejectWithValue}) => {
    try {
      await axiosClient.post("/logout");
      return true;
    } catch (err) {
      return rejectWithValue("Logout failed");
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (passwordData, {rejectWithValue}) => {
    try {
      const response = await axiosClient.patch(
        "/change-password",
        passwordData
      );
      alertSuccess(response.data.message);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.errors);
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async ({id, data}, {rejectWithValue}) => {
    try {
      const response = await axiosClient.patch(`/user/${id}/profile`, data);
      alertSuccess(response.data.message);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.errors);
    }
  }
);

export const changePhoto = createAsyncThunk(
  "auth/changePhoto",
  async (photo, {rejectWithValue}) => {
    try {
      const formData = new FormData();
      formData.append("photo", photo);

      const response = await axiosClient.post(
        "/user/profile-picture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alertSuccess(response.data.message);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.errors);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    loading: false,
    errors: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(signupUser.pending, state => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(signupUser.fulfilled, state => {
        state.loading = false;
        state.errors = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        localStorage.setItem("ACCESS_TOKEN", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
    builder
      .addCase(logout.pending, (state, action) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        localStorage.removeItem("ACCESS_TOKEN", action.payload.token);
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
    builder
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.notification = action.payload.message;
      })
      .addCase(changePassword.pending, state => {
        state.loading = true;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
    builder
      .addCase(updateUser.pending, state => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = action.false;
        state.errors = action.payload;
      });
    builder
      .addCase(changePhoto.pending, state => {
        state.loading = true;
      })
      .addCase(changePhoto.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.loading = false;
      })
      .addCase(changePhoto.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload?.errors;
      });
  },
});

export default authSlice.reducer;
