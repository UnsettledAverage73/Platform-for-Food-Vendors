"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface User {
  id: string
  email: string
  name: string
  role: "vendor" | "supplier"
  phone?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (
    email: string,
    password: string,
    name: string,
    role: "vendor" | "supplier",
    phone?: string,
  ) => Promise<boolean>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored auth token
    const token = localStorage.getItem("auth-token")
    const userData = localStorage.getItem("user-data")

    if (token && userData) {
      setUser(JSON.parse(userData))
    }
    setLoading(false)
  }, [])

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
        // You may want to fetch user details here if not returned
        setUser({
          id: "", // You can fetch user id from backend if needed
          email,
          name: "", // You can fetch user name from backend if needed
          role: data.role,
        });
        localStorage.setItem("auth-token", data.token);
        localStorage.setItem("user-data", JSON.stringify({
          id: "",
          email,
          name: "",
          role: data.role,
        }));
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
    phone?: string,
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
        // Optionally, auto-login after registration
        return await login(email, password);
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    setUser(null)
    localStorage.removeItem("auth-token")
    localStorage.removeItem("user-data")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
