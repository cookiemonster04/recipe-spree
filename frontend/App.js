import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HelloWorld from "./routes/HelloWorld";
import ByeWorld from "./routes/ByeWorld";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HelloWorld />} />
        <Route path="/bye" element={<ByeWorld />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
