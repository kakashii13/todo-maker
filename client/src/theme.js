import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    body: `"Roboto Mono", monospace`,
    heading: `"Roboto Mono", monospace`,
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  styles: {
    global: (props) => ({
      "html, #root, body": {
        h: "100vh",
        bg: props.colorMode === "light" ? "gray.50" : "gray.800",
      },
      svg: {
        cursor: "pointer",
      },
    }),
  },
});
