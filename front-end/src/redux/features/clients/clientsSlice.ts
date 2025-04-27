import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../libs/axiosInstance";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  notes?: string;
}

interface ClientState {
  clients: {
    data: Client[];
    isLoading: boolean;
  };
  singleClient: {
    data: Client | null;
    isLoading: boolean;
  };
}

const initialState: ClientState = {
  clients: {
    data: [],
    isLoading: false,
  },
  singleClient: {
    data: null,
    isLoading: false,
  },
};

export const fetchClients = createAsyncThunk(
  "clients/fetchClients",
  async (
    payload: {
      userId: string;
    },
    thunkApi
  ) => {
    const { userId } = payload;
    try {
      const res = await axiosInstance.get(`/api/client/get/user/${userId}`);
      return res?.data?.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchSingleClient = createAsyncThunk(
  "clients/fetchSingleClient",
  async (payload: { id: string }, thunkApi) => {
    try {
      const { id } = payload;
      const res = await axiosInstance.get(`/api/client/get/one/${id}`);
      return res?.data?.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const addClient = createAsyncThunk(
  "clients/addClient",
  async (payload: {
    name: string;
    email: string;
    phone: string;
    userId: string;
    company?: string;
    notes?: string;
  }) => {
    const res = await axiosInstance.post(`/api/client/create`, payload);
    return res?.data?.data;
  }
);

export const updateClient = createAsyncThunk(
  "clients/updateClient",
  async (
    payload: {
      id: string;
      name?: string;
      email?: string;
      phone?: string;
      company?: string;
      notes?: string;
    },
    thunkApi
  ) => {
    try {
      const { id, ...data } = payload;
      const res = await axiosInstance.put(`/api/client/update/${id}`, data);
      return res?.data?.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteClient = createAsyncThunk(
  "clients/deleteClient",
  async (payload: { id: string }, thunkApi) => {
    try {
      const { id } = payload;
      const res = await axiosInstance.delete(`/api/client/delete/${id}`);
      return res?.data?.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.clients.isLoading = true;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.clients.isLoading = false;
        state.clients.data = action.payload;
      })
      .addCase(fetchClients.rejected, (state) => {
        state.clients.isLoading = false;
      });

    builder
      .addCase(fetchSingleClient.pending, (state) => {
        state.singleClient.isLoading = true;
      })
      .addCase(fetchSingleClient.fulfilled, (state, action) => {
        state.singleClient.isLoading = false;
        state.singleClient.data = action.payload;
      })
      .addCase(fetchSingleClient.rejected, (state) => {
        state.singleClient.isLoading = false;
      });

    builder
      .addCase(addClient.pending, (state) => {
        state.clients.isLoading = true;
      })
      .addCase(addClient.fulfilled, (state, action) => {
        state.clients.isLoading = false;
        state.clients.data.push(action.payload);
      })
      .addCase(addClient.rejected, (state) => {
        state.clients.isLoading = false;
      });

    builder
      .addCase(updateClient.pending, (state) => {
        state.clients.isLoading = true;
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        state.clients.isLoading = false;
        const index = state.clients.data.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) {
          state.clients.data[index] = action.payload;
        }
      })
      .addCase(updateClient.rejected, (state) => {
        state.clients.isLoading = false;
      });

    builder
      .addCase(deleteClient.pending, (state) => {
        state.clients.isLoading = true;
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.clients.isLoading = false;
        state.clients.data = state.clients.data.filter(
          (c) => c.id !== action.payload
        );
      })
      .addCase(deleteClient.rejected, (state) => {
        state.clients.isLoading = false;
      });
  },
});

export default clientsSlice.reducer;
