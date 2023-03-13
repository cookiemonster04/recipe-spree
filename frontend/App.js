import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { getPosts } from "./api/axios";
import axios from "axios";
import ListPage from "./components/ListPage";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import Survey from "./routes/Survey"
import Explore from "./routes/Explore";
import RecipePage from "./routes/RecipePage";
import Signup from "./routes/Signup";
import { ProfilePage, ProfileHome } from "./routes/ProfilePage";
import Login from "./routes/Login";
import Logout from "./routes/Logout";
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
        posts={posts}
        setSearchResults={setSearchResults}
        user={user}
      />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/survey" element={<Survey/>}/>
          <Route path="/explore" element={<Explore />} />
          <Route
            path="/recipe/:recipeId"
            element={<RecipePage user={user} />}
          />
          <Route
            path="/signup"
            element={<Signup user={user} setUser={setUser} />}
          />
          <Route path="/profile" element={<ProfileHome user={user} />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
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
/*      <ListPage searchResults={searchResults} /> Re-add this into above div */
