"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { useLanguage } from "@/components/language-provider"
import { LanguageSelector } from "@/components/language-selector"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ShoppingCart, Search, Star, Package, LogOut, User, ShoppingBag, BarChart3 } from "lucide-react"
import Link from "next/link"

interface Supplier {
  id: string
  name: string
  rating: number
  categories: string[]
  location: string
  verified: boolean
  totalProducts: number
  avgPrice: number
  deliveryTime: string
}

interface Product {
  id: string
  name: string
  price: number
  unit: string
  supplierId: string
  supplierName: string
  category: string
  rating: number
  inStock: boolean
}

export default function VendorDashboard() {
  const { user, logout } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("rating")
  const [showComparison, setShowComparison] = useState(false)
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([])

  useEffect(() => {
    if (!user || user.role !== "vendor") {
      router.push("/login")
      return
    }

    // Fetch suppliers from backend
    const fetchSuppliers = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL
        const token = localStorage.getItem("auth-token")
        const res = await fetch(`${API_URL}/api/suppliers`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        })
        if (!res.ok) throw new Error("Failed to fetch suppliers")
        const data = await res.json()
        // Map backend fields to frontend Supplier interface
        setSuppliers(
          data.map((s: any) => ({
            id: s._id,
            name: s.name,
            rating: s.rating || 0,
            categories: s.categories || [],
            location: s.location || "",
            verified: s.verified || false,
            totalProducts: s.totalProducts || 0, // You may want to fetch this separately
            avgPrice: s.avgPrice || 0, // You may want to fetch this separately
            deliveryTime: s.deliveryTime || "",
          }))
        )
      } catch (err) {
        setSuppliers([])
      }
    }
    fetchSuppliers()
    // Remove mock products for now
    setProducts([])
  }, [user, router])

  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.categories.some((cat) => cat.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = categoryFilter === "all" || supplier.categories.includes(categoryFilter)
    return matchesSearch && matchesCategory
  })

  const sortedSuppliers = [...filteredSuppliers].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "price":
        return a.avgPrice - b.avgPrice
      case "delivery":
        return a.deliveryTime.localeCompare(b.deliveryTime)
      default:
        return 0
    }
  })

  const handleSupplierSelect = (supplierId: string) => {
    setSelectedSuppliers(
      (prev) =>
        prev.includes(supplierId) ? prev.filter((id) => id !== supplierId) : [...prev, supplierId].slice(0, 3), // Max 3 suppliers for comparison
    )
  }

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
              <Badge variant="secondary">{t("supplier.supplierDashboard")}</Badge>
            </div>

            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <Button variant="outline" size="sm" asChild>
                <Link href="/cart">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  {t("nav.cart")}
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/vendor/orders">
                  <Package className="w-4 h-4 mr-2" />
                  {t("nav.orders")}
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/vendor/profile">
                  <User className="w-4 h-4 mr-2" />
                  {t("nav.profile")}
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                {t("nav.logout")}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {t("dashboard.welcomeBack")}, {user.name}!
          </h2>
          <p className="text-gray-600">{t("dashboard.findTrustedSuppliers")}</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder={t("dashboard.searchSuppliers")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder={t("dashboard.filterByCategory")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("dashboard.allCategories")}</SelectItem>
              <SelectItem value="Vegetables">{t("dashboard.vegetables")}</SelectItem>
              <SelectItem value="Fruits">{t("dashboard.fruits")}</SelectItem>
              <SelectItem value="Spices">{t("dashboard.spices")}</SelectItem>
              <SelectItem value="Rice">{t("dashboard.riceGrains")}</SelectItem>
              <SelectItem value="Cooking Oil">{t("dashboard.cookingOil")}</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder={t("common.sort")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">{t("dashboard.rating")}</SelectItem>
              <SelectItem value="price">{t("dashboard.price")}</SelectItem>
              <SelectItem value="delivery">{t("dashboard.deliveryTime")}</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => setShowComparison(true)} disabled={selectedSuppliers.length < 2}>
            <BarChart3 className="w-4 h-4 mr-2" />
            {t("dashboard.compare")} ({selectedSuppliers.length})
          </Button>
        </div>

        {/* Suppliers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedSuppliers.map((supplier) => (
            <Card key={supplier.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedSuppliers.includes(supplier.id)}
                      onChange={() => handleSupplierSelect(supplier.id)}
                      className="mt-1"
                    />
                    <div>
                      <CardTitle className="text-lg">{supplier.name}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <span className="mr-2">{supplier.location}</span>
                        {supplier.verified && (
                          <Badge variant="secondary" className="text-xs">
                            {t("dashboard.verified")}
                          </Badge>
                        )}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">{supplier.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">{t("dashboard.categories")}:</p>
                    <div className="flex flex-wrap gap-1">
                      {supplier.categories.map((category) => (
                        <Badge key={category} variant="outline" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">{t("dashboard.products")}</p>
                      <p className="font-medium">{supplier.totalProducts}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">{t("dashboard.avgPrice")}</p>
                      <p className="font-medium">₹{supplier.avgPrice}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-600">{t("dashboard.delivery")}</p>
                      <p className="font-medium">{supplier.deliveryTime}</p>
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-4" asChild>
                  <Link href={`/supplier/${supplier.id}/products`}>{t("dashboard.viewProducts")}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comparison Dialog */}
        <Dialog open={showComparison} onOpenChange={setShowComparison}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>
                {t("dashboard.compare")} {t("dashboard.suppliers")}
              </DialogTitle>
              <DialogDescription>Compare selected suppliers side by side</DialogDescription>
            </DialogHeader>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Supplier</TableHead>
                    <TableHead>{t("dashboard.rating")}</TableHead>
                    <TableHead>{t("dashboard.products")}</TableHead>
                    <TableHead>{t("dashboard.avgPrice")}</TableHead>
                    <TableHead>{t("dashboard.delivery")}</TableHead>
                    <TableHead>Location</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedSuppliers.map((supplierId) => {
                    const supplier = suppliers.find((s) => s.id === supplierId)
                    if (!supplier) return null

                    return (
                      <TableRow key={supplier.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-2">
                            <span>{supplier.name}</span>
                            {supplier.verified && (
                              <Badge variant="secondary" className="text-xs">
                                {t("dashboard.verified")}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                            {supplier.rating}
                          </div>
                        </TableCell>
                        <TableCell>{supplier.totalProducts}</TableCell>
                        <TableCell>₹{supplier.avgPrice}</TableCell>
                        <TableCell>{supplier.deliveryTime}</TableCell>
                        <TableCell>{supplier.location}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </DialogContent>
        </Dialog>

        {sortedSuppliers.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t("dashboard.noSuppliersFound")}</h3>
            <p className="text-gray-600">{t("dashboard.adjustSearchCriteria")}</p>
          </div>
        )}
      </div>
    </div>
  )
}
