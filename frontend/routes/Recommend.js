import React from "react";
import { Navigate } from "react-router-dom";
import RecommendPage from "../components/RecommendPage";

const Recommend = ({ user, location }) => {
    // console.log(user);
    // console.log(location);
    if (!user && !location?.state?.user ) {
        return <Navigate to="/login" />;
    } else {
        return <RecommendPage user={user} />
    }
};

export default Recommend;