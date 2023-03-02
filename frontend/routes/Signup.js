import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Item = ({ name, type, formValue, setFormValue }) => {
  return (
    <div className="item">
      <label htmlFor={`signup_${name}`}>
        {name.charAt(0).toUpperCase() + name.slice(1) + ":"}
      </label>
      <input
        id={`signup_${name}`}
        type={type}
        value={formValue}
        onChange={(e) => {
          setFormValue(e.target.value);
        }}
      ></input>
    </div>
  );
};

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [messages, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    axios
      .post("/api/user", {
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
      <form onSubmit={handleSubmit}>
        <Item
          name="username"
          type="text"
          formValue={username}
          setFormValue={setUsername}
        />
        <Item
          name="password"
          type="password"
          formValue={password}
          setFormValue={setPassword}
        />
        <label
          htmlFor="signup_submit"
          className={isError ? "no-msg" : "yes-msg"}
        >
          {messages.split("\n").map((msg, idx) => {
            return <div key={`signup_msg_${idx}`}>{msg}</div>;
          })}
        </label>
        <input id="signup_submit" type="submit"></input>
      </form>
    </>
  );
};

export default Signup;
