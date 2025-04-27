import { createSlice } from "@reduxjs/toolkit";

interface PreferencesState {
  theme: "light" | "dark";
  sidebar: boolean;
}

const initialState: PreferencesState = {
  theme: "light",
  sidebar: false,
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    },
    setSidebar(state, action) {
      state.sidebar = action.payload;
    },
  },
});

export const { setTheme, setSidebar } = preferencesSlice.actions;

export default preferencesSlice.reducer;
