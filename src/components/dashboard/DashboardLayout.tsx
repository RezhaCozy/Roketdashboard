import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MainContent from "./MainContent";

interface DashboardLayoutProps {
  isSidebarCollapsed?: boolean;
  onSidebarToggle?: () => void;
}

const DashboardLayout = ({
  isSidebarCollapsed: initialCollapsed = false,
  onSidebarToggle,
}: DashboardLayoutProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] =
    useState(initialCollapsed);

  const handleSidebarToggle = () => {
    const newState = !isSidebarCollapsed;
    setIsSidebarCollapsed(newState);
    onSidebarToggle?.(newState);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={handleSidebarToggle}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto">
          <MainContent />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
