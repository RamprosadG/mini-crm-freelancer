import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { performCheckLogin, performLogin, performRegister } from "./authApi";

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
  async (
    { email, password }: { email: string; password: string },
    thunkApi
  ) => {
    try {
      const data = await performLogin(email, password);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (
    {
      username,
      email,
      password,
    }: { username: string; email: string; password: string },
    thunkApi
  ) => {
    try {
      const data = await performRegister(username, email, password);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const checkLogin = createAsyncThunk(
  "auth/checkLogin",
  async (_, thunkApi) => {
    try {
      const data = await performCheckLogin();
      return data;
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
      })

      .addCase(checkLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload.data;
      })
      .addCase(checkLogin.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.user = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
