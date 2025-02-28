import React, { useState, useEffect } from "react";
import { Bell, Search, User, ShoppingCart, Wallet } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Badge } from "../ui/badge";

interface CartItem {
  id: string;
  title: string;
  price: number;
  status: "pending" | "paid";
}

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
}

interface HeaderProps {
  notifications?: Notification[];
  userEmail?: string;
  userName?: string;
  userAvatar?: string;
  cartItems?: CartItem[];
  balance?: number;
}

const defaultNotifications: Notification[] = [
  {
    id: "1",
    title: "New Order",
    message: "You have received a new order #12345",
    time: "5 minutes ago",
  },
  {
    id: "2",
    title: "Payment Received",
    message: "Payment for order #12344 has been confirmed",
    time: "1 hour ago",
  },
];

const defaultCartItems: CartItem[] = [
  {
    id: "1",
    title: "Landing Page Full Gambar",
    price: 250000,
    status: "pending",
  },
  {
    id: "2",
    title: "Jasa Desain Konten Iklan JPG",
    price: 100000,
    status: "pending",
  },
];

const Header = ({
  notifications = defaultNotifications,
  userEmail = "user@example.com",
  userName = "John Doe",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  cartItems = defaultCartItems,
  balance: initialBalance = 1500000,
}: HeaderProps) => {
  const [balance, setBalance] = useState(initialBalance);

  // Listen for balance updates
  useEffect(() => {
    const handleBalanceUpdate = (event: CustomEvent) => {
      if (event.detail && typeof event.detail.balance === "number") {
        setBalance(event.detail.balance);
      }
    };

    window.addEventListener(
      "balance-updated",
      handleBalanceUpdate as EventListener,
    );
    return () => {
      window.removeEventListener(
        "balance-updated",
        handleBalanceUpdate as EventListener,
      );
    };
  }, []);
  const [pendingOrders, setPendingOrders] = useState(
    cartItems.filter((item) => item.status === "pending").length,
  );

  // Listen for cart updates
  useEffect(() => {
    const handleCartUpdate = (event: CustomEvent) => {
      if (event.detail && typeof event.detail.count === "number") {
        setPendingOrders(event.detail.count);
      }
    };

    window.addEventListener("cart-updated", handleCartUpdate as EventListener);
    return () => {
      window.removeEventListener(
        "cart-updated",
        handleCartUpdate as EventListener,
      );
    };
  }, []);

  return (
    <header className="w-full h-[72px] bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      <div className="flex items-center flex-1 max-w-xl">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search..."
            className="pl-10 w-full"
            type="search"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Balance */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => (window.location.hash = "transactions")}
              >
                <Wallet className="h-4 w-4" />
                <div className="flex flex-col items-start">
                  <span className="text-xs text-muted-foreground">Balance</span>
                  <span>IDR {balance.toLocaleString()}</span>
                </div>
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-6 ml-2 text-xs px-2"
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent("open-withdraw-dialog"),
                    )
                  }
                >
                  Withdraw
                </Button>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View Transactions</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Shopping Cart */}
        <TooltipProvider>
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {pendingOrders > 0 && (
                      <Badge
                        className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center bg-red-500 text-white p-0 text-xs"
                        variant="destructive"
                      >
                        {pendingOrders}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Shopping Cart</p>
              </TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Shopping Cart</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {cartItems.length === 0 ? (
                <div className="p-4 text-center text-sm text-gray-500">
                  Your cart is empty
                </div>
              ) : (
                cartItems.map((item) => (
                  <DropdownMenuItem
                    key={item.id}
                    className="flex flex-col items-start py-2"
                  >
                    <div className="flex justify-between w-full">
                      <p className="font-medium">{item.title}</p>
                      <Badge
                        variant={
                          item.status === "pending" ? "destructive" : "default"
                        }
                      >
                        {item.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-primary font-semibold mt-1">
                      IDR {item.price.toLocaleString()}
                    </p>
                  </DropdownMenuItem>
                ))
              )}
              {cartItems.length > 0 && (
                <div className="p-4 border-t">
                  <div className="flex justify-between mb-4">
                    <span className="font-medium">Total:</span>
                    <span className="font-semibold text-primary">
                      IDR{" "}
                      {cartItems
                        .reduce((sum, item) => sum + item.price, 0)
                        .toLocaleString()}
                    </span>
                  </div>
                  <Button
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => (window.location.hash = "checkout")}
                  >
                    Checkout ({pendingOrders})
                  </Button>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipProvider>

        {/* Notifications */}
        <TooltipProvider>
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {notifications.length > 0 && (
                      <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Notifications</p>
              </TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className="flex flex-col items-start py-2"
                >
                  <p className="font-medium">{notification.title}</p>
                  <p className="text-sm text-gray-500">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {notification.time}
                  </p>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipProvider>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center space-x-2 hover:bg-gray-100"
            >
              <img
                src={userAvatar}
                alt="User avatar"
                className="h-8 w-8 rounded-full"
              />
              <span className="hidden md:inline-block">{userName}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="flex flex-col">
              <span>{userName}</span>
              <span className="text-sm font-normal text-gray-500">
                {userEmail}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
