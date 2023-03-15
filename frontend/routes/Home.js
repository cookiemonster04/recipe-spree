import React from 'react';
import './Home.css';

const Home = ({ user }) => {
  return (
    <div>
      {user ? (
        <h1 className="home-title">Home Page</h1>
      ) : (
        <h1 className="introduce">Introduce Feature</h1>
      )}
    </div>
  );
};

export default Home;
