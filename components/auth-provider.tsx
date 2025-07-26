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
      // Simulate API call
      const mockUsers = [
        {
          id: "1",
          email: "vendor@test.com",
          password: "password",
          name: "Raj Kumar",
          role: "vendor" as const,
          phone: "+91 9876543210",
        },
        {
          id: "2",
          email: "supplier@test.com",
          password: "password",
          name: "Priya Suppliers",
          role: "supplier" as const,
          phone: "+91 9876543211",
        },
      ]

      const foundUser = mockUsers.find((u) => u.email === email && u.password === password)

      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser
        setUser(userWithoutPassword)
        localStorage.setItem("auth-token", "mock-token")
        localStorage.setItem("user-data", JSON.stringify(userWithoutPassword))
        return true
      }
      return false
    } catch (error) {
      return false
    }
  }

  const register = async (
    email: string,
    password: string,
    name: string,
    role: "vendor" | "supplier",
    phone?: string,
  ): Promise<boolean> => {
    try {
      // Simulate API call
      const newUser = {
        id: Date.now().toString(),
        email,
        name,
        role,
        phone,
      }

      setUser(newUser)
      localStorage.setItem("auth-token", "mock-token")
      localStorage.setItem("user-data", JSON.stringify(newUser))
      return true
    } catch (error) {
      return false
    }
  }

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
