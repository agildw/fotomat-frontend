import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#535C91",
    },
    secondary: {
      main: "#6C75AB",
    },
    background: {
      default: "#070f2b",
      paper: "#1b1a55",
    },
    text: {
      primary: "#dcd8d8",
      secondary: "#dcd8d8",
      disabled: "#616161",
    },
    info: {
      main: "#918853",
    },
    action: {
      disabledBackground: "#616161",
      disabled: "#dcd8d8",
    },
  },
});

export default theme;
