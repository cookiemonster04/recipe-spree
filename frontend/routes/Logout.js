import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Logout = ({ setUser }) => {
  useEffect(() => {
    (async () => {
      await axios.get("/api/logout");
      setUser(null);
    })();
  });
  return <Navigate to="/" />;
};

export default Logout;
