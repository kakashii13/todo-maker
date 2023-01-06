import axios from "axios";

const baseUrl = "http://localhost:3000";

export const signup = async (user) => {
  const { data } = await axios.post(`${baseUrl}/api/signup`, user);
  return data;
};
