import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { getPosts } from "./api/axios";
import Cookies from "js-cookie";
import ListPage from "./components/ListPage";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import Explore from "./routes/Explore";
import RecipePage from "./routes/RecipePage";
import Signup from "./routes/Signup";
import { ProfilePage, ProfileHome } from "./routes/ProfilePage";
import Login from "./routes/Login";
import "./App.css";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
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
  const solveCookie = () => {
    const wrap = async () => {
      const val = Cookies.get("token");
      if (val) {
        // logged in
        setUser(await axios.get("/api/user/info"));
      }
    };
    wrap();
  };
  useEffect(solveCookie, []);
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
          <Route path="/signup" element={<Signup callback={solveCookie} />} />
          {/* {user && ( */}
          <Route path="/profile" element={<ProfileHome user={user} />} />
          {/* )} */}
          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/login" element={<Login callback={solveCookie} />} />
        </Routes>
      </div>
      <ListPage searchResults={searchResults} />
    </div>
  );
}

export default App;
