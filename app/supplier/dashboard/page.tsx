"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, Plus, Package, LogOut, User, FileText, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

interface Product {
  id: string
  name: string
  category: string
  price: number
  unit: string
  stock: number
  description: string
}

interface Order {
  id: string
  vendorName: string
  items: { productName: string; quantity: number; price: number }[]
  total: number
  status: "pending" | "confirmed" | "rejected"
  deliveryDate: string
}

export default function SupplierDashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    unit: "",
    stock: "",
    description: "",
  })

  useEffect(() => {
    if (!user || user.role !== "supplier") {
      router.push("/login")
      return
    }

    // Mock products data
    setProducts([
      {
        id: "1",
        name: "Fresh Tomatoes",
        category: "Vegetables",
        price: 40,
        unit: "kg",
        stock: 500,
        description: "Fresh red tomatoes from local farms",
      },
      {
        id: "2",
        name: "Onions",
        category: "Vegetables",
        price: 30,
        unit: "kg",
        stock: 300,
        description: "Quality onions for cooking",
      },
      {
        id: "3",
        name: "Basmati Rice",
        category: "Grains",
        price: 80,
        unit: "kg",
        stock: 200,
        description: "Premium basmati rice",
      },
    ])

    // Mock orders data
    setOrders([
      {
        id: "1",
        vendorName: "Raj Kumar",
        items: [
          { productName: "Fresh Tomatoes", quantity: 10, price: 40 },
          { productName: "Onions", quantity: 5, price: 30 },
        ],
        total: 550,
        status: "pending",
        deliveryDate: "2024-01-15",
      },
      {
        id: "2",
        vendorName: "Priya Devi",
        items: [{ productName: "Basmati Rice", quantity: 25, price: 80 }],
        total: 2000,
        status: "confirmed",
        deliveryDate: "2024-01-16",
      },
    ])
  }, [user, router])

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category || !newProduct.price) return

    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      category: newProduct.category,
      price: Number.parseFloat(newProduct.price),
      unit: newProduct.unit,
      stock: Number.parseInt(newProduct.stock),
      description: newProduct.description,
    }

    setProducts([...products, product])
    setNewProduct({
      name: "",
      category: "",
      price: "",
      unit: "",
      stock: "",
      description: "",
    })
    setIsAddProductOpen(false)
  }

  const handleOrderAction = (orderId: string, action: "confirmed" | "rejected") => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: action } : order)))
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
              <Badge variant="secondary">Supplier Dashboard</Badge>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/supplier/orders">
                  <FileText className="w-4 h-4 mr-2" />
                  Orders
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/supplier/profile">
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome, {user.name}!</h2>
          <p className="text-gray-600">Manage your products and orders</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.filter((order) => order.status === "pending").length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ₹{orders.filter((order) => order.status === "confirmed").reduce((sum, order) => sum + order.total, 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Section */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>My Products</CardTitle>
                <CardDescription>Manage your product catalog</CardDescription>
              </div>
              <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogDescription>Add a new product to your catalog</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Product Name</Label>
                      <Input
                        id="name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        placeholder="Enter product name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={newProduct.category}
                        onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Vegetables">Vegetables</SelectItem>
                          <SelectItem value="Fruits">Fruits</SelectItem>
                          <SelectItem value="Grains">Grains</SelectItem>
                          <SelectItem value="Spices">Spices</SelectItem>
                          <SelectItem value="Oil">Cooking Oil</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price">Price</Label>
                        <Input
                          id="price"
                          type="number"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                          placeholder="Price per unit"
                        />
                      </div>
                      <div>
                        <Label htmlFor="unit">Unit</Label>
                        <Select
                          value={newProduct.unit}
                          onValueChange={(value) => setNewProduct({ ...newProduct, unit: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select unit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kg">Kilogram</SelectItem>
                            <SelectItem value="g">Gram</SelectItem>
                            <SelectItem value="piece">Piece</SelectItem>
                            <SelectItem value="liter">Liter</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="stock">Stock Quantity</Label>
                      <Input
                        id="stock"
                        type="number"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                        placeholder="Available quantity"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        placeholder="Product description"
                      />
                    </div>
                    <Button onClick={handleAddProduct} className="w-full">
                      Add Product
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.category}</Badge>
                    </TableCell>
                    <TableCell>
                      ₹{product.price}/{product.unit}
                    </TableCell>
                    <TableCell>
                      {product.stock} {product.unit}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Manage incoming orders from vendors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium">{order.vendorName}</h4>
                      <p className="text-sm text-gray-600">Delivery: {order.deliveryDate}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          order.status === "pending"
                            ? "default"
                            : order.status === "confirmed"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {order.status}
                      </Badge>
                      <span className="font-medium">₹{order.total}</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="text-sm text-gray-600">
                        {item.productName} × {item.quantity} = ₹{item.price * item.quantity}
                      </div>
                    ))}
                  </div>

                  {order.status === "pending" && (
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={() => handleOrderAction(order.id, "confirmed")}>
                        Accept
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleOrderAction(order.id, "rejected")}>
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
