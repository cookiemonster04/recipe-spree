import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import Survey from "./routes/Survey"
import Search from "./routes/Search";
import Recommend from "./routes/Recommend";
import RecipePage from "./routes/RecipePage";
import Signup from "./routes/Signup";
import { ProfilePage, ProfileHome } from "./routes/ProfilePage";
import Login from "./routes/Login";
import Logout from "./routes/Logout";
import "./App.css";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [user, setUser] = useState(null);

  const solveCookie = () => {
    axios.get("/api/user").then(
      (ret) => {
        setUser(ret.data);
      },
      (err) => console.log(err)
    );
  };
  useEffect(() => {
    solveCookie();
  }, []);
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`App ${theme}`}>
      <Navbar
        getTheme={theme}
        handleTheme={toggleTheme}
        user={user}
      />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home user={user}/>} />
          <Route path="/survey" element={<Survey user={user} />}/>
          <Route path="/search" element={<Search themeMode={theme}/>} />
          <Route path="/recommend" element={<Recommend user={user}/>} />
          <Route
            path="/recipe/:recipeId"
            element={<RecipePage user={user} themeMode={theme} />}
          />
          <Route
            path="/signup"
            element={<Signup user={user} setUser={setUser} />}
          />
          <Route path="/profile" element={<ProfileHome user={user} themeMode={theme} />} />
          <Route path="/profile/:userId" element={<ProfilePage themeMode={theme} />} />
          <Route
            path="/login"
            element={<Login user={user} setUser={setUser} />}
          />
          <Route path="/logout" element={<Logout setUser={setUser} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;