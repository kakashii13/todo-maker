import { ChakraProvider, Container } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Users } from "./pages/Users";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";

import { theme } from "./theme";
import "@fontsource/roboto-mono";
import { ContextProvider } from "./context/TodoContext";
import { PrivateRoute } from "./components/PrivateRoute";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Container h="100%" p="30px">
        <ContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/users"
                element={
                  <PrivateRoute>
                    <Users />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ContextProvider>
      </Container>
    </ChakraProvider>
  );
}

export default App;
