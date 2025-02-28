import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  LayoutDashboard,
  ShoppingCart,
  CreditCard,
  User,
  Briefcase,
  ChevronRight,
  LogOut,
  Link,
  Users,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  isActive?: boolean;
}

interface SidebarProps {
  isCollapsed?: boolean;
  navItems?: NavItem[];
  onToggle?: () => void;
}

const defaultNavItems: NavItem[] = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
    href: "#dashboard",
    isActive: true,
  },
  {
    label: "Services",
    icon: <Briefcase className="h-5 w-5" />,
    href: "#services",
  },
  {
    label: "Orders",
    icon: <ShoppingCart className="h-5 w-5" />,
    href: "#orders",
  },
  {
    label: "Transactions",
    icon: <CreditCard className="h-5 w-5" />,
    href: "#transactions",
  },
  {
    label: "Reseller",
    icon: <Link className="h-5 w-5" />,
    href: "#reseller",
  },
  {
    label: "Profile",
    icon: <User className="h-5 w-5" />,
    href: "#profile",
  },
];

const Sidebar = ({
  isCollapsed = false,
  navItems = defaultNavItems,
  onToggle = () => {},
}: SidebarProps) => {
  return (
    <div
      className={cn(
        "flex h-screen flex-col justify-between border-r bg-white transition-all",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <div>
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4">
          {!isCollapsed && (
            <span className="text-xl font-bold text-primary">Roketmarket</span>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto"
            onClick={onToggle}
          >
            <ChevronRight
              className={cn(
                "h-4 w-4 transition-transform",
                isCollapsed ? "rotate-180" : "",
              )}
            />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 px-2 py-4">
          <TooltipProvider>
            {navItems.map((item) => (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Button
                    variant={item.isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      isCollapsed ? "px-2" : "px-4",
                      item.label === "Services"
                        ? "relative animate-pulse bg-blue-100 hover:bg-blue-200 text-blue-800"
                        : "",
                    )}
                    asChild
                  >
                    <a href={item.href}>
                      {item.icon}
                      {!isCollapsed && (
                        <span className="ml-3">{item.label}</span>
                      )}
                    </a>
                  </Button>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right">{item.label}</TooltipContent>
                )}
              </Tooltip>
            ))}
          </TooltipProvider>
        </nav>
      </div>

      {/* Logout Button */}
      <div className="p-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start",
                  isCollapsed ? "px-2" : "px-4",
                )}
                onClick={() => (window.location.href = "/login")}
              >
                <LogOut className="h-5 w-5" />
                {!isCollapsed && <span className="ml-3">Logout</span>}
              </Button>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right">Logout</TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Sidebar;
