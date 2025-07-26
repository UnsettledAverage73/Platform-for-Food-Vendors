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
import { ShoppingCart, Minus, Plus, Trash2, CalendarIcon, ArrowLeft } from "lucide-react"
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

export default function CartPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isGroupOrder, setIsGroupOrder] = useState(false)
  const [deliveryDate, setDeliveryDate] = useState<Date>()

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

  const handlePlaceOrder = () => {
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

    // Simulate order placement
    toast({
      title: "Order placed successfully!",
      description: `Your ${isGroupOrder ? "group " : ""}order has been sent to suppliers`,
    })

    // Clear cart and redirect
    setCartItems([])
    router.push("/vendor/orders")
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

                {isGroupOrder && (
                  <div className="p-3 bg-green-50 rounded-lg">
                    <Badge variant="secondary" className="mb-2">
                      Group Order Active
                    </Badge>
                    <p className="text-sm text-green-700">
                      You'll get better pricing when other vendors join this order
                    </p>
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
                    {isGroupOrder && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Group Discount</span>
                        <span>-₹{Math.floor(getTotalAmount() * 0.05)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-medium text-lg border-t pt-2">
                      <span>Total</span>
                      <span>₹{getTotalAmount() + 50 - (isGroupOrder ? Math.floor(getTotalAmount() * 0.05) : 0)}</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full" onClick={handlePlaceOrder} disabled={cartItems.length === 0}>
                  Place Order
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
