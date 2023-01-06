import { Stack } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import { useTodoContext } from "../context/TodoContext";

export const PrivateRoute = ({ children }) => {
  const { user } = useTodoContext();
  return <Stack>{user === null ? <Navigate to="/login" /> : children}</Stack>;
};
