"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ShoppingCart, ArrowLeft, Star, Package, Clock, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

interface Order {
  id: string
  supplierName: string
  items: { productName: string; quantity: number; price: number; unit: string }[]
  total: number
  status: "pending" | "confirmed" | "rejected" | "delivered"
  orderDate: string
  deliveryDate: string
  isGroupOrder: boolean
  rating?: number
}

export default function VendorOrdersPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  useEffect(() => {
    if (!user || user.role !== "vendor") {
      router.push("/login")
      return
    }

    // Mock orders data
    setOrders([
      {
        id: "1",
        supplierName: "Fresh Vegetables Co.",
        items: [
          { productName: "Fresh Tomatoes", quantity: 10, price: 40, unit: "kg" },
          { productName: "Onions", quantity: 5, price: 30, unit: "kg" },
        ],
        total: 550,
        status: "pending",
        orderDate: "2024-01-10",
        deliveryDate: "2024-01-15",
        isGroupOrder: false,
      },
      {
        id: "2",
        supplierName: "Spice Masters",
        items: [
          { productName: "Turmeric Powder", quantity: 2, price: 120, unit: "kg" },
          { productName: "Red Chili Powder", quantity: 1, price: 150, unit: "kg" },
        ],
        total: 390,
        status: "confirmed",
        orderDate: "2024-01-08",
        deliveryDate: "2024-01-12",
        isGroupOrder: true,
      },
      {
        id: "3",
        supplierName: "Grain Suppliers Ltd",
        items: [{ productName: "Basmati Rice", quantity: 25, price: 80, unit: "kg" }],
        total: 2000,
        status: "delivered",
        orderDate: "2024-01-05",
        deliveryDate: "2024-01-10",
        isGroupOrder: false,
        rating: 5,
      },
      {
        id: "4",
        supplierName: "Oil & Ghee Store",
        items: [{ productName: "Sunflower Oil", quantity: 5, price: 140, unit: "liter" }],
        total: 700,
        status: "rejected",
        orderDate: "2024-01-03",
        deliveryDate: "2024-01-08",
        isGroupOrder: false,
      },
    ])
  }, [user, router])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />
      case "delivered":
        return <Package className="w-4 h-4" />
      case "rejected":
        return <XCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "default"
      case "confirmed":
        return "secondary"
      case "delivered":
        return "default"
      case "rejected":
        return "destructive"
      default:
        return "default"
    }
  }

  const filterOrdersByStatus = (status: string) => {
    if (status === "all") return orders
    return orders.filter((order) => order.status === status)
  }

  const handleRateSupplier = (orderId: string, rating: number) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, rating } : order)))
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Button variant="ghost" size="sm" asChild className="mr-4">
              <Link href="/vendor/dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          {["all", "pending", "confirmed", "delivered", "rejected"].map((status) => (
            <TabsContent key={status} value={status}>
              <div className="space-y-4">
                {filterOrdersByStatus(status).length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-8">
                      <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No {status === "all" ? "" : status} orders found
                      </h3>
                      <p className="text-gray-600">
                        {status === "all" ? "You haven't placed any orders yet" : `No ${status} orders at the moment`}
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  filterOrdersByStatus(status).map((order) => (
                    <Card key={order.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="flex items-center space-x-2">
                              <span>Order #{order.id}</span>
                              {order.isGroupOrder && (
                                <Badge variant="outline" className="text-xs">
                                  Group Order
                                </Badge>
                              )}
                            </CardTitle>
                            <CardDescription>
                              {order.supplierName} • Ordered on {order.orderDate}
                            </CardDescription>
                          </div>
                          <div className="text-right">
                            <Badge variant={getStatusColor(order.status) as any} className="mb-2">
                              <span className="flex items-center space-x-1">
                                {getStatusIcon(order.status)}
                                <span className="capitalize">{order.status}</span>
                              </span>
                            </Badge>
                            <p className="text-lg font-bold">₹{order.total}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium mb-2">Items:</h4>
                            <div className="space-y-1">
                              {order.items.map((item, index) => (
                                <div key={index} className="flex justify-between text-sm">
                                  <span>
                                    {item.productName} × {item.quantity} {item.unit}
                                  </span>
                                  <span>₹{item.price * item.quantity}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex justify-between items-center pt-3 border-t">
                            <div className="text-sm text-gray-600">Delivery Date: {order.deliveryDate}</div>

                            <div className="flex space-x-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                                    View Details
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Order Details #{selectedOrder?.id}</DialogTitle>
                                    <DialogDescription>Complete order information</DialogDescription>
                                  </DialogHeader>
                                  {selectedOrder && (
                                    <div className="space-y-4">
                                      <div>
                                        <h4 className="font-medium mb-2">Supplier Information</h4>
                                        <p>{selectedOrder.supplierName}</p>
                                      </div>

                                      <div>
                                        <h4 className="font-medium mb-2">Order Items</h4>
                                        <div className="space-y-2">
                                          {selectedOrder.items.map((item, index) => (
                                            <div key={index} className="flex justify-between p-2 bg-gray-50 rounded">
                                              <div>
                                                <p className="font-medium">{item.productName}</p>
                                                <p className="text-sm text-gray-600">
                                                  ₹{item.price}/{item.unit} × {item.quantity} {item.unit}
                                                </p>
                                              </div>
                                              <p className="font-medium">₹{item.price * item.quantity}</p>
                                            </div>
                                          ))}
                                        </div>
                                      </div>

                                      <div className="border-t pt-4">
                                        <div className="flex justify-between font-medium text-lg">
                                          <span>Total Amount</span>
                                          <span>₹{selectedOrder.total}</span>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>

                              {order.status === "delivered" && !order.rating && (
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button size="sm">Rate Supplier</Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Rate {order.supplierName}</DialogTitle>
                                      <DialogDescription>How was your experience with this supplier?</DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <div className="flex justify-center space-x-2">
                                        {[1, 2, 3, 4, 5].map((rating) => (
                                          <Button
                                            key={rating}
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleRateSupplier(order.id, rating)}
                                          >
                                            <Star className="w-6 h-6 fill-current text-yellow-400" />
                                          </Button>
                                        ))}
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              )}

                              {order.rating && (
                                <div className="flex items-center space-x-1">
                                  <span className="text-sm">Rated:</span>
                                  <div className="flex">
                                    {[...Array(order.rating)].map((_, i) => (
                                      <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
