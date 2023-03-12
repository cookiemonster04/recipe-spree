import React from "react";
import Profile from "../components/Profile";
import { useParams, Navigate } from "react-router-dom";

const ProfilePage = () => {
  const { userId } = useParams();
  return <Profile userId={userId} />;
};

const ProfileHome = ({ user }) => {
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <Profile user={user} />;
};

export { ProfilePage, ProfileHome };
