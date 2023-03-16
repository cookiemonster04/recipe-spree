import React from "react";
import { NavLink } from "react-router-dom";
import ReactSwitch from "react-switch";
import SearchBar from "./SearchBar";
import logo from '../../assets/logo.png'
import "./Navbar.css";

export default function Navbar({
  handleTheme,
  getTheme,
  posts,
  setSearchResults,
  user,
}) {
  return (
    <nav className={getTheme === "light" ? "nav navlight" : "nav navdark"}>
      <NavLink to="/" className="site-title">
        RecipeSpree
        <img src={logo} style={{ marginLeft: "10px", width: "80px", height: "80px"}}/>
      </NavLink>

      <ul>
        <li>
          <ReactSwitch onChange={handleTheme} checked={getTheme === "dark"} />
        </li>
        <li>
          <NavLink to="/search">Search</NavLink>
        </li>
        {user && (
          <>
            <li>
              <NavLink to="/recommend">Recommend</NavLink>
            </li>
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <li>
              <NavLink to="/logout">Logout</NavLink>
            </li>
          </>
        )}
        {!user && (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Signup</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
/*
  <SearchBar posts={posts} setSearchResults={setSearchResults} />
*/