import { useState, useEffect } from "react";
import { useContext, createContext } from "react";
import { saveToken } from "../service/token";
import { getItem } from "../service/users";

const todoContext = createContext();

export const useTodoContext = () => useContext(todoContext);

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const getUserFromLocal = localStorage.getItem("todoMakerLogged");
    if (!getUserFromLocal) return setUser(null);

    const isUserinDb = async () => {
      const user = JSON.parse(getUserFromLocal);
      saveToken(user.token);
      try {
        const userDB = await getItem(user.id);
        setUser(userDB);
      } catch (error) {
        setUser(null);
      }
    };
    isUserinDb();
  }, []);

  const saveUser = (user) => {
    setUser(user);
  };
  return (
    <todoContext.Provider value={{ user, saveUser }}>
      {children}
    </todoContext.Provider>
  );
};
