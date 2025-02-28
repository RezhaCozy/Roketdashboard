import React from "react";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

interface Transaction {
  id: string;
  type: "incoming" | "outgoing";
  amount: number;
  description: string;
  date: string;
  status: "completed" | "pending" | "failed";
}

interface TransactionListProps {
  transactions?: Transaction[];
}

const defaultTransactions: Transaction[] = [
  {
    id: "1",
    type: "incoming",
    amount: 1250.0,
    description: "Payment for Order #12345",
    date: "2024-03-20",
    status: "completed",
  },
  {
    id: "2",
    type: "outgoing",
    amount: 450.0,
    description: "Service Fee",
    date: "2024-03-19",
    status: "completed",
  },
  {
    id: "3",
    type: "incoming",
    amount: 890.0,
    description: "Payment for Order #12346",
    date: "2024-03-18",
    status: "pending",
  },
];

const TransactionList = ({
  transactions = defaultTransactions,
}: TransactionListProps) => {
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

  return (
    <Card className="w-full bg-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Recent Transactions</h2>
      </div>

      <ScrollArea className="h-[280px] w-full">
        <div className="space-y-4">
          {transactions.map((transaction) => (
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
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span
                  className={`font-semibold ${transaction.type === "incoming" ? "text-green-600" : "text-red-600"}`}
                >
                  {transaction.type === "incoming" ? "+" : "-"}$
                  {transaction.amount.toFixed(2)}
                </span>
                <Badge className={getStatusColor(transaction.status)}>
                  {transaction.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default TransactionList;
