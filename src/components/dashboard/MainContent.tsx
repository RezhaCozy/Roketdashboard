import React, { useState, useEffect } from "react";
import OrderProgressGrid from "./OrderProgressGrid";
import ServiceBentoGrid from "./ServiceBentoGrid";
import ResellerLeaderboard from "./ResellerLeaderboard";
import MLMPromoCard from "./MLMPromoCard";
import OrdersPage from "./OrdersPage";
import TransactionsPage from "./TransactionsPage";
import ResellerPage from "./ResellerPage";
import ProfilePage from "./ProfilePage";
import ServicesPage from "./ServicesPage";
import WithdrawForm from "./WithdrawForm";
import { Dialog } from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const MainContent = () => {
  const [activeTab, setActiveTab] = useState("main");
  const [activePage, setActivePage] = useState("dashboard");
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const [userBalance, setUserBalance] = useState(1500000);

  // Handle hash changes for navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        setActivePage(hash);
      }
    };

    // Set initial page based on hash if present
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);

    // Listen for withdraw dialog open event
    const handleOpenWithdrawDialog = () => setWithdrawDialogOpen(true);
    window.addEventListener("open-withdraw-dialog", handleOpenWithdrawDialog);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener(
        "open-withdraw-dialog",
        handleOpenWithdrawDialog,
      );
    };
  }, []);

  // Handle withdraw submission
  const handleWithdrawSubmit = () => {
    // Set balance to 0 after withdrawal
    setUserBalance(0);

    // Update the balance in Header component by dispatching a custom event
    window.dispatchEvent(
      new CustomEvent("balance-updated", { detail: { balance: 0 } }),
    );
  };

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <Tabs
            defaultValue="main"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-6">
              <TabsTrigger value="main">Main Dashboard</TabsTrigger>
              <TabsTrigger value="reseller">Reseller Dashboard</TabsTrigger>
            </TabsList>

            <TabsContent value="main" className="space-y-6">
              {/* Order Progress Section */}
              <OrderProgressGrid />

              {/* Services Section - Replaced with Bento Grid */}
              <ServiceBentoGrid />

              {/* Transactions Section - Replaced with Reseller Leaderboard */}
              <ResellerLeaderboard />
            </TabsContent>

            <TabsContent value="reseller">
              {/* Replaced with MLM Promo Card */}
              <MLMPromoCard />
            </TabsContent>
          </Tabs>
        );
      case "orders":
        return <OrdersPage />;
      case "transactions":
        return <TransactionsPage />;
      case "reseller":
        return <ResellerPage />;
      case "profile":
        return <ProfilePage />;
      case "services":
        return <ServicesPage />;
      case "checkout":
        return <CheckoutPage />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p>Page not found</p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col space-y-6 p-6 bg-gray-50 min-h-screen">
      {renderContent()}

      {/* Withdraw Dialog */}
      <Dialog open={withdrawDialogOpen} onOpenChange={setWithdrawDialogOpen}>
        <WithdrawForm
          balance={userBalance}
          onClose={() => setWithdrawDialogOpen(false)}
          onSubmit={handleWithdrawSubmit}
        />
      </Dialog>
    </div>
  );
};

export default MainContent;
