import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.scss";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose(); // Close sidebar on mobile after navigation
  };

  const menuItems = [
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M6.5 14.5V9.5H9.5V14.5H13V7.5H15.5L8 0.5L0.5 7.5H3V14.5H6.5Z"
            fill="currentColor"
          />
        </svg>
      ),
      label: "Dashboard",
      path: "/dashboard",
      active: location.pathname === "/dashboard",
    },
    {
      category: "CUSTOMERS",
      items: [
        {
          icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8ZM8 10C5.33 10 0 11.34 0 14V16H16V14C16 11.34 10.67 10 8 10Z"
                fill="currentColor"
              />
            </svg>
          ),
          label: "Users",
          path: "/users",
          active: location.pathname.startsWith("/users"),
        },
        {
          icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 0C3.58 0 0 3.58 0 8C0 12.42 3.58 16 8 16C12.42 16 16 12.42 16 8C16 3.58 12.42 0 8 0ZM8 14C4.69 14 2 11.31 2 8C2 4.69 4.69 2 8 2C11.31 2 14 4.69 14 8C14 11.31 11.31 14 8 14Z"
                fill="currentColor"
              />
            </svg>
          ),
          label: "Guarantors",
          path: "/guarantors",
          active: location.pathname === "/guarantors",
        },
        {
          icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M14 2H2C0.9 2 0 2.9 0 4V12C0 13.1 0.9 14 2 14H14C15.1 14 16 13.1 16 12V4C16 2.9 15.1 2 14 2ZM14 12H2V6H14V12ZM14 4H2V4H14V4Z"
                fill="currentColor"
              />
            </svg>
          ),
          label: "Loans",
          path: "/loans",
          active: location.pathname === "/loans",
        },
        {
          icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 13H13V11H3V13ZM3 9H13V7H3V9ZM3 3V5H13V3H3Z"
                fill="currentColor"
              />
            </svg>
          ),
          label: "Decision Models",
          path: "/decision-models",
          active: location.pathname === "/decision-models",
        },
        {
          icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M12 2C13.1 2 14 2.9 14 4V12C14 13.1 13.1 14 12 14H4C2.9 14 2 13.1 2 12V4C2 2.9 2.9 2 4 2H12ZM12 12V4H4V12H12Z"
                fill="currentColor"
              />
            </svg>
          ),
          label: "Savings",
          path: "/savings",
          active: location.pathname === "/savings",
        },
        {
          icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M14 2H2C0.9 2 0 2.9 0 4V12C0 13.1 0.9 14 2 14H14C15.1 14 16 13.1 16 12V4C16 2.9 15.1 2 14 2ZM14 12H2V6H14V12Z"
                fill="currentColor"
              />
            </svg>
          ),
          label: "Loan Requests",
          path: "/loan-requests",
          active: location.pathname === "/loan-requests",
        },
        {
          icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M9 11H7V9H9V11ZM9 7H7V5H9V7ZM13 1H3C1.9 1 1 1.9 1 3V13C1 14.1 1.9 15 3 15H13C14.1 15 15 14.1 15 13V3C15 1.9 14.1 1 13 1ZM13 13H3V3H13V13Z"
                fill="currentColor"
              />
            </svg>
          ),
          label: "Whitelist",
          path: "/whitelist",
          active: location.pathname === "/whitelist",
        },
        {
          icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 0L10.59 5.41L16 8L10.59 10.59L8 16L5.41 10.59L0 8L5.41 5.41L8 0Z"
                fill="currentColor"
              />
            </svg>
          ),
          label: "Karma",
          path: "/karma",
          active: location.pathname === "/karma",
        },
      ],
    },
    {
      category: "BUSINESSES",
      items: [
        {
          icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M12 7V3C12 1.9 11.1 1 10 1H6C4.9 1 4 1.9 4 3V7C2.9 7 2 7.9 2 9V15H14V9C14 7.9 13.1 7 12 7ZM6 3H10V7H6V3Z"
                fill="currentColor"
              />
            </svg>
          ),
          label: "Organization",
          path: "/organization",
          active: location.pathname === "/organization",
        },
        {
          icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M14 6H10L8.5 4.5H6C5.45 4.5 5 4.95 5 5.5V10.5C5 11.05 5.45 11.5 6 11.5H14C14.55 11.5 15 11.05 15 10.5V7C15 6.45 14.55 6 14 6Z"
                fill="currentColor"
              />
            </svg>
          ),
          label: "Loan Products",
          path: "/loan-products",
          active: location.pathname === "/loan-products",
        },
        {
          icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M12 2C13.1 2 14 2.9 14 4V12C14 13.1 13.1 14 12 14H4C2.9 14 2 13.1 2 12V4C2 2.9 2.9 2 4 2H12ZM12 12V4H4V12H12Z"
                fill="currentColor"
              />
            </svg>
          ),
          label: "Savings Products",
          path: "/savings-products",
          active: location.pathname === "/savings-products",
        },
        {
          icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M11.8 10.9C13.4 9.9 14.5 8.1 14.5 6C14.5 2.9 12.1 0.5 9 0.5S3.5 2.9 3.5 6C3.5 8.1 4.6 9.9 6.2 10.9C2.7 12.1 0 15.2 0 19H2C2 15.1 5.1 12 9 12S16 15.1 16 19H18C18 15.2 15.3 12.1 11.8 10.9Z"
                fill="currentColor"
              />
            </svg>
          ),
          label: "Fees and Charges",
          path: "/fees-and-charges",
          active: location.pathname === "/fees-and-charges",
        },
        {
          icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M7 14L12 9L10.59 7.59L7 11.17L5.41 9.59L4 11L7 14ZM12 2H4C2.9 2 2 2.9 2 4V12C2 13.1 2.9 14 4 14H12C13.1 14 14 13.1 14 12V4C14 2.9 13.1 2 12 2Z"
                fill="currentColor"
              />
            </svg>
          ),
          label: "Transactions",
          path: "/transactions",
          active: location.pathname === "/transactions",
        },
        {
          icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M12 8C13.1 8 14 7.1 14 6S13.1 4 12 4S10 4.9 10 6S10.9 8 12 8ZM4 8C5.1 8 6 7.1 6 6S5.1 4 4 4S2 4.9 2 6S2.9 8 4 8ZM4 10C2.67 10 0 10.67 0 12V14H8V12C8 10.67 5.33 10 4 10ZM12 10C11.78 10 11.54 10.03 11.28 10.07C12.27 10.64 13 11.49 13 12V14H16V12C16 10.67 13.33 10 12 10Z"
                fill="currentColor"
              />
            </svg>
          ),
          label: "Services",
          path: "/services",
          active: location.pathname === "/services",
        },
        {
          icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8ZM8 10C5.33 10 0 11.34 0 14V16H16V14C16 11.34 10.67 10 8 10Z"
                fill="currentColor"
              />
            </svg>
          ),
          label: "Service Account",
          path: "/service-account",
          active: location.pathname === "/service-account",
        },
        {
          icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M2 6H14L12 4H4L2 6ZM2 8V12C2 13.1 2.9 14 4 14H12C13.1 14 14 13.1 14 12V8H2Z"
                fill="currentColor"
              />
            </svg>
          ),
          label: "Settlements",
          path: "/settlements",
          active: location.pathname === "/settlements",
        },
        {
          icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3.5 18.49L9 16.5L14.5 18.49V2.5H3.5V18.49ZM5.5 4.5H12.5V15.5L9 14.5L5.5 15.5V4.5Z"
                fill="currentColor"
              />
            </svg>
          ),
          label: "Reports",
          path: "/reports",
          active: location.pathname === "/reports",
        },
      ],
    },
    {
      category: "SETTINGS",
      items: [
        {
          icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 5.5C6.62 5.5 5.5 6.62 5.5 8S6.62 10.5 8 10.5S10.5 9.38 10.5 8S9.38 5.5 8 5.5ZM13.43 7.09C13.47 7.39 13.5 7.69 13.5 8S13.47 8.61 13.43 8.91L15.54 10.59C15.73 10.74 15.78 11.01 15.66 11.22L13.66 14.78C13.54 14.99 13.27 15.05 13.05 14.97L10.56 13.95C10.04 14.34 9.45 14.68 8.81 14.91L8.4 17.62C8.36 17.85 8.16 18 7.92 18H3.92C3.68 18 3.48 17.85 3.44 17.62L3.03 14.91C2.39 14.68 1.8 14.34 1.28 13.95L-1.21 14.97C-1.43 15.05 -1.7 14.99 -1.82 14.78L-3.82 11.22C-3.94 11.01 -3.89 10.74 -3.7 10.59L-1.59 8.91C-1.63 8.61 -1.66 8.31 -1.66 8S-1.63 7.39 -1.59 7.09L-3.7 5.41C-3.89 5.26 -3.94 4.99 -3.82 4.78L-1.82 1.22C-1.7 1.01 -1.43 0.95 -1.21 1.03L1.28 2.05C1.8 1.66 2.39 1.32 3.03 1.09L3.44 -1.62C3.48 -1.85 3.68 -2 3.92 -2H7.92C8.16 -2 8.36 -1.85 8.4 -1.62L8.81 1.09C9.45 1.32 10.04 1.66 10.56 2.05L13.05 1.03C13.27 0.95 13.54 1.01 13.66 1.22L15.66 4.78C15.78 4.99 15.73 5.26 15.54 5.41L13.43 7.09Z"
                fill="currentColor"
              />
            </svg>
          ),
          label: "Preferences",
          path: "/preferences",
          active: location.pathname === "/preferences",
        },
        {
          icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M11.8 10.9C13.4 9.9 14.5 8.1 14.5 6C14.5 2.9 12.1 0.5 9 0.5S3.5 2.9 3.5 6C3.5 8.1 4.6 9.9 6.2 10.9C2.7 12.1 0 15.2 0 19H2C2 15.1 5.1 12 9 12S16 15.1 16 19H18C18 15.2 15.3 12.1 11.8 10.9Z"
                fill="currentColor"
              />
            </svg>
          ),
          label: "Fees and Pricing",
          path: "/fees-and-pricing",
          active: location.pathname === "/fees-and-pricing",
        },
        {
          icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 13H13V11H3V13ZM3 9H13V7H3V9ZM3 3V5H13V3H3Z"
                fill="currentColor"
              />
            </svg>
          ),
          label: "Audit Logs",
          path: "/audit-logs",
          active: location.pathname === "/audit-logs",
        },
      ],
    },
  ];

  return (
    <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
      <div className="sidebar-header">
        <img src="/lendsqr_logo.svg" alt="Lendsqr" className="logo" />
      </div>

      <nav className="sidebar-nav">
        <div className="organization-switch">
          <span className="switch-icon">🏢</span>
          <span className="switch-text">Switch Organization</span>
          <svg
            className="dropdown-arrow"
            width="8"
            height="4"
            viewBox="0 0 8 4"
            fill="none"
          >
            <path d="M0 0L4 4L8 0H0Z" fill="#213F7D" />
          </svg>
        </div>
        {menuItems.map((section, index) => (
          <div key={index} className="nav-section">
            {section.category && (
              <div className="nav-category">{section.category}</div>
            )}
            {section.items ? (
              section.items.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  onClick={() => handleNavigation(item.path)}
                  className={`nav-item ${item.active ? "active" : ""}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </button>
              ))
            ) : (
              <button
                onClick={() => handleNavigation(section.path)}
                className={`nav-item ${section.active ? "active" : ""}`}
              >
                <span className="nav-icon">{section.icon}</span>
                <span className="nav-label">{section.label}</span>
              </button>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
