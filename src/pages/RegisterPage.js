import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import Header from "../components/Header";

export const RegisterPage = () => {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const result = await register(name, username, email, password);
    if (result.success) {
        navigate("/login")
    } else {
        console.error(result.message)
    }
  };

  return (
    <>
      <Header />
      <div className="content">
        <div className="auth-container">
          <h2>Register</h2>
          <form className="auth-form" onSubmit={handleRegister}>
            <div className="form-group">
              <label for="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label for="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="auth-btn">
              Register
            </button>
          </form>
          <p className="auth-text">
            Already have an account? <a href="login.html">Login here</a>.
          </p>
        </div>
      </div>
    </>
  );
};
