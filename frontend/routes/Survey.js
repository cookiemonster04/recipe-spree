import React from 'react';
import KanbanBoard from "../components/KanbanBoard";
import { Navigate } from "react-router-dom";

const Survey = ({ user, location }) => {
  console.log(user)
  if (!user && !location?.state?.user ) {
    return <Navigate to="/login" />;
  } else {
    return <KanbanBoard user={user}/>
  }
  }

  export default Survey;