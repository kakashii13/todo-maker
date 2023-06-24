import { useState, useEffect } from "react";
import { Heading, Icon, List, ListItem, Text, VStack } from "@chakra-ui/react";
import { getAll, removeItem } from "../service/users";
import { useTodoContext } from "../context/TodoContext";
import { AiTwotoneDelete, AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../hooks/useAlert";

export const Users = () => {
  const { user } = useTodoContext();
  const createAlert = useAlert();
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  // get users from DB
  useEffect(() => {
    if (user && !user.isAdmin && !user.token) return;
    const getUsers = async () => {
      const users = await getAll();
      setUsers(users);
    };
    getUsers();
  }, [user]);

  // delete an user from DB
  const handleDelete = async (id) => {
    createAlert("User removed", "error");
    const usersFiltered = users.filter((u) => u.id !== id);
    setUsers(usersFiltered);
    await removeItem(id);
  };

  return (
    <VStack spacing="5">
      <Icon
        as={AiOutlineArrowLeft}
        onClick={() => navigate("/dashboard")}
        position="absolute"
        left={10}
      />
      <VStack>
        <Heading>Users</Heading>
        {user && user.isAdmin ? (
          <List>
            {users &&
              users.map((user) => (
                <ListItem
                  key={user.id}
                  border="1px solid #ddd"
                  p="10px"
                  my="10px"
                  borderRadius="5px"
                  position="relative"
                >
                  <Text>username: {user.username}</Text>
                  <Text>email: {user.email}</Text>
                  <Text>id: {user.id}</Text>
                  {user && !user.isAdmin ? (
                    <Icon
                      as={AiTwotoneDelete}
                      onClick={() => handleDelete(user.id)}
                      position="absolute"
                      top="2"
                      right="2"
                    />
                  ) : (
                    ""
                  )}
                </ListItem>
              ))}
          </List>
        ) : (
          <Text>Unauthorized</Text>
        )}
      </VStack>
    </VStack>
  );
};
