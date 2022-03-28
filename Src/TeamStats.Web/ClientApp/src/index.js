import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import App from "./App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

import { Provider } from "react-redux";
import store from "./store";
const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
const rootElement = document.getElementById("root");

const theme = createTheme({
  palette: {
    primary: {
      main: "#0f393b",
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
    fontFamily: ["Sora"].join(","),
    fontSize: 13,
  },
});

ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </BrowserRouter>,
  rootElement
);

registerServiceWorker();
