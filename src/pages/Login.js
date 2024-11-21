import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import Header from "../components/Header";
import "../assets/styles/auth.css";

export const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(username, password);
    if (result.success) {
        navigate("/")
    } else {
        console.error(result.message)
    }
};


  return (
    <>
      <Header />
      <div className="content">
        <div className="auth-container">
          <h2>Login</h2>
          <form className="auth-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="auth-btn">
              Login
            </button>
          </form>
          <p className="auth-text">
            Don't have an account? <a href="register">Register here</a>.
          </p>
        </div>
      </div>
    </>
  );
};
