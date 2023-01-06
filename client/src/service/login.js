import axios from "axios";

const baseUrl = "http://localhost:3000";

export const login = async (credentials) => {
  const { data } = await axios.post(`${baseUrl}/api/login`, credentials);
  return data;
};
