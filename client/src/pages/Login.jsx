import { useState } from "react";
import {
  Button,
  FormControl,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { login } from "../service/login";
import { useTodoContext } from "../context/TodoContext";
import { saveToken } from "../service/token";
import { Link } from "react-router-dom";

export const Login = () => {
  const { saveUser } = useTodoContext();
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleEmail = (target) => {
    setUserEmail(target.value);
  };
  const handlePassword = (target) => {
    setUserPass(target.value);
  };

  // save to local storage user data
  const saveToLocal = (user) => {
    const userLocal = JSON.stringify(user);
    localStorage.setItem("todoMakerLogged", userLocal);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userEmail || !userPass) return setErrorMessage("Complete all fields");
    try {
      const dbUser = await login({ email: userEmail, password: userPass });
      saveUser(dbUser);
      saveToken(dbUser.token);
      saveToLocal(dbUser);
      navigate("/dashboard");
    } catch (error) {
      const message = error.response.data.error;
      setErrorMessage(message);
    }
  };
  return (
    <VStack justifyContent="center" h="100%" spacing={4}>
      <Heading>Todo Maker</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl w="100%">
          <VStack spacing={5} justifyContent="center">
            <Input
              type="email"
              placeholder="email"
              value={userEmail}
              onChange={({ target }) => handleEmail(target)}
              maxW="300px"
            />
            <Input
              type="password"
              placeholder="password"
              value={userPass}
              onChange={({ target }) => handlePassword(target)}
              maxW="300px"
            />
            <Button type="submit" w="100%" colorScheme="primary" my="10px">
              Login
            </Button>
            {errorMessage ? <Text color="red.500">{errorMessage}</Text> : ""}
            <VStack spacing="0">
              <Text>New to TodoMaker?</Text>
              <Link to="/signup">
                <Text color="blue.500">Create an account.</Text>
              </Link>
            </VStack>
          </VStack>
        </FormControl>
      </form>
    </VStack>
  );
};
