import React from 'react';
import KanbanBoard from "../components/KanbanBoard";

const Survey = ({ user }) => {
  // console.log(user)
  // if (!user) {
  //   return <Navigate to="/login" />;
  // }
    return <KanbanBoard user={user} />
  }

  export default Survey;