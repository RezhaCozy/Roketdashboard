import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import {
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Wallet,
  Users,
  Download,
} from "lucide-react";
import { Button } from "../ui/button";

interface Transaction {
  id: string;
  type: "incoming" | "outgoing";
  category: "direct" | "reseller" | "commission";
  amount: number;
  description: string;
  date: string;
  status: "completed" | "pending" | "failed";
  reference?: string;
}

interface TransactionsPageProps {
  transactions?: Transaction[];
}

const defaultTransactions: Transaction[] = [
  // Direct transactions
  {
    id: "1",
    type: "incoming",
    category: "direct",
    amount: 250000,
    description: "Payment for Order #ORD-001",
    date: "2024-03-22",
    status: "completed",
    reference: "ORD-001",
  },
  {
    id: "2",
    type: "outgoing",
    category: "direct",
    amount: 50000,
    description: "Refund for Order #ORD-002",
    date: "2024-03-21",
    status: "completed",
    reference: "ORD-002",
  },

  // Reseller transactions
  {
    id: "3",
    type: "incoming",
    category: "reseller",
    amount: 499000,
    description: "Payment for Order #ORD-R001",
    date: "2024-03-20",
    status: "completed",
    reference: "ORD-R001",
  },
  {
    id: "4",
    type: "incoming",
    category: "reseller",
    amount: 750000,
    description: "Payment for Order #ORD-R002",
    date: "2024-03-19",
    status: "pending",
    reference: "ORD-R002",
  },

  // Commission transactions
  {
    id: "5",
    type: "incoming",
    category: "commission",
    amount: 25000,
    description: "Commission from Alex Johnson's sale",
    date: "2024-03-18",
    status: "completed",
  },
  {
    id: "6",
    type: "incoming",
    category: "commission",
    amount: 12500,
    description: "Commission from Maria Garcia's sale",
    date: "2024-03-17",
    status: "completed",
  },
  {
    id: "7",
    type: "incoming",
    category: "commission",
    amount: 5000,
    description: "Level 3 commission from James Wilson's network",
    date: "2024-03-16",
    status: "completed",
  },
];

const TransactionsPage = ({
  transactions = defaultTransactions,
}: TransactionsPageProps) => {
  const [activeTab, setActiveTab] = useState("all");

  // Filter transactions based on active tab
  const filteredTransactions = transactions.filter((transaction) => {
    if (activeTab === "all") return true;
    if (activeTab === "direct") return transaction.category === "direct";
    if (activeTab === "reseller") return transaction.category === "reseller";
    if (activeTab === "commission")
      return transaction.category === "commission";
    return true;
  });

  // Sort transactions by date (newest first)
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Calculate totals
  const totalIncoming = transactions
    .filter((t) => t.type === "incoming" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalOutgoing = transactions
    .filter((t) => t.type === "outgoing" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalCommission = transactions
    .filter((t) => t.category === "commission" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  // Calculate current balance
  const currentBalance = totalIncoming - totalOutgoing;

  // Sync balance with other components
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("balance-updated", {
        detail: { balance: currentBalance },
      }),
    );
  }, [currentBalance]);

  // Count transactions by category
  const directCount = transactions.filter(
    (t) => t.category === "direct",
  ).length;
  const resellerCount = transactions.filter(
    (t) => t.category === "reseller",
  ).length;
  const commissionCount = transactions.filter(
    (t) => t.category === "commission",
  ).length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
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
      case "commission":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-800 border-green-200"
          >
            Commission
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col space-y-6 p-6 bg-white min-h-screen">
      <h2 className="text-2xl font-semibold">Transactions History</h2>

      {/* Transaction Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Total Income</p>
                <p className="text-2xl font-bold text-green-600">
                  IDR {totalIncoming.toLocaleString()}
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <ArrowDownLeft className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Total Expenses</p>
                <p className="text-2xl font-bold text-red-600">
                  IDR {totalOutgoing.toLocaleString()}
                </p>
              </div>
              <div className="p-2 bg-red-100 rounded-full">
                <ArrowUpRight className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">MLM Commission</p>
                <p className="text-2xl font-bold text-blue-600">
                  IDR {totalCommission.toLocaleString()}
                </p>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions List */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Transaction History</CardTitle>
            <p className="text-muted-foreground mt-1">
              Total Balance: IDR {currentBalance.toLocaleString()}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" className="flex items-center gap-1">
              Filter by Date
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="mb-4">
              <TabsTrigger value="all">
                All Transactions ({transactions.length})
              </TabsTrigger>
              <TabsTrigger value="direct">Direct ({directCount})</TabsTrigger>
              <TabsTrigger value="reseller">
                Reseller ({resellerCount})
              </TabsTrigger>
              <TabsTrigger value="commission">
                MLM Commission ({commissionCount})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              <ScrollArea className="h-[500px]">
                <div className="space-y-4">
                  {sortedTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-2 rounded-full ${transaction.type === "incoming" ? "bg-green-100" : "bg-red-100"}`}
                        >
                          {transaction.type === "incoming" ? (
                            <ArrowDownLeft className="w-5 h-5 text-green-600" />
                          ) : (
                            <ArrowUpRight className="w-5 h-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">
                              {transaction.description}
                            </p>
                            {getCategoryBadge(transaction.category)}
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm text-gray-500">
                              {transaction.date}
                            </p>
                            {transaction.reference && (
                              <p className="text-sm text-gray-500">
                                Ref: {transaction.reference}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <span
                          className={`font-semibold ${transaction.type === "incoming" ? "text-green-600" : "text-red-600"}`}
                        >
                          {transaction.type === "incoming" ? "+" : "-"}IDR{" "}
                          {transaction.amount.toLocaleString()}
                        </span>
                        <Badge className={getStatusColor(transaction.status)}>
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionsPage;
