import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/hooks/useAuth";
import { useToastContext } from "../../lib/hooks/useToastContext";
import "./Header.scss";

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { logout } = useAuth();
  const { showSuccess, showError } = useToastContext();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setShowUserDropdown(false);

      // Show success notification
      showSuccess(
        "Logged Out Successfully",
        "You have been safely logged out. Redirecting to login...",
        2000
      );

      // Small delay to show the success message before redirecting
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1000);
    } catch (error) {
      console.error("Logout failed:", error);

      // Show error notification
      showError(
        "Logout Error",
        "There was an issue logging out, but you'll be redirected to login.",
        3000
      );

      // Even if logout fails, redirect to login after showing error
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1500);
    }
  };
  return (
    <header className="header">
      <button className="hamburger-menu" onClick={onToggleSidebar}>
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M3 12H21M3 6H21M3 18H21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className="header-left">
        {/* <img src="/lendsqr_logo.svg" alt="Lendsqr" className="logo" /> */}
        <form onSubmit={handleSearch} className="search-container">
          <input
            type="text"
            placeholder="Search for anything"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            name="search-input"
          />
          <button type="submit" className="search-btn">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M5.5 0C2.46243 0 0 2.46243 0 5.5C0 8.53757 2.46243 11 5.5 11C6.74632 11 7.65421 10.7877 8.72855 9.89418L12.4168 13.3824C12.5231 13.4877 12.7665 13.6253 12.9599 13.6253C13.3466 13.6253 13.6553 13.3166 13.6553 12.93C13.6553 12.7366 13.5777 12.5432 13.4224 12.3879L9.73318 8.69873C10.4277 7.82439 10.84 6.71651 10.84 5.5C10.84 2.46243 8.37757 0 5.5 0ZM5.5 1.4C7.73008 1.4 9.5 3.16992 9.5 5.4C9.5 7.63008 7.73008 9.4 5.5 9.4C3.26992 9.4 1.5 7.63008 1.5 5.4C1.5 3.16992 3.26992 1.4 5.5 1.4Z"
                fill="white"
              />
            </svg>
          </button>
        </form>
      </div>
      <div className="header-right">
        <button className="mobile-search-btn" onClick={handleSearch}>
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
            <path
              d="M5.5 0C2.46243 0 0 2.46243 0 5.5C0 8.53757 2.46243 11 5.5 11C6.74632 11 7.65421 10.7877 8.72855 9.89418L12.4168 13.3824C12.5231 13.4877 12.7665 13.6253 12.9599 13.6253C13.3466 13.6253 13.6553 13.3166 13.6553 12.93C13.6553 12.7366 13.5777 12.5432 13.4224 12.3879L9.73318 8.69873C10.4277 7.82439 10.84 6.71651 10.84 5.5C10.84 2.46243 8.37757 0 5.5 0ZM5.5 1.4C7.73008 1.4 9.5 3.16992 9.5 5.4C9.5 7.63008 7.73008 9.4 5.5 9.4C3.26992 9.4 1.5 7.63008 1.5 5.4C1.5 3.16992 3.26992 1.4 5.5 1.4Z"
              fill="#213F7D"
            />
          </svg>
        </button>
        <a href="#" className="docs-link">
          Docs
        </a>
        <div className="notification-icon">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 0C8.34315 0 7 1.34315 7 3V3.09C5.25 3.5 4 5.06 4 7V11L2 13V14H18V13L16 11V7C16 5.06 14.75 3.5 13 3.09V3C13 1.34315 11.6569 0 10 0ZM10 2C10.5523 2 11 2.44772 11 3V3.17C10.6667 3.06 10.3333 3 10 3C9.66667 3 9.33333 3.06 9 3.17V3C9 2.44772 9.44772 2 10 2ZM10 5C12.2091 5 14 6.79086 14 9V12H6V9C6 6.79086 7.79086 5 10 5ZM8 16C8 17.1046 8.89543 18 10 18C11.1046 18 12 17.1046 12 16H8Z"
              fill="#213F7D"
            />
          </svg>
        </div>
        <div
          className="user-profile"
          onClick={() => setShowUserDropdown(!showUserDropdown)}
        >
          <img src="/lendsqr_profile.png" alt="User" className="avatar" />
          {/* <img src="/avatar.svg" alt="User" className="avatar" /> */}
          <span className="username">Adedeji</span>
          <svg
            className="dropdown-arrow"
            width="8"
            height="4"
            viewBox="0 0 8 4"
            fill="none"
          >
            <path d="M0 0L4 4L8 0H0Z" fill="#213F7D" />
          </svg>

          {showUserDropdown && (
            <div className="user-dropdown">
              <div className="dropdown-item">
                <span>Profile</span>
              </div>
              <div className="dropdown-item">
                <span>Settings</span>
              </div>
              <div className="dropdown-item" onClick={handleLogout}>
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
