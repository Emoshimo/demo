import React, { useEffect, useState } from "react";
import ContactList from "../components/ContactList";
import { useLocation } from "react-router-dom";
import { currentUser } from "../api/user_api";
import CreateContacts from "../components/CreateContacts";
import LogoutButton from "../components/LogoutButton";

const Profile = () => {
  const location = useLocation();
  const token = location?.state.accessToken;
  const [username, setUsername] = useState<string | null>(null);
  const userInfo = async () => {
    const info = await currentUser(token);
    setUsername(info.username);
  };

  console.log(token);

  useEffect(() => {
    userInfo();
  }, [token]);

  return (
    <div className="profile-page">
      <div className="header-container">
        <h2 className="profile-header">Welcome, {username}</h2>
        <LogoutButton />
      </div>

      <ContactList accessToken={token} />
    </div>
  );
};

export default Profile;
