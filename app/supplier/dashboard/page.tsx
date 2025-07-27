"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ShoppingCart,
  Plus,
  Package,
  LogOut,
  User,
  FileText,
  Edit,
  Trash2,
  Upload,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  stock: number;
  description: string;
  image?: string;
  rating: number;
  totalReviews: number;
}

interface Order {
  id: string;
  vendorName: string;
  items: { productName: string; quantity: number; price: number }[];
  total: number;
  status: "pending" | "confirmed" | "rejected";
  deliveryDate: string;
  rejectionReason?: string;
}

export default function SupplierDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [rejectOrderId, setRejectOrderId] = useState<string>("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    unit: "",
    stock: "",
    description: "",
    image: null as File | null,
  });

  useEffect(() => {
    if (!user || user.role !== "supplier") {
      router.push("/login");
      return;
    }
    // Fetch products for the logged-in supplier
    const fetchProducts = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const token = localStorage.getItem("auth-token");
        const res = await fetch(`${API_URL}/api/products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(
          data.map((p: any) => ({
            id: p._id,
            name: p.name,
            category: p.category,
            price: p.price,
            unit: p.unit,
            stock: p.stock,
            description: p.description,
            rating: 0, // Not in backend yet
            totalReviews: 0, // Not in backend yet
          }))
        );
      } catch (err) {
        setProducts([]);
      }
    };
    fetchProducts();

    // Fetch orders for the logged-in supplier
    const fetchOrders = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const token = localStorage.getItem("auth-token");
        const res = await fetch(`${API_URL}/api/supplierOrders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(
          data.map((o: any) => ({
            id: o._id,
            vendorName: o.userId?.name || "Vendor",
            items: o.items.map((item: any) => ({
              productName: item.productName,
              quantity: item.quantity,
              price: item.price,
            })),
            total: o.items.reduce(
              (sum: number, item: any) => sum + item.price * item.quantity,
              0
            ),
            status: o.status,
            deliveryDate: o.deliveryDate
              ? new Date(o.deliveryDate).toLocaleDateString()
              : "",
            rejectionReason: o.rejectionReason,
          }))
        );
      } catch (err) {
        setOrders([]);
      }
    };
    fetchOrders();
  }, [user, router]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload JPG, PNG, or WebP images only.",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (2MB max)
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload images smaller than 2MB.",
          variant: "destructive",
        });
        return;
      }

      setNewProduct({ ...newProduct, image: file });
    }
  };

  // Add product using backend
  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.category || !newProduct.price) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const token = localStorage.getItem("auth-token");
      const res = await fetch(`${API_URL}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newProduct.name,
          category: newProduct.category,
          price: Number.parseFloat(newProduct.price),
          unit: newProduct.unit,
          stock: Number.parseInt(newProduct.stock),
          description: newProduct.description,
        }),
      });
      if (!res.ok) throw new Error("Failed to add product");
      const data = await res.json();
      setProducts([
        ...products,
        {
          id: data.product._id,
          name: data.product.name,
          category: data.product.category,
          price: data.product.price,
          unit: data.product.unit,
          stock: data.product.stock,
          description: data.product.description,
          rating: 0,
          totalReviews: 0,
        },
      ]);
      setNewProduct({
        name: "",
        category: "",
        price: "",
        unit: "",
        stock: "",
        description: "",
        image: null,
      });
      setIsAddProductOpen(false);
      toast({ title: "Product added successfully!" });
    } catch (err) {
      toast({ title: "Failed to add product", variant: "destructive" });
    }
  };

  // Edit product using backend
  const handleEditProduct = async (
    productId: string,
    updatedFields: Partial<Product>
  ) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const token = localStorage.getItem("auth-token");
      const res = await fetch(`${API_URL}/api/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFields),
      });
      if (!res.ok) throw new Error("Failed to update product");
      const data = await res.json();
      setProducts(
        products.map((p) =>
          p.id === productId ? { ...p, ...data.product } : p
        )
      );
      toast({ title: "Product updated successfully!" });
    } catch (err) {
      toast({ title: "Failed to update product", variant: "destructive" });
    }
  };

  // Delete product using backend
  const handleDeleteProduct = async (productId: string) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const token = localStorage.getItem("auth-token");
      const res = await fetch(`${API_URL}/api/products/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete product");
      setProducts(products.filter((p) => p.id !== productId));
      toast({ title: "Product deleted successfully!" });
    } catch (err) {
      toast({ title: "Failed to delete product", variant: "destructive" });
    }
  };

  // Update order status using backend
  const handleOrderAction = async (
    orderId: string,
    action: "confirmed" | "rejected"
  ) => {
    if (action === "rejected" && !rejectionReason.trim()) {
      toast({
        title: "Rejection reason required",
        description: "Please provide a reason for rejecting the order.",
        variant: "destructive",
      });
      return;
    }
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const token = localStorage.getItem("auth-token");
      const res = await fetch(`${API_URL}/api/supplierOrders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: action }),
      });
      if (!res.ok) throw new Error("Failed to update order status");
      setOrders(
        orders.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status: action,
                rejectionReason:
                  action === "rejected" ? rejectionReason : undefined,
              }
            : order
        )
      );
      toast({
        title: `Order ${action}!`,
        description: `Order #${orderId} has been ${action}.`,
      });
      setRejectOrderId("");
      setRejectionReason("");
    } catch (err) {
      toast({ title: "Failed to update order status", variant: "destructive" });
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!user) return null;
  console.log(user);

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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome, {user.name}!
          </h2>
          <p className="text-gray-600">Manage your products and orders</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Products
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Orders
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {orders.filter((order) => order.status === "pending").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ₹
                {orders
                  .filter((order) => order.status === "confirmed")
                  .reduce((sum, order) => sum + order.total, 0)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {products.length > 0
                  ? (
                      products.reduce(
                        (sum, product) => sum + product.rating,
                        0
                      ) / products.length
                    ).toFixed(1)
                  : "0.0"}
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
              <Dialog
                open={isAddProductOpen}
                onOpenChange={setIsAddProductOpen}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogDescription>
                      Add a new product to your catalog
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Product Name *</Label>
                        <Input
                          id="name"
                          value={newProduct.name}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              name: e.target.value,
                            })
                          }
                          placeholder="Enter product name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category *</Label>
                        <Select
                          value={newProduct.category}
                          onValueChange={(value) =>
                            setNewProduct({ ...newProduct, category: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Vegetables">
                              Vegetables
                            </SelectItem>
                            <SelectItem value="Fruits">Fruits</SelectItem>
                            <SelectItem value="Grains">Grains</SelectItem>
                            <SelectItem value="Spices">Spices</SelectItem>
                            <SelectItem value="Oil">Cooking Oil</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="price">Price *</Label>
                        <Input
                          id="price"
                          type="number"
                          value={newProduct.price}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              price: e.target.value,
                            })
                          }
                          placeholder="Price per unit"
                        />
                      </div>
                      <div>
                        <Label htmlFor="unit">Unit *</Label>
                        <Select
                          value={newProduct.unit}
                          onValueChange={(value) =>
                            setNewProduct({ ...newProduct, unit: value })
                          }
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
                      <div>
                        <Label htmlFor="stock">Stock Quantity</Label>
                        <Input
                          id="stock"
                          type="number"
                          value={newProduct.stock}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              stock: e.target.value,
                            })
                          }
                          placeholder="Available quantity"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newProduct.description}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            description: e.target.value,
                          })
                        }
                        placeholder="Product description"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="image">Product Image</Label>
                      <div className="mt-2">
                        <input
                          type="file"
                          id="image"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <Label htmlFor="image" className="cursor-pointer">
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                            {newProduct.image ? (
                              <div>
                                <img
                                  src={
                                    URL.createObjectURL(newProduct.image) ||
                                    "/placeholder.svg"
                                  }
                                  alt="Preview"
                                  className="w-32 h-32 object-cover mx-auto rounded-lg mb-2"
                                />
                                <p className="text-sm text-gray-600">
                                  {newProduct.image.name}
                                </p>
                              </div>
                            ) : (
                              <div>
                                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-600">
                                  Click to upload product image
                                </p>
                                <p className="text-xs text-gray-500">
                                  PNG, JPG, WebP up to 2MB
                                </p>
                              </div>
                            )}
                          </div>
                        </Label>
                      </div>
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
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        {product.image && (
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded"
                          />
                        )}
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-gray-500">
                            {product.description}
                          </div>
                        </div>
                      </div>
                    </TableCell>
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
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>{product.rating}</span>
                        <span className="text-sm text-gray-500">
                          ({product.totalReviews})
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleEditProduct(product.id, {
                              name: "New Name",
                              category: "New Category",
                              price: 100,
                              unit: "kg",
                              stock: 100,
                              description: "New Description",
                            })
                          }
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
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
            <CardDescription>
              Manage incoming orders from vendors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium">{order.vendorName}</h4>
                      <p className="text-sm text-gray-600">
                        Delivery: {order.deliveryDate}
                      </p>
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
                        {item.productName} × {item.quantity} = ₹
                        {item.price * item.quantity}
                      </div>
                    ))}
                  </div>

                  {order.status === "pending" && (
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleOrderAction(order.id, "confirmed")}
                      >
                        Accept
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setRejectOrderId(order.id)}
                          >
                            Reject
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Reject Order</DialogTitle>
                            <DialogDescription>
                              Please provide a reason for rejecting this order
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="rejection-reason">
                                Reason for rejection
                              </Label>
                              <Textarea
                                id="rejection-reason"
                                placeholder="Please explain why you're rejecting this order..."
                                value={rejectionReason}
                                onChange={(e) =>
                                  setRejectionReason(e.target.value)
                                }
                                rows={4}
                              />
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                onClick={() =>
                                  handleOrderAction(rejectOrderId, "rejected")
                                }
                                variant="destructive"
                                className="flex-1"
                              >
                                Reject Order
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setRejectOrderId("");
                                  setRejectionReason("");
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}

                  {order.status === "rejected" && order.rejectionReason && (
                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-800">
                        <strong>Rejection Reason:</strong>{" "}
                        {order.rejectionReason}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
