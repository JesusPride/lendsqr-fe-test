import React, { useEffect } from "react";
import { useStats } from "../../lib/hooks/useStats";
import "./StatsCards.scss";

interface StatsCardsProps {
  refreshTrigger?: number;
}

const StatsCards: React.FC<StatsCardsProps> = ({ refreshTrigger }) => {
  const { stats: apiStats, isLoading, error, fetchStats } = useStats();

  // Refresh stats when refreshTrigger changes
  useEffect(() => {
    if (refreshTrigger && refreshTrigger > 0) {
      fetchStats();
    }
  }, [refreshTrigger, fetchStats]);

  const statsConfig = [
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="20" fill="rgba(223, 24, 255, 0.1)" />
          <path
            d="M20 12C18.9 12 18 12.9 18 14C18 15.1 18.9 16 20 16C21.1 16 22 15.1 22 14C22 12.9 21.1 12 20 12ZM20 26C18.9 26 18 26.9 18 28C18 29.1 18.9 30 20 30C21.1 30 22 29.1 22 28C22 26.9 21.1 26 20 26ZM14 18C12.9 18 12 18.9 12 20C12 21.1 12.9 22 14 22C15.1 22 16 21.1 16 20C16 18.9 15.1 18 14 18ZM26 18C24.9 18 24 18.9 24 20C24 21.1 24.9 22 26 22C27.1 22 28 21.1 28 20C28 18.9 27.1 18 26 18Z"
            fill="#DF18FF"
          />
        </svg>
      ),
      title: "USERS",
      value: apiStats?.totalUsers?.toLocaleString() || "0",
      color: "pink",
    },
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="20" fill="rgba(87, 24, 255, 0.1)" />
          <path
            d="M20 12C17.79 12 16 13.79 16 16C16 18.21 17.79 20 20 20C22.21 20 24 18.21 24 16C24 13.79 22.21 12 20 12ZM20 22C16.67 22 10 23.67 10 27V29H30V27C30 23.67 23.33 22 20 22Z"
            fill="#5718FF"
          />
        </svg>
      ),
      title: "ACTIVE USERS",
      value: apiStats?.activeUsers?.toLocaleString() || "0",
      color: "purple",
    },
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="20" fill="rgba(245, 95, 68, 0.1)" />
          <path
            d="M20 10C15.03 10 11 14.03 11 19C11 23.97 15.03 28 20 28C24.97 28 29 23.97 29 19C29 14.03 24.97 10 20 10ZM22.5 20.5H20.5V22.5C20.5 22.78 20.28 23 20 23C19.72 23 19.5 22.78 19.5 22.5V20.5H17.5C17.22 20.5 17 20.28 17 20C17 19.72 17.22 19.5 17.5 19.5H19.5V17.5C19.5 17.22 19.72 17 20 17C20.28 17 20.5 17.22 20.5 17.5V19.5H22.5C22.78 19.5 23 19.72 23 20C23 20.28 22.78 20.5 22.5 20.5Z"
            fill="#F55F44"
          />
        </svg>
      ),
      title: "USERS WITH LOANS",
      value: apiStats?.usersWithLoans?.toLocaleString() || "0",
      color: "orange",
    },
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="20" fill="rgba(255, 51, 102, 0.1)" />
          <path
            d="M20 10C15.03 10 11 14.03 11 19C11 23.97 15.03 28 20 28C24.97 28 29 23.97 29 19C29 14.03 24.97 10 20 10ZM22 20H18C17.45 20 17 19.55 17 19C17 18.45 17.45 18 18 18H22C22.55 18 23 18.45 23 19C23 19.55 22.55 20 22 20Z"
            fill="#FF3366"
          />
        </svg>
      ),
      title: "USERS WITH SAVINGS",
      value: apiStats?.usersWithSavings?.toLocaleString() || "0",
      color: "red",
    },
  ];

  if (isLoading) {
    return (
      <div className="stats-cards">
        <div className="loading-message">Loading statistics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="stats-cards">
        <div className="error-message">Error loading statistics: {error}</div>
      </div>
    );
  }

  return (
    <div className="stats-cards">
      {statsConfig.map((stat, index) => (
        <div key={index} className={`stat-card ${stat.color}`}>
          <div className="stat-icon">{stat.icon}</div>
          <div className="stat-title">{stat.title}</div>
          <div className="stat-value">{stat.value}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
