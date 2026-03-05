import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('netflix_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (email, password) => {
        // Mock login - in a real app, this would be an API call
        const userData = { email, id: '123', name: email.split('@')[0] };
        setUser(userData);
        localStorage.setItem('netflix_user', JSON.stringify(userData));
        return true;
    };

    const signup = (email, password) => {
        // Mock signup
        const userData = { email, id: '123', name: email.split('@')[0] };
        setUser(userData);
        localStorage.setItem('netflix_user', JSON.stringify(userData));
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('netflix_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
