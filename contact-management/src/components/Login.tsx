import React, { useEffect, useState } from "react";
import { loginUser } from "../api/user_api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState(null);
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userData = { email, password };
      //api Call
      const response = await loginUser(userData);

      if (response?.statusText === "OK" && response?.data) {
        // navigate next page
        const t = response.data.accessToken;
        await setToken(t);
        navigate(`/profile`, { state: { accessToken: t } });
      }
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleLoginButtonClick = () => {
    setClicked(true);
    handleLogin();
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLoginButtonClick}>Login</button>
      {error && clicked && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Login;
