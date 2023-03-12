import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = ({ userId, user }) => {
  const [username, setUsername] = useState("");
  const [favlist, setFavlist] = useState([]);
  useEffect(() => {
    async function getInfo() {
      if (!userId) {
        setUsername(user.username);
        // just to demonstrate it works
        const favInfo = await axios.get(`/api/fav`);
        setFavlist(favInfo.data.favorites);
      } else {
        const userInfo = await axios.get(`/api/user/${userId}`);
        if (userInfo.hasOwnProperty("data")) {
          setUsername(userInfo.data.username);
        }
        const favInfo = await axios.get(`/api/fav/user/${userId}`);
        setFavlist(favInfo.data.favorites);
      }
    }
    getInfo();
  }, [userId]);
  return (
    username && (
      <div>
        <h1>Welcome back, {username}</h1>
        <ul>
          {favlist.map((id, idx) => (
            <li key={`user_prof_fav_id_${idx}`}>{id}</li>
          ))}
        </ul>
      </div>
    )
  );
};

export default Profile;
