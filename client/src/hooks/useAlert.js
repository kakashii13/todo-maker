import { useToast } from "@chakra-ui/react";

export const useAlert = () => {
  const toast = useToast();
  const createAlert = (title, status) => {
    toast({
      title,
      status,
      duration: 2000,
      isClosable: true,
    });
  };
  return createAlert;
};
