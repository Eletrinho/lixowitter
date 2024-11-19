import React, { useState, createContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [username, setUsername] = useState(null);
    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:8080/auth/login', { username, password });
            setUsername(username);
            window.sessionStorage.setItem('token', response.data.token);
        } catch (error) {
            console.error('Error logging in:', error);
            // Handle login error (e.g., display an error message)
        }
    };

    const logout = async () => {
        try {
            await axios.post('http://localhost:8080/auth/logout');
            setUsername(null);
            window.sessionStorage.removeItem('token')
            console.log(window.sessionStorage.getItem('token'))
        } catch (error) {
            console.error('Error logging out:', error)
            // Handle logout error
        }
    };

    const register = async (name, username, email, password) => {
        try {
            await axios.post('http://localhost:8080/users', { name, username, email, password });
            // Optionally, redirect to login after successful registration
        } catch (error) {
            console.error('Error registering:', error);
            // Handle registration error
        }
    };

    const value = { username, login, logout, register };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
