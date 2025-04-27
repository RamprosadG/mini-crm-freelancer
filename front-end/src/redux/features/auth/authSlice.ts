import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../libs/axiosInstance";

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  token: null,
  isLoading: false,
};

export const login = createAsyncThunk(
  "auth/login",
  async (payload: { email: string; password: string }, thunkApi) => {
    try {
      const res = await axiosInstance.post("/api/auth/login", payload);
      return res?.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (
    payload: { username: string; email: string; password: string },
    thunkApi
  ) => {
    try {
      const res = await axiosInstance.post("/api/auth/register", payload);
      return res?.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload.data;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
