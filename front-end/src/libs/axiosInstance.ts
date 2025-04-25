/* eslint-disable @typescript-eslint/no-explicit-any */
// axiosInstance.js
import axios from "axios";
import { baseUrl } from "../configs/config";

let store: any;

export const injectStore = (_store: any) => {
  store = _store;
};

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (store) {
      const token = store.getState().auth?.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
