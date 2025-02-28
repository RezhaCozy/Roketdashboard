import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import {
  ShoppingCart,
  Download,
  CreditCard,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import OrderForm from "./OrderForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface Order {
  id: string;
  orderNumber: string;
  description: string;
  date: string;
  amount: number;
  status: "pending" | "paid" | "completed";
  type: "direct" | "reseller";
}

interface OrdersPageProps {
  orders?: Order[];
}

const defaultOrders: Order[] = [
  // Direct orders
  {
    id: "1",
    orderNumber: "ORD-001",
    description: "Landing Page Full Gambar",
    date: "2024-03-22",
    amount: 250000,
    status: "pending",
    type: "direct",
  },
  {
    id: "2",
    orderNumber: "ORD-002",
    description: "Jasa Desain Konten Iklan JPG",
    date: "2024-03-21",
    amount: 100000,
    status: "paid",
    type: "direct",
  },
  {
    id: "3",
    orderNumber: "ORD-003",
    description: "Website Development Package",
    date: "2024-03-19",
    amount: 1500000,
    status: "completed",
    type: "direct",
  },

  // Reseller orders
  {
    id: "4",
    orderNumber: "ORD-R001",
    description: "Landing Page Responsive",
    date: "2024-03-20",
    amount: 499000,
    status: "pending",
    type: "reseller",
  },
  {
    id: "5",
    orderNumber: "ORD-R002",
    description: "Video Ads Production",
    date: "2024-03-18",
    amount: 750000,
    status: "paid",
    type: "reseller",
  },
  {
    id: "6",
    orderNumber: "ORD-R003",
    description: "Social Media Content Pack",
    date: "2024-03-17",
    amount: 350000,
    status: "completed",
    type: "reseller",
  },
];

const OrdersPage = ({ orders = defaultOrders }: OrdersPageProps) => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [checkoutDialogOpen, setCheckoutDialogOpen] = useState(false);

  // Filter orders based on active tab
  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all") return true;
    if (activeTab === "direct") return order.type === "direct";
    if (activeTab === "reseller") return order.type === "reseller";
    if (activeTab === "pending") return order.status === "pending";
    if (activeTab === "paid") return order.status === "paid";
    if (activeTab === "completed") return order.status === "completed";
    return true;
  });

  // Sort orders by date (newest first)
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Count orders by status
  const pendingCount = orders.filter(
    (order) => order.status === "pending",
  ).length;
  const paidCount = orders.filter((order) => order.status === "paid").length;
  const completedCount = orders.filter(
    (order) => order.status === "completed",
  ).length;

  // Sync shopping cart count with pending orders
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("cart-updated", { detail: { count: pendingCount } }),
    );
  }, [pendingCount]);

  // Count orders by type
  const directCount = orders.filter((order) => order.type === "direct").length;
  const resellerCount = orders.filter(
    (order) => order.type === "reseller",
  ).length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" /> Pending
          </Badge>
        );
      case "paid":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <CheckCircle className="w-3 h-3 mr-1" /> Paid
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" /> Completed
          </Badge>
        );
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "direct":
        return (
          <Badge
            variant="outline"
            className="bg-purple-50 text-purple-800 border-purple-200"
          >
            Direct
          </Badge>
        );
      case "reseller":
        return (
          <Badge
            variant="outline"
            className="bg-indigo-50 text-indigo-800 border-indigo-200"
          >
            Reseller
          </Badge>
        );
      default:
        return null;
    }
  };

  const handleCheckout = (order: Order) => {
    setSelectedOrder(order);
    setCheckoutDialogOpen(true);
  };

  return (
    <div className="flex flex-col space-y-6 p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Orders</h2>
        <Button
          className="bg-primary hover:bg-primary/90"
          onClick={() => (window.location.hash = "services")}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          New Order
        </Button>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Pending Orders</p>
                <p className="text-2xl font-bold">{pendingCount}</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-full">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Direct Orders</p>
                <p className="text-2xl font-bold">{directCount}</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <ShoppingCart className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Reseller Orders</p>
                <p className="text-2xl font-bold">{resellerCount}</p>
              </div>
              <div className="p-2 bg-indigo-100 rounded-full">
                <ShoppingCart className="h-5 w-5 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders List */}
      <Card>
        <CardHeader>
          <CardTitle>Order List</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="mb-4">
              <TabsTrigger value="all">
                All Orders ({orders.length})
              </TabsTrigger>
              <TabsTrigger value="direct">Direct ({directCount})</TabsTrigger>
              <TabsTrigger value="reseller">
                Reseller ({resellerCount})
              </TabsTrigger>
              <TabsTrigger value="pending">
                Pending ({pendingCount})
              </TabsTrigger>
              <TabsTrigger value="paid">Paid ({paidCount})</TabsTrigger>
              <TabsTrigger value="completed">
                Completed ({completedCount})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              <ScrollArea className="h-[500px]">
                <div className="space-y-4">
                  {sortedOrders.map((order) => (
                    <div
                      key={order.id}
                      className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium">{order.orderNumber}</p>
                            {getStatusBadge(order.status)}
                            {getTypeBadge(order.type)}
                          </div>
                          <p className="text-sm">{order.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {order.date}
                          </p>
                        </div>
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                          <p className="font-semibold text-primary">
                            IDR {order.amount.toLocaleString()}
                          </p>
                          <div className="flex gap-2">
                            {order.status === "pending" && (
                              <Button
                                size="sm"
                                className="flex items-center gap-1"
                                onClick={() => handleCheckout(order)}
                              >
                                <CreditCard className="h-4 w-4" />
                                Pay Now
                              </Button>
                            )}
                            {order.status === "completed" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex items-center gap-1"
                              >
                                <Download className="h-4 w-4" />
                                Download
                              </Button>
                            )}
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Checkout Dialog */}
      <Dialog open={checkoutDialogOpen} onOpenChange={setCheckoutDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Checkout - {selectedOrder?.orderNumber}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-medium">{selectedOrder?.description}</p>
              <p className="text-xl font-bold text-primary mt-2">
                IDR {selectedOrder?.amount.toLocaleString()}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Payment Method</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="border rounded-lg p-3 cursor-pointer hover:bg-primary/5 hover:border-primary transition-colors">
                  <p className="font-medium">Bank Transfer</p>
                  <p className="text-sm text-muted-foreground">
                    Manual verification
                  </p>
                </div>
                <div className="border rounded-lg p-3 cursor-pointer hover:bg-primary/5 hover:border-primary transition-colors">
                  <p className="font-medium">Credit Card</p>
                  <p className="text-sm text-muted-foreground">
                    Instant payment
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-800">
                      Payment Instructions
                    </p>
                    <p className="text-sm text-yellow-700 mt-1">
                      Please complete your payment within 24 hours to avoid
                      order cancellation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <p className="font-medium">Total Amount:</p>
              <p className="text-lg font-bold text-primary">
                IDR {selectedOrder?.amount.toLocaleString()}
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setCheckoutDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button>Proceed to Payment</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrdersPage;
