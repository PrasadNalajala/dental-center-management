import React, { createContext, useState, useEffect } from 'react';
import { mockData } from '../data/mockData';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    // Initialize data in localStorage if it's not there
    if (!localStorage.getItem('dental-data')) {
      localStorage.setItem('dental-data', JSON.stringify(mockData));
    }
  }, []);

  const login = (email, password) => {
    const data = JSON.parse(localStorage.getItem('dental-data'));
    const foundUser = data.users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      return foundUser;
    }
    return null;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider }; 