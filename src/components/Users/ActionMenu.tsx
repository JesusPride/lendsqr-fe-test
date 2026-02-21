import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { usersAPI } from "../../lib/api/users";
import type { User } from "../../lib/api/users";
import { useToastContext } from "../../lib/hooks/useToastContext";
import "./ActionMenu.scss";

interface ActionMenuProps {
  userId: string;
  currentStatus?: User["status"];
  onStatusChange?: () => void;
}

const ActionMenu: React.FC<ActionMenuProps> = ({
  userId,
  currentStatus,
  onStatusChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { showSuccess, showError } = useToastContext();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleStatusChange = async (newStatus: User["status"]) => {
    if (isLoading) return;

    // Show SweetAlert2 confirmation dialog
    const statusAction =
      newStatus === "Blacklisted"
        ? "blacklist"
        : newStatus === "Active"
        ? "activate"
        : newStatus === "Inactive"
        ? "deactivate"
        : "set as pending";

    const getStatusColor = (status: User["status"]) => {
      switch (status) {
        case "Active":
          return "#39CD62";
        case "Inactive":
          return "#545F7D";
        case "Pending":
          return "#E9B200";
        case "Blacklisted":
          return "#E4033B";
        default:
          return "#545F7D";
      }
    };

    const result = await Swal.fire({
      title: "Confirm Status Change",
      html: `
        <div style="text-align: center; margin: 20px 0;">
          <p style="font-size: 16px; color: #213F7D; margin-bottom: 16px;">
            Are you sure you want to <strong>${statusAction}</strong> this user?
          </p>
          <div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 16px;">
            <span style="color: #545F7D;">Status will change to:</span>
            <span style="
              background: ${getStatusColor(newStatus)}15;
              color: ${getStatusColor(newStatus)};
              padding: 4px 12px;
              border-radius: 100px;
              font-weight: 500;
              font-size: 14px;
            ">${newStatus}</span>
          </div>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: getStatusColor(newStatus),
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${statusAction}!`,
      cancelButtonText: "Cancel",
      reverseButtons: true,
      focusCancel: true,
      customClass: {
        popup: "swal-custom-popup",
        title: "swal-custom-title",
        confirmButton: "swal-custom-confirm",
        cancelButton: "swal-custom-cancel",
      },
    });

    if (!result.isConfirmed) {
      setIsOpen(false);
      return;
    }

    try {
      setIsLoading(true);
      await usersAPI.updateUserStatus(userId, newStatus);

      // Show success toast
      showSuccess(
        "Status Updated",
        `User status has been changed to ${newStatus}`,
        3000
      );

      // Show success SweetAlert
      await Swal.fire({
        title: "Success!",
        html: `
          <div style="text-align: center; margin: 16px 0;">
            <p style="font-size: 16px; color: #213F7D; margin-bottom: 12px;">
              User status has been successfully updated to:
            </p>
            <span style="
              background: ${getStatusColor(newStatus)}15;
              color: ${getStatusColor(newStatus)};
              padding: 6px 16px;
              border-radius: 100px;
              font-weight: 500;
              font-size: 16px;
            ">${newStatus}</span>
          </div>
        `,
        icon: "success",
        confirmButtonColor: getStatusColor(newStatus),
        confirmButtonText: "Great!",
        timer: 2000,
        timerProgressBar: true,
        customClass: {
          popup: "swal-custom-popup",
          title: "swal-custom-title",
          confirmButton: "swal-custom-confirm",
        },
      });

      onStatusChange?.();
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to update user status:", error);

      // Show error toast
      showError(
        "Update Failed",
        "Failed to update user status. Please try again.",
        5000
      );

      // Show error SweetAlert
      await Swal.fire({
        title: "Error!",
        html: `
          <div style="text-align: center; margin: 16px 0;">
            <p style="font-size: 16px; color: #213F7D; margin-bottom: 12px;">
              Failed to update user status. Please try again.
            </p>
            <p style="font-size: 14px; color: #545F7D;">
              If the problem persists, please contact support.
            </p>
          </div>
        `,
        icon: "error",
        confirmButtonColor: "#E4033B",
        confirmButtonText: "Try Again",
        customClass: {
          popup: "swal-custom-popup",
          title: "swal-custom-title",
          confirmButton: "swal-custom-confirm",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAction = (action: string) => {
    if (isLoading) return;

    setIsOpen(false);
    switch (action) {
      case "view":
        navigate(`/users/${userId}`);
        break;
      case "activate":
        handleStatusChange("Active");
        break;
      case "deactivate":
        handleStatusChange("Inactive");
        break;
      case "pending":
        handleStatusChange("Pending");
        break;
      case "blacklist":
        handleStatusChange("Blacklisted");
        break;
      default:
        console.log(`${action} user with ID: ${userId}`);
    }
  };

  const getMenuItems = () => {
    const items = [
      {
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 3.5C6.067 3.5 4.5 5.067 4.5 7S6.067 10.5 8 10.5S11.5 8.933 11.5 7S9.933 3.5 8 3.5ZM8 9.5C6.619 9.5 5.5 8.381 5.5 7S6.619 4.5 8 4.5S10.5 5.619 10.5 7S9.381 9.5 8 9.5Z"
              fill="#545F7D"
            />
            <path
              d="M8 0C3.589 0 0 3.589 0 8S3.589 16 8 16S16 12.411 16 8S12.411 0 8 0ZM8 15C4.14 15 1 11.86 1 8S4.14 1 8 1S15 4.14 15 8S11.86 15 8 15Z"
              fill="#545F7D"
            />
          </svg>
        ),
        label: "View Details",
        action: "view",
      },
    ];

    // Add status-specific actions based on current status
    if (currentStatus !== "Active") {
      items.push({
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 0C3.589 0 0 3.589 0 8S3.589 16 8 16S16 12.411 16 8S12.411 0 8 0ZM8 15C4.14 15 1 11.86 1 8S4.14 1 8 1S15 4.14 15 8S11.86 15 8 15Z"
              fill="#39CD62"
            />
            <path
              d="M10.5 7.5H8.5V5.5C8.5 5.224 8.276 5 8 5S7.5 5.224 7.5 5.5V7.5H5.5C5.224 7.5 5 7.724 5 8S5.224 8.5 5.5 8.5H7.5V10.5C7.5 10.776 7.724 11 8 11S8.5 10.776 8.5 10.5V8.5H10.5C10.776 8.5 11 8.276 11 8S10.776 7.5 10.5 7.5Z"
              fill="#39CD62"
            />
          </svg>
        ),
        label: "Activate User",
        action: "activate",
      });
    }

    if (currentStatus !== "Inactive") {
      items.push({
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 0C3.589 0 0 3.589 0 8S3.589 16 8 16S16 12.411 16 8S12.411 0 8 0ZM8 15C4.14 15 1 11.86 1 8S4.14 1 8 1S15 4.14 15 8S11.86 15 8 15Z"
              fill="#545F7D"
            />
            <path
              d="M10.5 7.5H5.5C5.224 7.5 5 7.724 5 8S5.224 8.5 5.5 8.5H10.5C10.776 8.5 11 8.276 11 8S10.776 7.5 10.5 7.5Z"
              fill="#545F7D"
            />
          </svg>
        ),
        label: "Deactivate User",
        action: "deactivate",
      });
    }

    if (currentStatus !== "Pending") {
      items.push({
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 0C3.589 0 0 3.589 0 8S3.589 16 8 16S16 12.411 16 8S12.411 0 8 0ZM8 15C4.14 15 1 11.86 1 8S4.14 1 8 1S15 4.14 15 8S11.86 15 8 15Z"
              fill="#E9B200"
            />
            <path
              d="M8 3C7.45 3 7 3.45 7 4V8C7 8.55 7.45 9 8 9S9 8.55 9 8V4C9 3.45 8.55 3 8 3ZM8 11C7.45 11 7 11.45 7 12S7.45 13 8 13S9 12.55 9 12S8.55 11 8 11Z"
              fill="#E9B200"
            />
          </svg>
        ),
        label: "Set as Pending",
        action: "pending",
      });
    }

    if (currentStatus !== "Blacklisted") {
      items.push({
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 0C3.589 0 0 3.589 0 8S3.589 16 8 16S16 12.411 16 8S12.411 0 8 0ZM8 15C4.14 15 1 11.86 1 8S4.14 1 8 1S15 4.14 15 8S11.86 15 8 15Z"
              fill="#E4033B"
            />
            <path
              d="M10.5 7.5H5.5C5.224 7.5 5 7.724 5 8S5.224 8.5 5.5 8.5H10.5C10.776 8.5 11 8.276 11 8S10.776 7.5 10.5 7.5Z"
              fill="#E4033B"
            />
          </svg>
        ),
        label: "Blacklist User",
        action: "blacklist",
      });
    }

    return items;
  };

  return (
    <div className="action-menu" ref={menuRef}>
      <button
        className={`action-trigger ${isLoading ? "loading" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
      >
        {isLoading ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle
              cx="10"
              cy="10"
              r="8"
              stroke="#545F7D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="50.265"
              strokeDashoffset="50.265"
            >
              <animate
                attributeName="stroke-dasharray"
                dur="2s"
                values="0 50.265;25.133 25.133;0 50.265;0 50.265"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-dashoffset"
                dur="2s"
                values="0;-25.133;-50.265;-50.265"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 6C10.5523 6 11 5.55228 11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5C9 5.55228 9.44772 6 10 6Z"
              fill="#545F7D"
            />
            <path
              d="M10 11C10.5523 11 11 10.5523 11 10C11 9.44772 10.5523 9 10 9C9.44772 9 9 9.44772 9 10C9 10.5523 9.44772 11 10 11Z"
              fill="#545F7D"
            />
            <path
              d="M10 16C10.5523 16 11 15.5523 11 15C11 14.4477 10.5523 14 10 14C9.44772 14 9 14.4477 9 15C9 15.5523 9.44772 16 10 16Z"
              fill="#545F7D"
            />
          </svg>
        )}
      </button>

      {isOpen && !isLoading && (
        <div className="action-dropdown">
          {getMenuItems().map((item, index) => (
            <button
              key={index}
              className="action-item"
              onClick={() => handleAction(item.action)}
            >
              <span className="action-icon">{item.icon}</span>
              <span className="action-label">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActionMenu;
