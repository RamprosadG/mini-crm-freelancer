import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "../features/auth/authSlice";
import clientsReducer from "../features/clients/clientsSlice";
import preferencesReducer from "../features/preferences/preferencesSlice";

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
