import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../libs/axiosInstance";

interface Project {
  id: string;
  title: string;
  details: string;
  budget: number;
  deadline: string;
  status: string;
  priority: string;
  clientId: string;
}

interface ProjectState {
  projects: {
    data: Project[];
    isLoading: boolean;
  };
  singleProject: {
    data: Project | null;
    isLoading: boolean;
  };
}

const initialState: ProjectState = {
  projects: {
    data: [],
    isLoading: false,
  },
  singleProject: {
    data: null,
    isLoading: false,
  },
};

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (
    payload: {
      userId: string;
    },
    thunkApi
  ) => {
    const { userId } = payload;
    try {
      const res = await axiosInstance.get(`/api/project/get/user/${userId}`);
      return res?.data?.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchSingleProject = createAsyncThunk(
  "projects/fetchSingleProject",
  async (payload: { id: string }, thunkApi) => {
    try {
      const { id } = payload;
      const res = await axiosInstance.get(`/api/project/get/one/${id}`);
      return res?.data?.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const addProject = createAsyncThunk(
  "projects/addProject",
  async (payload: {
    name: string;
    email: string;
    phone: string;
    userId: string;
    company?: string;
    notes?: string;
  }) => {
    const res = await axiosInstance.post(`/api/project/create`, payload);
    return res?.data?.data;
  }
);

export const updateProject = createAsyncThunk(
  "projects/updateProject",
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
      const res = await axiosInstance.put(`/api/project/update/${id}`, data);
      return res?.data?.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
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

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.projects.isLoading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects.isLoading = false;
        state.projects.data = action.payload;
      })
      .addCase(fetchProjects.rejected, (state) => {
        state.projects.isLoading = false;
      });

    builder
      .addCase(fetchSingleProject.pending, (state) => {
        state.singleProject.isLoading = true;
      })
      .addCase(fetchSingleProject.fulfilled, (state, action) => {
        state.singleProject.isLoading = false;
        state.singleProject.data = action.payload;
      })
      .addCase(fetchSingleProject.rejected, (state) => {
        state.singleProject.isLoading = false;
      });

    builder
      .addCase(addProject.pending, (state) => {
        state.projects.isLoading = true;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.projects.isLoading = false;
        state.projects.data.push(action.payload);
      })
      .addCase(addProject.rejected, (state) => {
        state.projects.isLoading = false;
      });

    builder
      .addCase(updateProject.pending, (state) => {
        state.projects.isLoading = true;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.projects.isLoading = false;
        const index = state.projects.data.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) {
          state.projects.data[index] = action.payload;
        }
      })
      .addCase(updateProject.rejected, (state) => {
        state.projects.isLoading = false;
      });

    builder
      .addCase(deleteProject.pending, (state) => {
        state.projects.isLoading = true;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects.isLoading = false;
        state.projects.data = state.projects.data.filter(
          (c) => c.id !== action.payload
        );
      })
      .addCase(deleteProject.rejected, (state) => {
        state.projects.isLoading = false;
      });
  },
});

export default projectsSlice.reducer;
