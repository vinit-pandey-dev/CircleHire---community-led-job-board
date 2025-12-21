import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/authService'; // Make sure this path is correct

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Check if user is already logged in when the app loads
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Verify token with backend & get fresh user data
          const response = await authService.getCurrentUser();
          setUser(response.data);
        }
      } catch (error) {
        console.error("Session expired or invalid token");
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  // 2. Login Function
  const login = async (formData) => {
    // Call the API
    const response = await authService.login(formData);
    
    // Assuming backend returns: { token: "...", user: { ... } }
    const { token, user } = response.data;

    // Save to LocalStorage so login persists on refresh
    localStorage.setItem('token', token);
    
    // Update State
    setUser(user);
    
    return user; // Return user so Login page can redirect based on role
  };

  // 3. Logout Function
  const logout = () => {
    authService.logout(); // Optional: Call backend logout if you have it
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/login'; // Hard redirect to clear any memory states
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use Auth easily in other components
export const useAuth = () => useContext(AuthContext);