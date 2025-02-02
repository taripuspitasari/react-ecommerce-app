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

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (passwordData, {rejectWithValue}) => {
    try {
      const response = await axiosClient.patch(
        "/change-password",
        passwordData
      );
      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 422) {
        return rejectWithValue(err.response.data);
      }
      throw err;
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async ({id, data}, {rejectWithValue}) => {
    try {
      const response = await axiosClient.patch(`/user/${id}/profile`, data);
      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 422) {
        return rejectWithValue(err.response.data);
      }
      throw err;
    }
  }
);

export const changePhoto = createAsyncThunk(
  "auth/changePhoto",
  async ({id, newPhoto}, {rejectWithValue}) => {
    try {
      // const formData = new FormData();
      // formData.append("image", newPhoto);

      const response = await axiosClient.patch(
        `/user/${id}/profile-picture`,
        newPhoto,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 422) {
        return rejectWithValue(err.response.data);
      }
      throw err;
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
    notification: null,
  },
  reducers: {
    clearAuth: state => {
      state.user = {};
      state.token = null;
      state.loading = false;
      state.errors = null;
      localStorage.removeItem("ACCESS_TOKEN");
    },
    clearNotification: state => {
      state.notification = null;
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
      });
    builder
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
      });
    builder.addCase(logout.rejected, (state, action) => {
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
        state.errors = action.payload?.errors || {
          new_password: [action.payload?.message],
        };
      });
    builder
      .addCase(updateUser.pending, state => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.notification = action.payload.message;
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
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(changePhoto.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload?.errors;
      });
  },
});

export const {clearAuth, clearNotification} = authSlice.actions;
export default authSlice.reducer;
