import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { role: 'admin' | 'teacher' | 'student', name: 'John Doe' }
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    // Later: localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    // Later: localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};