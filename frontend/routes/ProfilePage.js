import React from "react";
import Profile from "../components/Profile";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { userId } = useParams();
  return <Profile userId={userId} />;
};

export default ProfilePage;
