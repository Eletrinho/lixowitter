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

  const handleRegister = async () => {
    await register(name, username, email, password);
    navigate("/");
  };

  return (
    // <div>
    //   <h1>Register Page</h1>
    //   <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
    //   <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
    //   <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
    //   <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
    //   <button onClick={handleRegister}>Login</button>
    // </div>

    <>
      <Header />
      <div className="content">
        <div className="auth-container">
          <h2>Register</h2>
          <form action="/register" method="POST" className="auth-form">
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
            <button type="submit" onClick={handleRegister} className="auth-btn">
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
