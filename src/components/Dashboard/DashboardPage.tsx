import React, { useState, useEffect } from "react";
import StatsCards from "../Users/StatsCards"; // Reusing the stats cards
import DashboardCharts from "./DashboardCharts";
import LoadingSpinner from "../UI/LoadingSpinner";
import "./Dashboard.scss";

const DashboardPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [refreshTrigger] = useState(0);

  useEffect(() => {
    // Show loading for 2 seconds (faster than users page)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`dashboard-page ${isLoading ? "loading" : ""}`}>
      {isLoading && (
        <div className="dashboard-loading-overlay">
          <div className="loading-content">
            <LoadingSpinner size="large" color="primary" />
            <p>Loading Dashboard...</p>
          </div>
        </div>
      )}
      <div className="dashboard-header">
        <h1 className="page-title">Dashboard</h1>
      </div>
      
      <StatsCards refreshTrigger={refreshTrigger} />
      
      <DashboardCharts />
    </div>
  );
};

export default DashboardPage;
