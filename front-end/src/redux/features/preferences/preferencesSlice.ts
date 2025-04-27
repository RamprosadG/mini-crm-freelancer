import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PreferencesState {
  theme: "light" | "dark";
}

const initialState: PreferencesState = {
  theme: "light",
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<"light" | "dark">) {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = preferencesSlice.actions;

export default preferencesSlice.reducer;
