// AdminContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AdminContext = createContext(null);

export const AdminContextProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    // Check if there's an existing session
    const checkSession = async () => {
      try {
        const response = await axios.get("http://localhost:3000/admin/session", {
          withCredentials: true,
        });

        if (response.data.isAdminAuthenticated) {
          setAdmin(response.data.user);
          setIsAdminAuthenticated(true);
        } else {
          setIsAdminAuthenticated(false);
        }
      } catch (error) {
        console.error("Session check failed:", error);
        setIsAdminAuthenticated(false);
      }
    };

    checkSession();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/admin/adminlogin",
        { email, password },
        { withCredentials: true }
      );
      console.log("Login successful, updating context...", response.data);
      setAdmin(response.data.admin); // Set the admin object with isAdmin status
      setIsAdminAuthenticated(true);
    } catch (error) {
      console.error(" Admin login failed:", error.response?.data?.message || "Not authorized");
      setIsAdminAuthenticated(false); // Ensure the authentication state is updated
      throw error;
    }
  };


  const logout = async () => {
    try {
      await axios.post("http://localhost:3000/admin/logout", {}, { withCredentials: true });
      setAdmin(null);
      setIsAdminAuthenticated(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AdminContext.Provider value={{ admin, isAdminAuthenticated, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};
