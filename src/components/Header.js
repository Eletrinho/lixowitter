import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import "../assets/styles/header.css";
import "../assets/styles/style.css";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-content">
        <h1 onClick={() => navigate("/")}>Lixowitter</h1>
        {user ? (
          <nav className="nav">
            <a className="icon" href={`/profile/${user}`}>
              <div className="avatar">{user[0].toUpperCase()}</div>
            </a>
            <button className="nav-btn" onClick={logout}>
              Logout
            </button>
          </nav>
        ) : (
          <nav className="nav">
            <a href="/login" className="nav-btn">
              Login
            </a>
            <a href="/register" className="nav-btn">
              Register
            </a>
          </nav>
        )}
      </div>
    </header>
  );
};

export default React.memo(Header);
