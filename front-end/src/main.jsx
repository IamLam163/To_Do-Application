import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ColorSchemeProvider } from "@mantine/core";
import { UserContextProvider } from "./context/userContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <ColorSchemeProvider>
        <App />
      </ColorSchemeProvider>
    </UserContextProvider>
  </React.StrictMode>,
);
