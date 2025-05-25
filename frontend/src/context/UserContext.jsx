import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context
const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Load user from localStorage if already logged in
  useEffect(() => {
     
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setIsAdmin(JSON.parse(storedUser).isAdmin === 1);
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  // Login method
  const login = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  // Logout method
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <UserContext.Provider value={{ isAdmin, currentUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use user context
export const useUser = () => useContext(UserContext);
