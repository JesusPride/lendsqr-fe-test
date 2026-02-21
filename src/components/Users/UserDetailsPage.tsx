import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../../lib/hooks/useUsers";
// import type { User } from "../../lib/api/users"; // Currently unused
import "./UserDetailsPage.scss";

const UserDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isLoading, error, fetchUser, blacklistUser, activateUser } =
    useUser();
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    if (id) {
      fetchUser(id);
    }
  }, [id, fetchUser]);

  const handleBackToUsers = () => {
    navigate("/dashboard");
  };

  const handleBlacklistUser = async () => {
    if (id && user) {
      try {
        await blacklistUser(id);
        // Refresh user data
        await fetchUser(id);
      } catch (error) {
        console.error("Failed to blacklist user:", error);
      }
    }
  };

  const handleActivateUser = async () => {
    if (id && user) {
      try {
        await activateUser(id);
        // Refresh user data
        await fetchUser(id);
      } catch (error) {
        console.error("Failed to activate user:", error);
      }
    }
  };

  // Status class helper function (currently unused)
  // const getStatusClass = (status: string) => {
  //   switch (status.toLowerCase()) {
  //     case "active":
  //       return "status-active";
  //     case "inactive":
  //       return "status-inactive";
  //     case "pending":
  //       return "status-pending";
  //     case "blacklisted":
  //       return "status-blacklisted";
  //     default:
  //       return "";
  //   }
  // };

  const getUserTier = () => {
    // Simple tier calculation based on user data
    if (
      user?.educationAndEmployment?.monthlyIncome?.includes("800,000") ||
      user?.educationAndEmployment?.monthlyIncome?.includes("1,000,000")
    ) {
      return 3;
    } else if (
      user?.educationAndEmployment?.monthlyIncome?.includes("400,000") ||
      user?.educationAndEmployment?.monthlyIncome?.includes("600,000")
    ) {
      return 2;
    }
    return 1;
  };

  const renderStars = (tier: number) => {
    return Array.from({ length: 3 }, (_, index) => (
      <span key={index} className={`star ${index < tier ? "filled" : ""}`}>
        ★
      </span>
    ));
  };

  if (isLoading) {
    return (
      <div className="user-details-page">
        <div className="loading">Loading user details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-details-page">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="user-details-page">
        <div className="error">User not found</div>
      </div>
    );
  }

  const userTier = getUserTier();

  return (
    <div className="user-details-page">
      {/* Header */}
      <div className="page-header">
        <button className="back-button" onClick={handleBackToUsers}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 12L6 8L10 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Users
        </button>
        <h1 className="page-title">User Details</h1>
        <div className="action-buttons">
          <button
            className="btn btn-outline btn-blacklist"
            onClick={handleBlacklistUser}
            disabled={user.status === "Blacklisted"}
          >
            BLACKLIST USER
          </button>
          <button
            className="btn btn-outline btn-activate"
            onClick={handleActivateUser}
            disabled={user.status === "Active"}
          >
            ACTIVATE USER
          </button>
        </div>
      </div>

      {/* User Profile Card */}
      <div className="user-profile-card">
        <div className="profile-section">
          <div className="profile-info">
            <div className="avatar">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="20" fill="#213F7D" />
                <path
                  d="M20 20C22.7614 20 25 17.7614 25 15C25 12.2386 22.7614 10 20 10C17.2386 10 15 12.2386 15 15C15 17.7614 17.2386 20 20 20Z"
                  fill="white"
                />
                <path
                  d="M20 22.5C15.8579 22.5 12.5 25.8579 12.5 30V32.5H27.5V30C27.5 25.8579 24.1421 22.5 20 22.5Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="user-basic-info">
              <h2 className="user-name">
                {user.personalInfo?.fullName || user.username}
              </h2>
              <p className="user-id">{user.personalInfo?.bvn || user.id}</p>
            </div>
          </div>

          <div className="user-tier">
            <p className="tier-label">User's Tier</p>
            <div className="stars">{renderStars(userTier)}</div>
          </div>

          <div className="user-bank-info">
            <h3 className="bank-balance">₦200,000.00</h3>
            <p className="bank-details">9912345678/Providus Bank</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="tabs-navigation">
        <div className="tabs">
          {[
            { key: "general", label: "General Details" },
            { key: "documents", label: "Documents" },
            { key: "bank", label: "Bank Details" },
            { key: "loans", label: "Loans" },
            { key: "savings", label: "Savings" },
            { key: "app", label: "App and System" },
          ].map((tab) => (
            <button
              key={tab.key}
              className={`tab ${activeTab === tab.key ? "active" : ""}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "general" && (
          <div className="general-details">
            {/* Personal Information */}
            <div className="info-section">
              <h3 className="section-title">Personal Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>FULL NAME</label>
                  <p>{user.personalInfo?.fullName || user.username}</p>
                </div>
                <div className="info-item">
                  <label>PHONE NUMBER</label>
                  <p>{user.phoneNumber}</p>
                </div>
                <div className="info-item">
                  <label>EMAIL ADDRESS</label>
                  <p>{user.email}</p>
                </div>
                <div className="info-item">
                  <label>BVN</label>
                  <p>{user.personalInfo?.bvn}</p>
                </div>
                <div className="info-item">
                  <label>GENDER</label>
                  <p>{user.personalInfo?.gender}</p>
                </div>
                <div className="info-item">
                  <label>MARITAL STATUS</label>
                  <p>{user.personalInfo?.maritalStatus}</p>
                </div>
                <div className="info-item">
                  <label>CHILDREN</label>
                  <p>{user.personalInfo?.children}</p>
                </div>
                <div className="info-item">
                  <label>TYPE OF RESIDENCE</label>
                  <p>{user.personalInfo?.typeOfResidence}</p>
                </div>
              </div>
            </div>

            {/* Education and Employment */}
            <div className="info-section">
              <h3 className="section-title">Education and Employment</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>LEVEL OF EDUCATION</label>
                  <p>{user.educationAndEmployment?.levelOfEducation}</p>
                </div>
                <div className="info-item">
                  <label>EMPLOYMENT STATUS</label>
                  <p>{user.educationAndEmployment?.employmentStatus}</p>
                </div>
                <div className="info-item">
                  <label>SECTOR OF EMPLOYMENT</label>
                  <p>{user.educationAndEmployment?.sectorOfEmployment}</p>
                </div>
                <div className="info-item">
                  <label>DURATION OF EMPLOYMENT</label>
                  <p>{user.educationAndEmployment?.durationOfEmployment}</p>
                </div>
                <div className="info-item">
                  <label>OFFICE EMAIL</label>
                  <p>{user.educationAndEmployment?.officeEmail}</p>
                </div>
                <div className="info-item">
                  <label>MONTHLY INCOME</label>
                  <p>{user.educationAndEmployment?.monthlyIncome}</p>
                </div>
                <div className="info-item">
                  <label>LOAN REPAYMENT</label>
                  <p>{user.educationAndEmployment?.loanRepayment}</p>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="info-section">
              <h3 className="section-title">Socials</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>TWITTER</label>
                  <p>{user.socials?.twitter}</p>
                </div>
                <div className="info-item">
                  <label>FACEBOOK</label>
                  <p>{user.socials?.facebook}</p>
                </div>
                <div className="info-item">
                  <label>INSTAGRAM</label>
                  <p>{user.socials?.instagram}</p>
                </div>
              </div>
            </div>

            {/* Guarantor */}
            <div className="info-section">
              <h3 className="section-title">Guarantor</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>FULL NAME</label>
                  <p>{user.guarantor?.fullName}</p>
                </div>
                <div className="info-item">
                  <label>PHONE NUMBER</label>
                  <p>{user.guarantor?.phoneNumber}</p>
                </div>
                <div className="info-item">
                  <label>EMAIL ADDRESS</label>
                  <p>{user.guarantor?.email}</p>
                </div>
                <div className="info-item">
                  <label>RELATIONSHIP</label>
                  <p>{user.guarantor?.relationship}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab !== "general" && (
          <div className="placeholder-content">
            <p>Content for {activeTab} tab will be implemented here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetailsPage;
