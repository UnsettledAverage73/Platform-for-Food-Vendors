// components/auth-provider.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  role: "vendor" | "supplier";
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    email: string,
    password: string,
    name: string,
    role: "vendor" | "supplier",
    phone?: string
  ) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    const userData = localStorage.getItem("user-data");
    const isLoggedIn = localStorage.getItem("is-logged-in") === "true";

    if (token && userData && isLoggedIn) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data.token) {
        const user: User = {
          id: data.id || "", // Update this if your backend returns an id
          email,
          name: data.name || "", // Update this if your backend returns a name
          role: data.role,
          phone: data.phone || "",
        };

        setUser(user);
        localStorage.setItem("auth-token", data.token);
        localStorage.setItem("user-data", JSON.stringify(user));
        localStorage.setItem("is-logged-in", "true");
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    role: "vendor" | "supplier",
    phone?: string
  ): Promise<boolean> => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, role, phone }),
      });
      const data = await res.json();
      if (res.ok) {
        return await login(email, password);
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth-token");
    localStorage.removeItem("user-data");
    localStorage.removeItem("is-logged-in");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  console.log(context);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
