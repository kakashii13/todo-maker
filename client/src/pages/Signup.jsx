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
import { useTodoContext } from "../context/TodoContext";
import { saveToken } from "../service/token";
import { signup } from "../service/signup";
import { Link } from "react-router-dom";

export const Signup = () => {
  const { saveUser } = useTodoContext();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleUsername = (target) => {
    setUsername(target.value);
  };
  const handleEmail = (target) => {
    setEmail(target.value);
  };
  const handlePassword = (target) => {
    setPass(target.value);
  };

  const saveToLocal = (user) => {
    const userLocal = JSON.stringify(user);
    localStorage.setItem("todoMakerLogged", userLocal);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password)
      return setErrorMessage("Complete all fields");
    try {
      const dbUser = await signup({ username, email, password });
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
              type="text"
              placeholder="username"
              value={username}
              onChange={({ target }) => handleUsername(target)}
              maxW="300px"
            />
            <Input
              type="email"
              placeholder="email"
              value={email}
              onChange={({ target }) => handleEmail(target)}
              maxW="300px"
            />
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={({ target }) => handlePassword(target)}
              maxW="300px"
            />
            <Button type="submit" minW="300px" colorScheme="purple" my="10px">
              Signup
            </Button>
            <Text>You have already an account?</Text>
            <Link to="/login">
              <Text color="blue.500">Login</Text>
            </Link>
            {errorMessage ? (
              <Text textAlign="center" color="red.500">
                {errorMessage}
              </Text>
            ) : (
              ""
            )}
          </VStack>
        </FormControl>
      </form>
    </VStack>
  );
};
