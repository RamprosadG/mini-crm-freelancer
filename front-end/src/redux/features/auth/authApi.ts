/* eslint-disable no-useless-catch */

import axiosInstance from "../../../libs/axiosInstance";

export const performLogin = async (email: string, password: string) => {
  const data = {
    email,
    password,
  };
  try {
    const res = await axiosInstance.post("/api/auth/login", data);
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const performRegister = async (
  username: string,
  email: string,
  password: string
) => {
  const data = {
    username,
    email,
    password,
  };

  try {
    const res = await axiosInstance.post("/api/auth/register", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const performCheckLogin = async () => {
  try {
    const res = await axiosInstance.post(`/api/auth/checkLogin`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
