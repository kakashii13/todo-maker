import axios from "axios";
import { token } from "./token";

const baseUrl = "http://localhost:3000";

const config = (token) => {
  const configDefault = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return configDefault;
};

export const getAll = async () => {
  if (!token) return [];
  const { data } = await axios.get(`${baseUrl}/api/todos`, config(token));
  return data;
};

export const create = async (todo) => {
  const { data } = await axios.post(
    `${baseUrl}/api/todos`,
    { todo },
    config(token)
  );
  return data;
};

export const udpate = async (todo, id) => {
  const { data } = await axios.put(
    `${baseUrl}/api/todos/${id}`,
    todo,
    config(token)
  );
  return data;
};

export const removeItem = async (id) => {
  if (!token) return;
  const { data } = await axios.delete(
    `${baseUrl}/api/todos/${id}`,
    config(token)
  );
  return data;
};
