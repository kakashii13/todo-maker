import axios from "axios";

const baseUrl = import.meta.env.VITE_URL_BASE;

export const login = async (credentials) => {
  const { data } = await axios.post(`${baseUrl}/api/login`, credentials);
  return data;
};
