import { Checkbox, HStack, Icon, useColorMode, Text } from "@chakra-ui/react";
import { AiTwotoneDelete } from "react-icons/ai";

export const DefaultTodo = ({ text }) => {
  const { colorMode } = useColorMode();

  return (
    <HStack
      justifyContent="space-between"
      w="100%"
      boxShadow="base"
      my="10px"
      p="10px"
      borderRadius="10px"
      bg={colorMode === "light" ? "white" : "gray.700"}
    >
      <HStack spacing={5}>
        <Checkbox colorScheme="primary" />
        <Text>{text}</Text>
      </HStack>
      <Icon as={AiTwotoneDelete} />
    </HStack>
  );
};
