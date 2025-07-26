"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  CalendarIcon,
  ArrowLeft,
  Users,
  CreditCard,
  CheckCircle,
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface CartItem {
  id: string
  productName: string
  supplierName: string
  price: number
  quantity: number
  unit: string
  maxStock: number
}

interface GroupOrder {
  id: string
  name: string
  members: number
  totalAmount: number
  discount: number
  status: "active" | "closed"
}

export default function CartPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isGroupOrder, setIsGroupOrder] = useState(false)
  const [deliveryDate, setDeliveryDate] = useState<Date>()
  const [activeGroups, setActiveGroups] = useState<GroupOrder[]>([])
  const [selectedGroup, setSelectedGroup] = useState<string>("")
  const [showPayment, setShowPayment] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("upi")
  const [upiId, setUpiId] = useState("")
  const [processing, setProcessing] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  useEffect(() => {
    if (!user || user.role !== "vendor") {
      router.push("/login")
      return
    }

    // Mock cart data
    setCartItems([
      {
        id: "1",
        productName: "Fresh Tomatoes",
        supplierName: "Fresh Vegetables Co.",
        price: 40,
        quantity: 10,
        unit: "kg",
        maxStock: 500,
      },
      {
        id: "2",
        productName: "Onions",
        supplierName: "Fresh Vegetables Co.",
        price: 30,
        quantity: 5,
        unit: "kg",
        maxStock: 300,
      },
      {
        id: "3",
        productName: "Basmati Rice",
        supplierName: "Grain Suppliers Ltd",
        price: 80,
        quantity: 25,
        unit: "kg",
        maxStock: 200,
      },
    ])

    // Mock active group orders
    setActiveGroups([
      {
        id: "1",
        name: "Mumbai Street Vendors Group",
        members: 12,
        totalAmount: 25000,
        discount: 8,
        status: "active",
      },
      {
        id: "2",
        name: "Chaat Corner Alliance",
        members: 8,
        totalAmount: 18000,
        discount: 5,
        status: "active",
      },
    ])
  }, [user, router])

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          const quantity = Math.min(newQuantity, item.maxStock)
          return { ...item, quantity }
        }
        return item
      }),
    )
  }

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getGroupDiscount = () => {
    if (!isGroupOrder || !selectedGroup) return 0
    const group = activeGroups.find((g) => g.id === selectedGroup)
    return group ? Math.floor(getTotalAmount() * (group.discount / 100)) : 0
  }

  const getFinalAmount = () => {
    const subtotal = getTotalAmount()
    const deliveryFee = 50
    const groupDiscount = getGroupDiscount()
    return subtotal + deliveryFee - groupDiscount
  }

  const handleProceedToPayment = () => {
    if (!deliveryDate) {
      toast({
        title: "Please select delivery date",
        description: "Choose a delivery date to proceed with your order",
        variant: "destructive",
      })
      return
    }

    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some items to your cart before placing an order",
        variant: "destructive",
      })
      return
    }

    setShowPayment(true)
  }

  const handlePayment = async () => {
    if (paymentMethod === "upi" && !upiId) {
      toast({
        title: "UPI ID required",
        description: "Please enter your UPI ID",
        variant: "destructive",
      })
      return
    }

    setProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false)
      setOrderPlaced(true)

      toast({
        title: "Payment successful!",
        description: `Your ${isGroupOrder ? "group " : ""}order has been placed successfully`,
      })

      // Clear cart after successful payment
      setTimeout(() => {
        setCartItems([])
        router.push("/vendor/orders")
      }, 2000)
    }, 3000)
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
              <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Cart Items ({cartItems.length})</CardTitle>
                <CardDescription>Review your selected products</CardDescription>
              </CardHeader>
              <CardContent>
                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                    <p className="text-gray-600 mb-4">Add some products to get started</p>
                    <Button asChild>
                      <Link href="/vendor/dashboard">Browse Suppliers</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{item.productName}</h4>
                          <p className="text-sm text-gray-600">{item.supplierName}</p>
                          <p className="text-sm font-medium text-green-600">
                            ₹{item.price}/{item.unit}
                          </p>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                              className="w-20 text-center"
                              min="1"
                              max={item.maxStock}
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={item.quantity >= item.maxStock}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="text-right min-w-[80px]">
                            <p className="font-medium">₹{item.price * item.quantity}</p>
                            <p className="text-xs text-gray-500">
                              {item.quantity} {item.unit}
                            </p>
                          </div>

                          <Button variant="outline" size="sm" onClick={() => removeItem(item.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Review your order details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Group Order Toggle */}
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <Label htmlFor="group-order" className="font-medium">
                      Group Order
                    </Label>
                    <p className="text-sm text-gray-600">Team up with other vendors for better pricing</p>
                  </div>
                  <Switch id="group-order" checked={isGroupOrder} onCheckedChange={setIsGroupOrder} />
                </div>

                {/* Active Groups */}
                {isGroupOrder && (
                  <div className="space-y-3">
                    <Label>Join Active Group</Label>
                    {activeGroups.map((group) => (
                      <div
                        key={group.id}
                        className={cn(
                          "p-3 border rounded-lg cursor-pointer transition-colors",
                          selectedGroup === group.id ? "border-orange-500 bg-orange-50" : "border-gray-200",
                        )}
                        onClick={() => setSelectedGroup(selectedGroup === group.id ? "" : group.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{group.name}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                              <span className="flex items-center">
                                <Users className="w-4 h-4 mr-1" />
                                {group.members} members
                              </span>
                              <span>₹{group.totalAmount.toLocaleString()}</span>
                            </div>
                          </div>
                          <Badge variant="secondary">{group.discount}% off</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Delivery Date */}
                <div>
                  <Label>Delivery Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal mt-2",
                          !deliveryDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {deliveryDate ? format(deliveryDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={deliveryDate}
                        onSelect={setDeliveryDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Order Total */}
                <div className="border-t pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>₹{getTotalAmount()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Delivery Fee</span>
                      <span>₹50</span>
                    </div>
                    {isGroupOrder && selectedGroup && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Group Discount</span>
                        <span>-₹{getGroupDiscount()}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-medium text-lg border-t pt-2">
                      <span>Total</span>
                      <span>₹{getFinalAmount()}</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full" onClick={handleProceedToPayment} disabled={cartItems.length === 0}>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Proceed to Payment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Payment Dialog */}
      <Dialog open={showPayment} onOpenChange={setShowPayment}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Payment</DialogTitle>
            <DialogDescription>Complete your payment to place the order</DialogDescription>
          </DialogHeader>

          {!orderPlaced ? (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span>Total Amount</span>
                  <span className="font-bold text-lg">₹{getFinalAmount()}</span>
                </div>
                {isGroupOrder && selectedGroup && (
                  <p className="text-sm text-green-600">Group discount applied: ₹{getGroupDiscount()} off</p>
                )}
              </div>

              <div className="space-y-3">
                <Label>Payment Method</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="upi"
                      name="payment"
                      value="upi"
                      checked={paymentMethod === "upi"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <Label htmlFor="upi">UPI Payment</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="card"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <Label htmlFor="card">Credit/Debit Card</Label>
                  </div>
                </div>
              </div>

              {paymentMethod === "upi" && (
                <div>
                  <Label htmlFor="upi-id">UPI ID</Label>
                  <Input
                    id="upi-id"
                    placeholder="yourname@upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="mt-2"
                  />
                </div>
              )}

              <Button className="w-full" onClick={handlePayment} disabled={processing}>
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Pay ₹{getFinalAmount()}
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Successful!</h3>
              <p className="text-gray-600 mb-4">Your order has been placed and sent to suppliers for confirmation.</p>
              <p className="text-sm text-gray-500">Redirecting to orders page...</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
