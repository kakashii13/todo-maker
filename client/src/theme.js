import { extendTheme, theme as themeChakra } from "@chakra-ui/react";

const colorPrimaryBorder = "twitter";
const colorPrimary = themeChakra.colors.twitter;

export const theme = extendTheme({
  fonts: {
    body: `"Roboto Mono", monospace`,
    heading: `"Roboto Mono", monospace`,
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  colors: {
    primary: colorPrimary,
  },
  styles: {
    global: (props) => ({
      "html, #root, body": {
        h: "100vh",
        bg: props.colorMode === "light" ? "gray.100" : "gray.800",
      },
      svg: {
        cursor: "pointer",
      },
      form: (props) => ({
        border: "1px solid",
        borderColor: props.colorMode === "light" ? "gray.300" : "gray.700",
        borderRadius: "5px",
        padding: "20px 10px",
      }),
    }),
  },
  components: {
    Input: {
      baseStyle: {},
      sizes: {},
      defaultProps: {
        focusBorderColor: `${colorPrimaryBorder}.500`,
      },
      variants: {
        outline: (props) => ({
          field: {
            border: "1px solid",
            borderColor: props.colorMode === "light" ? "gray.300" : "gray.700",
            _focus: {},
          },
        }),
      },
    },
    Button: {
      variants: {
        solid: (props) => ({
          bg: `${props.colorScheme}.500`,
          color: "white",
          _hover: {
            backgroundColor: `${props.colorScheme}.600`,
          },
        }),
        ghost: (props) => ({
          _hover: {
            backgroundColor:
              props.colorMode === "light"
                ? `${props.colorScheme}.200`
                : `${props.colorScheme}.700`,
          },
        }),
      },
    },
    // Checkbox: {
    //   baseStyle: {
    //     icon: {
    //       color: "white",
    //     },
    //     control: {
    //       _checked: (props) => ({
    //         backgroundColor: `${props.colorScheme}.500`,
    //         borderColor: `${props.colorScheme}.500`,
    //       }),
    //     },
    //   },
    // },
  },
});
