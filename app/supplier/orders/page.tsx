"use client";

import { useEffect, useState } from "react";
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
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
// import { Order } from "../Models/Order.js";

interface Order {
  id: string;
  vendorName: string;
  address: string;
  items: {
    productName: string;
    quantity: number;
    price: number;
    unit: string;
  }[];
  total: number;
  status: "pending" | "confirmed" | "rejected" | "delivered";
  deliveryDate: string;
  rejectionReason?: string;
}

export default function SupplierOrdersPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rejectOrderId, setRejectOrderId] = useState<string>("");
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    if (authLoading) return; // Wait for auth to finish loading
    if (!user || user.role !== "supplier") {
      router.push("/login");
      return;
    }
    const fetchOrders = async () => {
      setLoading(true);
      setError("");
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
        const supplierOrders = data
          .map((o: any) => ({
            id: o._id,
            vendorName: o.userId?.name || "Vendor",
            address: o.address || "",
            items: o.items
              .filter(
                (item: any) => String(item.supplierId) === String(user.id)
              )
              .map((item: any) => ({
                productName: item.productName,
                quantity: item.quantity,
                price: item.price,
                unit: item.unit,
              })),
            total: o.items
              .filter(
                (item: any) => String(item.supplierId) === String(user.id)
              )
              .reduce(
                (sum: number, item: any) => sum + item.price * item.quantity,
                0
              ),
            status: o.status,
            deliveryDate: o.deliveryDate
              ? new Date(o.deliveryDate).toLocaleDateString()
              : "",
            rejectionReason: o.rejectionReason,
          }))
          .filter((order: any) => order.items.length > 0); // Only show orders with items for this supplier
        setOrders(supplierOrders);
      } catch (err: any) {
        setError(err.message || "Error fetching orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user, router, authLoading]);

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
      setOrders((orders) =>
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
    } catch (err: any) {
      toast({
        title: "Failed to update order status",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  if (authLoading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Supplier Orders
            </h1>
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Orders from Vendors</CardTitle>
            <CardDescription>
              Manage and track your incoming orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : orders.length === 0 ? (
              <div>No orders found.</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Delivery Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.vendorName}</TableCell>
                      <TableCell>{order.address}</TableCell>
                      <TableCell>
                        {order.items.map((item, idx) => (
                          <div key={idx}>
                            {item.productName} × {item.quantity} {item.unit} = ₹
                            {item.price * item.quantity}
                          </div>
                        ))}
                      </TableCell>
                      <TableCell>₹{order.total}</TableCell>
                      <TableCell>{order.deliveryDate}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            order.status === "pending"
                              ? "default"
                              : order.status === "confirmed"
                              ? "secondary"
                              : order.status === "delivered"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {order.status}
                        </Badge>
                        {order.status === "rejected" &&
                          order.rejectionReason && (
                            <div className="text-xs text-red-600 mt-1">
                              {order.rejectionReason}
                            </div>
                          )}
                      </TableCell>
                      <TableCell>
                        {order.status === "pending" && (
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              onClick={() =>
                                handleOrderAction(order.id, "confirmed")
                              }
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
                                    Please provide a reason for rejecting this
                                    order
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
                                        handleOrderAction(
                                          rejectOrderId,
                                          "rejected"
                                        )
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
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
