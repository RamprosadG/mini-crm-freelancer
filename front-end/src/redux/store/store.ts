import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import authReducer from "../features/auth/authSlice"; // Ensure this import is correct
import storage from "redux-persist/lib/storage"; // Correct import of storage

// Persist config
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"], // Specify which parts of the state to persist
};

// Combine reducers with persistence for auth
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
});

// Configure store with middleware
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializableCheck for persisting data
    }),
});

// Export types for use in hooks
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export type AppState = ReturnType<typeof store.getState>;

export default store;
