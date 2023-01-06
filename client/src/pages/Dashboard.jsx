import { useEffect, useState } from "react";
import {
  Button,
  Heading,
  HStack,
  Icon,
  List,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { CreateTodo } from "../components/CreateTodo";

import { getAll } from "../service/todos";
import { Todo } from "../components/Todo";
import { RiLogoutCircleLine } from "react-icons/ri";
import { BsFillMoonFill, BsSunFill } from "react-icons/bs";
import { useTodoContext } from "../context/TodoContext";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const { user } = useTodoContext();
  const [todos, setTodos] = useState([]);
  const { colorMode, toggleColorMode } = useColorMode();

  const navigate = useNavigate();

  useEffect(() => {
    const getTodos = async () => {
      const todos = await getAll();
      setTodos(todos);
    };
    getTodos();
  }, [user]);

  const handleTodos = (todo) => {
    setTodos([...todos, todo]);
  };

  const deleteTodoFromTodos = (id) => {
    const todosFiltered = todos.filter((t) => t.id != id);
    setTodos(todosFiltered);
  };

  const logout = () => {
    localStorage.removeItem("todoMakerLogged");
    navigate("/");
  };

  return (
    <VStack>
      <HStack justifyContent="end" w="100%">
        <Icon as={RiLogoutCircleLine} onClick={logout} />
        <Icon
          onClick={toggleColorMode}
          as={colorMode === "light" ? BsFillMoonFill : BsSunFill}
        />
      </HStack>
      <VStack alignItems="start" w="100%">
        <HStack justifyContent="space-between" w="100%" my="10px">
          <Heading>Hello, {user ? user.username : "nobody"}</Heading>
          {user && user.isAdmin ? (
            <Button onClick={() => navigate("/users")}>Users</Button>
          ) : (
            ""
          )}
        </HStack>
        <CreateTodo handleTodos={handleTodos} />
        <List w="100%">
          {todos.map((todo) => (
            <Todo
              todo={todo}
              key={todo.id}
              deleteTodoFromTodos={deleteTodoFromTodos}
            />
          ))}
        </List>
      </VStack>
    </VStack>
  );
};
