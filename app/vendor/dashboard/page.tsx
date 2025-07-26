"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, Search, Star, Package, LogOut, User, ShoppingBag } from "lucide-react"
import Link from "next/link"

interface Supplier {
  id: string
  name: string
  rating: number
  categories: string[]
  location: string
  verified: boolean
}

export default function VendorDashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  useEffect(() => {
    if (!user || user.role !== "vendor") {
      router.push("/login")
      return
    }

    // Mock suppliers data
    setSuppliers([
      {
        id: "1",
        name: "Fresh Vegetables Co.",
        rating: 4.5,
        categories: ["Vegetables", "Fruits"],
        location: "Mumbai",
        verified: true,
      },
      {
        id: "2",
        name: "Spice Masters",
        rating: 4.8,
        categories: ["Spices", "Masalas"],
        location: "Delhi",
        verified: true,
      },
      {
        id: "3",
        name: "Grain Suppliers Ltd",
        rating: 4.2,
        categories: ["Rice", "Wheat", "Pulses"],
        location: "Pune",
        verified: true,
      },
      {
        id: "4",
        name: "Oil & Ghee Store",
        rating: 4.6,
        categories: ["Cooking Oil", "Ghee"],
        location: "Bangalore",
        verified: true,
      },
    ])
  }, [user, router])

  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.categories.some((cat) => cat.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = categoryFilter === "all" || supplier.categories.includes(categoryFilter)
    return matchesSearch && matchesCategory
  })

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">BazarBuddy</h1>
              </div>
              <Badge variant="secondary">Vendor Dashboard</Badge>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/cart">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Cart
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/vendor/orders">
                  <Package className="w-4 h-4 mr-2" />
                  Orders
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/vendor/profile">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.name}!</h2>
          <p className="text-gray-600">Find trusted suppliers for your street food business</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search suppliers or products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Vegetables">Vegetables</SelectItem>
              <SelectItem value="Fruits">Fruits</SelectItem>
              <SelectItem value="Spices">Spices</SelectItem>
              <SelectItem value="Rice">Rice & Grains</SelectItem>
              <SelectItem value="Cooking Oil">Cooking Oil</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Suppliers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSuppliers.map((supplier) => (
            <Card key={supplier.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{supplier.name}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <span className="mr-2">{supplier.location}</span>
                      {supplier.verified && (
                        <Badge variant="secondary" className="text-xs">
                          Verified
                        </Badge>
                      )}
                    </CardDescription>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">{supplier.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Categories:</p>
                  <div className="flex flex-wrap gap-1">
                    {supplier.categories.map((category) => (
                      <Badge key={category} variant="outline" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href={`/supplier/${supplier.id}/products`}>View Products</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSuppliers.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No suppliers found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
