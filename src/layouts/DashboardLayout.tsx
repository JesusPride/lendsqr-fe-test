import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Topbar/Header";
import "./DashboardLayout.scss";
interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      {sidebarOpen && (
        <div
          className="sidebar-overlay overlay-visible"
          onClick={closeSidebar}
        />
      )}
      <div className="dashboard-main">
        <Header onToggleSidebar={toggleSidebar} />
        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
