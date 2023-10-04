import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate(`/`);
  };
  return (
    <div>
      <button className="logout-button" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
