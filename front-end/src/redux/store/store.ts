import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "../features/auth/authSlice";
import clientsReducer from "../features/clients/clientsSlice";
import preferencesReducer from "../features/preferences/preferencesSlice";
import projectsReducer from "../features/projects/projectSlice";
import logsReducer from "../features/logs/logsSlice";
import remindersReducer from "../features/reminders/remindersSlice";

const authPersistConfig = {
  key: "auth",
  storage,
};

const preferencesPersistConfig = {
  key: "preferences",
  storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  preferences: persistReducer(preferencesPersistConfig, preferencesReducer),
  clients: clientsReducer,
  projects: projectsReducer,
  logs: logsReducer,
  reminders: remindersReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export type AppState = ReturnType<typeof store.getState>;

export default store;
