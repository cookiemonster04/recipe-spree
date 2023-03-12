import React, { StrictMode } from "react";
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
      <App />
    </BrowserRouter>
  </StrictMode>
);
