import React from "react";
import { NavLink } from "react-router-dom";
import DarkModeToggle from "react-dark-mode-toggle";
import logo from '../../assets/logo.png'
import "./Navbar.css";

export default function Navbar({
  handleTheme,
  getTheme,
  user,
}) {
  return (
    <nav className={getTheme === "light" ? "nav navlight" : "nav navdark"}>
      <NavLink to="/" className="site-title">
        RecipeSpree
        <img src={logo} style={{ marginLeft: "10px", width: "60px", height: "60px"}}/>
      </NavLink>

      <ul>
        <li>
        <DarkModeToggle
          onChange={handleTheme}
          checked={getTheme === "dark"}
          size={80}
        />
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