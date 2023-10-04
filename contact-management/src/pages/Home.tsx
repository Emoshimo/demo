import React from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import login from "./login.png";

const Home = () => {
  return (
    <div className="home-container">
      <img src={login} alt="" />
      <div className="sign">
        <Login />
        <Register />
      </div>
    </div>
  );
};

export default Home;
