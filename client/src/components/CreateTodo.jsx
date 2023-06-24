import { useState } from "react";
import { FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import { useAlert } from "../hooks/useAlert";
import { create } from "../service/todos";

export const CreateTodo = ({ handleTodos }) => {
  const [todo, setTodo] = useState("");
  const [error, setError] = useState(false);
  const createAlert = useAlert();

  // function to save TODO text in a state
  const handleChange = (target) => {
    setTodo(target.value);
    if (error) return setError(false);
  };

  const addTodoToDB = async (e) => {
    if (!todo) return setError(true);

    if (e.key !== "Enter") return;
    // create a new todo
    const newTodo = await create(todo);
    createAlert("Todo created", "success");
    // set new todo to array of todos
    handleTodos(newTodo);
    setTodo("");
  };

  return (
    <FormControl isInvalid={error}>
      <Input
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
