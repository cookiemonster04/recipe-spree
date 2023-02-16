import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { getPosts } from './api/axios';
import ListPage from "./components/ListPage";
import HelloWorld from "./routes/HelloWorld"; /* eventually remove */
import ByeWorld from "./routes/ByeWorld"; /* eventually remove */
import Navbar from './components/Navbar';
import Home from './routes/Home';
import About from './routes/About';
import Explore from './routes/Explore';
import './App.css';

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
    );

  const [posts, setPosts] = useState([])
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    getPosts().then(json => {
      setPosts(json);
      return json;
    }).then(json => {
      setSearchResults(json);
    })
  }, []);

  const toggleTheme = () => {
    if (theme === 'light'){
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`App ${theme}`}>
      <Navbar getTheme={theme} handleTheme={toggleTheme} posts={posts} setSearchResults={setSearchResults}/>
      <div className="container">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <ListPage searchResults={searchResults}/>
    </div>
  );
}

export default App;
