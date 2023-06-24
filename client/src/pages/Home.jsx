import { Button, Heading, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { DefaultTodo } from "../components/DefaultTodo";

export const Home = () => {
  return (
    <VStack spacing={20}>
      <HStack width="100%" justifyContent="space-between">
        <VStack spacing={0} fontWeight="700">
          <Text>Todo</Text>
          <Text>Maker</Text>
        </VStack>
        <HStack>
          <Link to="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link to="/signup">
            <Button variant="ghost">Sign up</Button>
          </Link>
        </HStack>
      </HStack>
      <VStack spacing={8}>
        <Heading textAlign="center" as="h2" fontSize="25px">
          ORGANIZE YOUR WORK AND TASKS.
        </Heading>
        <VStack w="100%" spacing={6}>
          <Link to="/signup">
            <Button colorScheme="primary">Start for free</Button>
          </Link>
          <Input placeholder="Make a todo 😀" boxShadow="base" isReadOnly />
          <DefaultTodo text="Make homework" />
          <DefaultTodo text="Buy Coffe" />
        </VStack>
      </VStack>
    </VStack>
  );
};
