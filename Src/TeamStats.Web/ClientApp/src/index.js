import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import App from "./App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
const rootElement = document.getElementById("root");

const theme = createTheme({
  palette: {
    primary: {
      main: "#00B074",
      contrastText: "#fff",
    },
    secondary: {
      main: "#F9CE31",
      contrastText: "#fff",
    },
    background: {
      default: "#EDF0EF",
    },
  },

  typography: {
    fontFamily: ["Inter"].join(","),
    fontSize: 13,
  },
});

ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  rootElement
);

registerServiceWorker();
