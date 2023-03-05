import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ReactSwitch from "react-switch";
import SearchBar from "./SearchBar";
import "./Navbar.css";

export default function Navbar({
  handleTheme,
  getTheme,
  posts,
  setSearchResults,
}) {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [minimized, setMinimized] = useState(false);

  function handleScroll() {
    console.log("scroll")
    const currentScrollPos = window.pageYOffset;
    setMinimized(prevScrollPos < currentScrollPos &&
                 currentScrollPos > 10);
    setPrevScrollPos(currentScrollPos);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, minimized, handleScroll]);
  
  let className = getTheme === "light" ? "nav navlight" : "nav navdark";
  if (minimized) {
    className += " minimized";
  }

  return (
    <nav className={className}>
      <NavLink to="/" className="site-title">
        Site Name
      </NavLink>
      <SearchBar posts={posts} setSearchResults={setSearchResults} />
      <ul>
        <li>
          <ReactSwitch onChange={handleTheme} checked={getTheme === "dark"} />
        </li>
        <li>
          <NavLink to="/profile/:userId">Profile?</NavLink>
        </li>
        <li>
          <NavLink to="/explore">Explore</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/signup">Signup</NavLink>
        </li>
      </ul>
    </nav>
  );
}
