import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import "./Login.css";

const Item = ({ name, type, formValue, setFormValue, placeholder }) => {
  return (
    <div className="inputContainer">
      <input
        className="input"
        id={`login_${name}`}
        type={type}
        value={formValue}
        onChange={(e) => {
          setFormValue(e.target.value);
        }}
        placeholder={placeholder}
      ></input>
      <label htmlFor={`login_${name}`} className="label">
        {name.charAt(0).toUpperCase() + name.slice(1) + ":"}
      </label>
    </div>
  );
};

const Login = ({ callback }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [messages, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/login", {
        username: username,
        password: password,
      })
      .then(
        (response) => {
          // add a redirect to a success page instead of just showing confirmation message above submit
          console.log(response);
          setIsError(false);
          setMessage(response.data);
          setSubmitted(true);
          callback();
        },
        (error) => {
          console.log(error);
          if (error.response.message == "Network Error") {
            setIsError(true);
            setMessage("Something went wrong, please try again in a moment");
            return;
          }
          console.log(error);
          setIsError(true);
          setMessage(error.response.data);
        }
      );
  };
  return (
    <>
      {submitted && <Navigate to={`/profile/${username}`} />}
      <div className="loginFrm">
        <form className="form" onSubmit={handleSubmit}>
          <div className="title-container">
            <h1 className="title">Log in</h1>
            <FontAwesomeIcon icon={faUserPlus} size="lg" />
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
            htmlFor="login_submit"
            className={isError ? "no-msg" : "yes-msg"}
          >
            {messages.split("\n").map((msg, idx) => {
              return <div key={`login_msg_${idx}`}>{msg}</div>;
            })}
          </label>
          <input
            id="login_submit"
            type="submit"
            className="submitBtn"
            value="Login"
          ></input>
        </form>
      </div>
    </>
  );
};

export default Login;
