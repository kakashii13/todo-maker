import axios from "axios";

const baseUrl = import.meta.env.VITE_URL_BASE;

export const signup = async (user) => {
  const { data } = await axios.post(`${baseUrl}/api/signup`, user);
  return data;
};
