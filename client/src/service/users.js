import axios from "axios";
import { token } from "./token";

const baseUrl = import.meta.env.VITE_URL_BASE;

export const getAll = async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  if (!token) return;
  const { data } = await axios.get(`${baseUrl}/api/users`, config);
  return data;
};

export const getItem = async (id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  if (!token) return;
  const { data } = await axios.get(`${baseUrl}/api/users/${id}`, config);
  return data;
};

export const removeItem = async (id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  if (!token) return;
  const { data } = await axios.delete(`${baseUrl}/api/users/${id}`, config);
  return data;
};
