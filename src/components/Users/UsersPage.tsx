import React, { useState, useEffect } from "react";
import StatsCards from "./StatsCards";
import UsersTable from "./UsersTable.tsx";
import LoadingSpinner from "../UI/LoadingSpinner";
import "./UsersPage.scss";

const UsersPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [statsRefreshTrigger, setStatsRefreshTrigger] = useState(0);

  useEffect(() => {
    // Show loading for 5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleStatsRefresh = () => {
    setStatsRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className={`users-page ${isLoading ? "loading" : ""}`}>
      {isLoading && (
        <div className="users-loading-overlay">
          <div className="loading-content">
            <LoadingSpinner size="large" color="primary" />
            <p>Loading...</p>
          </div>
        </div>
      )}

      <h1 className="page-title">Users</h1>
      <StatsCards refreshTrigger={statsRefreshTrigger} />
      <UsersTable onStatsRefresh={handleStatsRefresh} />
    </div>
  );
};

export default UsersPage;
