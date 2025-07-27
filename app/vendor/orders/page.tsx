"use client"

import { cn } from "@/lib/utils"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ShoppingCart, ArrowLeft, Star, Package, Clock, CheckCircle, XCircle, Truck } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface Order {
  id: string
  supplierName: string
  items: { productName: string; quantity: number; price: number; unit: string }[]
  total: number
  status: "pending" | "confirmed" | "rejected" | "shipped" | "delivered"
  orderDate: string
  deliveryDate: string
  isGroupOrder: boolean
  rating?: number
  review?: string
  trackingSteps: { step: string; completed: boolean; timestamp?: string }[]
  rejectionReason?: string
}

export default function VendorOrdersPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [ratingOrder, setRatingOrder] = useState<Order | null>(null)
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")

  useEffect(() => {
    if (!user || user.role !== "vendor") {
      router.push("/login")
      return
    }

    // Fetch orders from backend
    const fetchOrders = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const token = localStorage.getItem("auth-token");
        const res = await fetch(`${API_URL}/api/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(
          data.map((o: any) => ({
            id: o._id,
            supplierName: o.items[0]?.supplierName || "",
            items: o.items.map((item: any) => ({
              productName: item.productName,
              quantity: item.quantity,
              price: item.price,
              unit: item.unit,
            })),
            total: o.items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0),
            status: o.status,
            orderDate: o.createdAt ? new Date(o.createdAt).toLocaleDateString() : "",
            deliveryDate: o.deliveryDate ? new Date(o.deliveryDate).toLocaleDateString() : "",
            isGroupOrder: o.isGroupOrder,
            rating: o.rating,
            review: o.review,
            trackingSteps: [], // You can implement tracking if available in backend
            rejectionReason: o.rejectionReason,
          }))
        );
      } catch (err) {
        setOrders([]);
      }
    };
    fetchOrders();
  }, [user, router]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />
      case "shipped":
        return <Truck className="w-4 h-4" />
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
      case "shipped":
        return "default"
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

  const getTrackingProgress = (steps: Order["trackingSteps"]) => {
    const completedSteps = steps.filter((step) => step.completed).length
    return (completedSteps / steps.length) * 100
  }

  const handleRateSupplier = async () => {
    if (!ratingOrder || rating === 0) {
      toast({
        title: "Please provide a rating",
        description: "Select at least 1 star to rate the supplier",
        variant: "destructive",
      })
      return
    }

    setOrders(orders.map((order) => (order.id === ratingOrder.id ? { ...order, rating, review } : order)))

    toast({
      title: "Rating submitted!",
      description: "Thank you for your feedback",
    })

    setRatingOrder(null)
    setRating(0)
    setReview("")
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
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          {["all", "pending", "confirmed", "shipped", "delivered", "rejected"].map((status) => (
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
                        <div className="space-y-4">
                          {/* Order Items */}
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

                          {/* Tracking Progress */}
                          {(order.status === "confirmed" ||
                            order.status === "shipped" ||
                            order.status === "delivered") && (
                            <div>
                              <div className="flex justify-between items-center mb-2">
                                <h4 className="font-medium">Order Progress</h4>
                                <span className="text-sm text-gray-600">
                                  {Math.round(getTrackingProgress(order.trackingSteps))}% Complete
                                </span>
                              </div>
                              <Progress value={getTrackingProgress(order.trackingSteps)} className="mb-3" />
                              <div className="space-y-2">
                                {order.trackingSteps.map((step, index) => (
                                  <div
                                    key={index}
                                    className={cn(
                                      "flex items-center space-x-3 text-sm",
                                      step.completed ? "text-green-600" : "text-gray-400",
                                    )}
                                  >
                                    <div
                                      className={cn(
                                        "w-2 h-2 rounded-full",
                                        step.completed ? "bg-green-500" : "bg-gray-300",
                                      )}
                                    />
                                    <span className="flex-1">{step.step}</span>
                                    {step.timestamp && <span className="text-xs text-gray-500">{step.timestamp}</span>}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Rejection Reason */}
                          {order.status === "rejected" && order.rejectionReason && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                              <h4 className="font-medium text-red-800 mb-1">Rejection Reason:</h4>
                              <p className="text-sm text-red-700">{order.rejectionReason}</p>
                            </div>
                          )}

                          {/* Existing Rating/Review */}
                          {order.rating && (
                            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="text-sm font-medium">Your Rating:</span>
                                <div className="flex">
                                  {[...Array(order.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                                  ))}
                                </div>
                              </div>
                              {order.review && <p className="text-sm text-gray-700">{order.review}</p>}
                            </div>
                          )}

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
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    setRatingOrder(order)
                                    setRating(0)
                                    setReview("")
                                  }}
                                >
                                  Rate & Review
                                </Button>
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

      {/* Rating Dialog */}
      <Dialog open={!!ratingOrder} onOpenChange={() => setRatingOrder(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rate & Review {ratingOrder?.supplierName}</DialogTitle>
            <DialogDescription>Share your experience with this supplier</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">Rating</Label>
              <div className="flex space-x-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onClick={() => setRating(star)} className="focus:outline-none">
                    <Star
                      className={cn(
                        "w-8 h-8 transition-colors",
                        star <= rating ? "text-yellow-400 fill-current" : "text-gray-300",
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="review">Review (Optional)</Label>
              <Textarea
                id="review"
                placeholder="Share your experience with this supplier..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="mt-2"
                rows={4}
              />
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleRateSupplier} className="flex-1">
                Submit Rating
              </Button>
              <Button variant="outline" onClick={() => setRatingOrder(null)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
