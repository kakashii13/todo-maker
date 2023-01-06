import { FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useAlert } from "../hooks/useAlert";
import { create } from "../service/todos";

export const CreateTodo = ({ handleTodos }) => {
  const [todo, setTodo] = useState("");
  const [error, setError] = useState(false);
  const createAlert = useAlert();

  const handleChange = (target) => {
    setTodo(target.value);
    if (error) return setError(false);
  };

  const addTodoToDB = async (e) => {
    if (!todo) return setError(true);
    if (e.key !== "Enter") return;
    const newTodo = await create(todo);
    createAlert("Todo created", "success");
    handleTodos(newTodo);
    setTodo("");
  };

  return (
    <FormControl isInvalid={error}>
      <Input
        focusBorderColor="purple.200"
        placeholder="Make a todo 😀"
        value={todo}
        onChange={({ target }) => handleChange(target)}
        onKeyDown={addTodoToDB}
        boxShadow="base"
      />
      {error && <FormErrorMessage>You must write something</FormErrorMessage>}
    </FormControl>
  );
};
