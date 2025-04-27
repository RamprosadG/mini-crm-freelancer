import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../libs/axiosInstance";

interface Log {
  id: string;
  date: string;
  interactionType: string;
  notes?: string;
  clientId?: string;
  projectId?: string;
}

interface LogState {
  data: Log[];
  isLoading: boolean;
}

const initialState: LogState = {
  data: [],
  isLoading: false,
};

export const fetchLogByClientId = createAsyncThunk(
  "logs/fetchLogByClientId",
  async (
    payload: {
      clientId: string;
    },
    thunkApi
  ) => {
    const { clientId } = payload;
    try {
      const res = await axiosInstance.get(`/api/log/get/client/${clientId}`);
      return res?.data?.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchLogByProjectId = createAsyncThunk(
  "logs/fetchLogByProjectId",
  async (
    payload: {
      projectId: string;
    },
    thunkApi
  ) => {
    const { projectId } = payload;
    try {
      const res = await axiosInstance.get(`/api/log/get/project/${projectId}`);
      return res?.data?.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const addLog = createAsyncThunk(
  "logs/addLog",
  async (payload: {
    date: string;
    interactionType: string;
    notes?: string;
    clientId?: string;
    projectId?: string;
  }) => {
    const res = await axiosInstance.post(`/api/log/create`, payload);
    return res?.data?.data;
  }
);

export const updateLog = createAsyncThunk(
  "logs/updateLog",
  async (
    payload: {
      id: string;
      date?: string;
      interactionType?: string;
      notes?: string;
      clientId?: string;
      projectId?: string;
    },
    thunkApi
  ) => {
    try {
      const { id, ...data } = payload;
      const res = await axiosInstance.put(`/api/log/update/${id}`, data);
      return res?.data?.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteLog = createAsyncThunk(
  "logs/deleteLog",
  async (payload: { id: string }, thunkApi) => {
    try {
      const { id } = payload;
      const res = await axiosInstance.delete(`/api/project/delete/${id}`);
      return res?.data?.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const logsSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogByClientId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLogByClientId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchLogByClientId.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(fetchLogByProjectId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLogByProjectId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchLogByProjectId.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(addLog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addLog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(action.payload);
      })
      .addCase(addLog.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(updateLog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateLog.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.data.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateLog.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(deleteLog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteLog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.filter((c) => c.id !== action.payload);
      })
      .addCase(deleteLog.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default logsSlice.reducer;
