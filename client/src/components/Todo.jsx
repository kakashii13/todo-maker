import { Checkbox, Text, HStack, Icon, useColorMode } from "@chakra-ui/react";
import { useAlert } from "../hooks/useAlert";
import { udpate, removeItem } from "../service/todos";
import { AiTwotoneDelete } from "react-icons/ai";

export const Todo = ({ todo, deleteTodoFromTodos }) => {
  const createAlert = useAlert();
  const { colorMode } = useColorMode();

  const handleUpdate = async (e) => {
    if (e.target.checked) {
      createAlert("Todo completed", "success");
    } else {
      createAlert("Todo uncompleted", "warning");
    }
    await udpate({ todo: todo.todo, complete: e.target.checked }, todo.id);
  };

  const handleDelete = async (e) => {
    createAlert("Todo deleted", "error");
    deleteTodoFromTodos(todo.id);
    await removeItem(todo.id);
  };

  return (
    <HStack
      justifyContent="space-between"
      boxShadow="base"
      my="10px"
      p="10px"
      borderRadius="10px"
      bg={colorMode === "light" ? "white" : "gray.700"}
    >
      <HStack spacing={5}>
        <Checkbox
          colorScheme="primary"
          defaultChecked={todo.complete ? true : false}
          onChange={handleUpdate}
        />
        <Text>{todo.todo}</Text>
      </HStack>
      <Icon as={AiTwotoneDelete} onClick={handleDelete} />
    </HStack>
  );
};
