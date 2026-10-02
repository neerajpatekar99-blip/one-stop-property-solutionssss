"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  user: null,
  loading: false,
  login: async () => {},
  signup: async () => {},
  loginWithGoogle: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("osps_demo_user");
      if (saved) setUser(JSON.parse(saved));
    } catch (e) {}
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    const mockUser = {
      uid: "user-" + Date.now(),
      email: email || "client@onestopproperty.com",
      displayName: email ? email.split("@")[0] : "Client",
    };
    setUser(mockUser);
    try {
      localStorage.setItem("osps_demo_user", JSON.stringify(mockUser));
    } catch (e) {}
    setLoading(false);
    return { success: true, user: mockUser };
  };

  const signup = async (email, password, displayName, phone) => {
    setLoading(true);
    const mockUser = {
      uid: "user-" + Date.now(),
      email: email || "client@onestopproperty.com",
      displayName: displayName || (email ? email.split("@")[0] : "Client"),
      phoneNumber: phone || "",
    };
    setUser(mockUser);
    try {
      localStorage.setItem("osps_demo_user", JSON.stringify(mockUser));
    } catch (e) {}
    setLoading(false);
    return { success: true, user: mockUser };
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    const mockUser = {
      uid: "google-user-" + Date.now(),
      email: "client@gmail.com",
      displayName: "Valued Client",
    };
    setUser(mockUser);
    try {
      localStorage.setItem("osps_demo_user", JSON.stringify(mockUser));
    } catch (e) {}
    setLoading(false);
    return { success: true, user: mockUser };
  };

  const logout = async () => {
    setLoading(true);
    setUser(null);
    try {
      localStorage.removeItem("osps_demo_user");
    } catch (e) {}
    setLoading(false);
    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
