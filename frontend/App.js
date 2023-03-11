import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { getPosts } from "./api/axios";
import ListPage from "./components/ListPage";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import Explore from "./routes/Explore";
import RecipePage from "./routes/RecipePage";
import Signup from "./routes/Signup";
import ProfilePage from "./routes/ProfilePage";
import Login from "./routes/Login";
import "./App.css";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    getPosts()
      .then((json) => {
        setPosts(json);
        return json;
      })
      .then((json) => {
        setSearchResults(json);
      });
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
        posts={posts}
        setSearchResults={setSearchResults}
      />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/recipe/:recipeId" element={<RecipePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <ListPage searchResults={searchResults} />
    </div>
  );
}

export default App;
