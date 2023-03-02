import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = ({ userId }) => {
  const [username, setUsername] = useState("");
  useEffect(() => {
    async function getUsername() {
      console.log(`query id: ${userId}`);
      const userInfo = await axios.get(`/api/user/${userId}`);
      console.log("retrieved userinfo");
      console.log(userInfo);
      if (userInfo.hasOwnProperty("data")) {
        setUsername(userInfo.data.username);
      }
      return (
        userInfo.hasOwnProperty("data") && (
          <div>
            <h1>Welcome back, {userInfo.data.username}</h1>
          </div>
        )
      );
    }
    getUsername();
  }, [userId]);
  return (
    username !== "" && (
      <div>
        <h1>Welcome back, {username}</h1>
      </div>
    )
  );
};

export default Profile;