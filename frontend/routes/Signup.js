import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import "./Signup.css";

const Item = ({ name, type, formValue, setFormValue, placeholder }) => {
  return (
    <div className="inputContainer">
      <input
        className="input"
        id={`signup_${name}`}
        type={type}
        value={formValue}
        onChange={(e) => {
          setFormValue(e.target.value);
        }}
        placeholder={placeholder}
      ></input>
      <label htmlFor={`signup_${name}`} className="label">
        {name.charAt(0).toUpperCase() + name.slice(1) + ":"}
      </label>
    </div>
  );
};

const Signup = ({ user, setUser, themeMode }) => {
  const theme = createTheme({
    palette : {
      mode: themeMode
    }
  })
  if (user) {
    return <Navigate to="/survey" />;
  }
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [messages, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post("/api/user", {
        username: username,
        password: password,
      })
      .then(
        (response) => {
          setIsError(false);
          console.log(response.data.user)
          setUser(response.data.user);
          setSubmitted(true);
        },
        (error) => {
          if (error.response.message == "Network Error") {
            setIsError(true);
            setMessage("Something went wrong, please try again in a moment");
            return;
          }
          setIsError(true);
          setMessage(error.response.data);
        }
      );
      try {
        await axios.post("/api/initializeUser", {
          newUsername: username
        });
        axios.post("api/login", {
          username: username,
          password: password,
        })
      } catch (error) {
        console.error(error);
      }

  };
  return (
    <>
      {submitted && <Navigate to="/profile" />}
        <ThemeProvider theme={theme}>
          <div className="signupFrm">
            <form className="form" onSubmit={handleSubmit}>
              <div className="title-container">
                <h1 className="title" style={{ color: "#333" }}>Sign up</h1>
                <FontAwesomeIcon icon={faUserPlus} size="lg" style={{ color: "#333" }}/>
              </div>
              <Item
                name="username"
                type="text"
                formValue={username}
                setFormValue={setUsername}
                placeholder="a"
              />
              <Item
                name="password"
                type="password"
                formValue={password}
                setFormValue={setPassword}
                placeholder="a"
              />
              <label
                htmlFor="signup_submit"
                className={isError ? "no-msg" : "yes-msg"}
              >
                {messages.split("\n").map((msg, idx) => {
                  return <div key={`signup_msg_${idx}`}>{msg}</div>;
                })}
              </label>
              <input
                id="signup_submit"
                type="submit"
                className="submitBtn"
                value="Sign up"
              ></input>
            </form>
          </div>
        </ThemeProvider>
    </>
  );
}

export default Signup;
