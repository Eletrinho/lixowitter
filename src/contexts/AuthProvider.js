import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const token = window.sessionStorage.getItem("token");
    const username = window.sessionStorage.getItem("username");
    if (token && username) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(username);
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        username,
        password,
      });
      window.sessionStorage.setItem("token", response.data.token);
      window.sessionStorage.setItem("username", username);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
      setUser(username);
      return { success: true };
    } catch (error) {
      console.error("Error logging in:", error);
      return {
        success: false,
        message: error.response ? error.response.data.message : error.message,
      };
    }
  };

  const logout = () => {
    try {
      setUser("");
      window.sessionStorage.removeItem("token");
      window.sessionStorage.removeItem("username");
      delete axios.defaults.headers.common["Authorization"];
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const register = async (name, username, email, password) => {
    try {
      await axios.post("http://localhost:8080/auth/register", {
        name,
        username,
        email,
        password,
      });
      return { success: true };
    } catch (error) {
      console.error("Error registering:", error);
      return {
        success: false,
        message: error.response ? error.response.data.message : error.message,
      };
    }
  };

  const value = { user, login, logout, register };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
