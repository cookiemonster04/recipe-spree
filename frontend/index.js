import React, { StrictMode } from "react";
import { ColorModeScript } from "@chakra-ui/react"
import { createRoot } from "react-dom/client";
import ScrollReset from "./routes/ScrollReset";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter>
      <ScrollReset />
      <ColorModeScript />
      <App />
    </BrowserRouter>
  </StrictMode>
);
