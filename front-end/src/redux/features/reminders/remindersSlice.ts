import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../libs/axiosInstance";

interface Reminder {
  id: string;
  title: string;
  dueDate: string;
  description?: string;
  isCompleted?: boolean;
  clientId?: string;
  projectId?: string;
}

interface ReminderState {
  data: Reminder[];
  isLoading: boolean;
}

const initialState: ReminderState = {
  data: [],
  isLoading: false,
};

export const fetchReminderByClientId = createAsyncThunk(
  "reminders/fetchReminderByClientId",
  async (
    payload: {
      clientId: string;
    },
    thunkApi
  ) => {
    const { clientId } = payload;
    try {
      const res = await axiosInstance.get(
        `/api/reminder/get/client/${clientId}`
      );
      return res?.data?.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchReminderByProjectId = createAsyncThunk(
  "reminders/fetchReminderByProjectId",
  async (
    payload: {
      projectId: string;
    },
    thunkApi
  ) => {
    const { projectId } = payload;
    try {
      const res = await axiosInstance.get(
        `/api/reminder/get/project/${projectId}`
      );
      return res?.data?.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const addReminder = createAsyncThunk(
  "reminders/addReminder",
  async (payload: {
    date: string;
    interactionType: string;
    notes?: string;
    clientId?: string;
    projectId?: string;
  }) => {
    const res = await axiosInstance.post(`/api/reminder/create`, payload);
    return res?.data?.data;
  }
);

export const updateReminder = createAsyncThunk(
  "reminders/updateReminder",
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
      const res = await axiosInstance.put(`/api/reminder/update/${id}`, data);
      return res?.data?.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteReminder = createAsyncThunk(
  "reminders/deleteReminder",
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

const remindersSlice = createSlice({
  name: "reminders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReminderByClientId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchReminderByClientId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchReminderByClientId.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(fetchReminderByProjectId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchReminderByProjectId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchReminderByProjectId.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(addReminder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addReminder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(action.payload);
      })
      .addCase(addReminder.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(updateReminder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateReminder.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.data.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateReminder.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(deleteReminder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteReminder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.filter((c) => c.id !== action.payload);
      })
      .addCase(deleteReminder.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default remindersSlice.reducer;
