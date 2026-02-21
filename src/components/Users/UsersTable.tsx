import React from "react";
import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import ActionMenu from "./ActionMenu";
import TableFilter from "./TableFilter";
import Pagination from "./Pagination";
import { useUsers } from "../../lib/hooks/useUsers";
import "./UsersTable.scss";

export interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: "Active" | "Inactive" | "Pending" | "Blacklisted";
}

interface UsersTableProps {
  onStatsRefresh?: () => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ onStatsRefresh }) => {
  const navigate = useNavigate();
  const {
    users,
    total,
    page,
    limit,
    totalPages,
    isLoading,
    error,
    pagination,
    updateFilters,
    updatePagination,
    fetchUsers,
  } = useUsers();

  const columns = [
    { key: "organization", label: "ORGANIZATION", filterable: true },
    { key: "username", label: "USERNAME", filterable: true },
    { key: "email", label: "EMAIL", filterable: true },
    { key: "phoneNumber", label: "PHONE NUMBER", filterable: true },
    { key: "dateJoined", label: "DATE JOINED", filterable: true },
    { key: "status", label: "STATUS", filterable: true },
  ];

  const handleFilter = (filterData: Record<string, string>) => {
    // Filter out empty values
    const cleanFilters = Object.entries(filterData).reduce(
      (acc, [key, value]) => {
        if (value && value !== "") {
          acc[key] = value;
        }
        return acc;
      },
      {} as Record<string, string>
    );

    updateFilters(cleanFilters);
  };

  const handlePageChange = (newPage: number) => {
    updatePagination({ ...pagination, page: newPage });
  };

  const handleItemsPerPageChange = (newLimit: number) => {
    updatePagination({ ...pagination, limit: newLimit, page: 1 });
  };

  const handleRowClick = (userId: string) => {
    navigate(`/users/${userId}`);
  };

  const handleStatusChange = () => {
    // Refresh the users list after status change
    fetchUsers();
    // Refresh the stats cards
    onStatsRefresh?.();
  };

  return (
    <div className="users-table-container">
      <div className="table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="table-header">
                  <div className="header-content">
                    <span>{column.label}</span>
                    {column.filterable && (
                      <TableFilter
                        columnKey={column.key}
                        onFilter={handleFilter}
                        filterType={column.key === "status" ? "select" : "text"}
                        options={
                          column.key === "status"
                            ? ["Active", "Inactive", "Pending", "Blacklisted"]
                            : undefined
                        }
                      />
                    )}
                  </div>
                </th>
              ))}
              <th className="table-header actions-header"></th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} className="table-cell loading-cell">
                  Loading users...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={7} className="table-cell error-cell">
                  Error: {error}
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={7} className="table-cell empty-cell">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="table-row clickable"
                  onClick={() => handleRowClick(user.id)}
                >
                  <td className="table-cell">{user.organization}</td>
                  <td className="table-cell">{user.username}</td>
                  <td className="table-cell">{user.email}</td>
                  <td className="table-cell">{user.phoneNumber}</td>
                  <td className="table-cell">{user.dateJoined}</td>
                  <td className="table-cell">
                    <StatusBadge status={user.status} />
                  </td>
                  <td
                    className="table-cell actions-cell"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ActionMenu
                      userId={user.id}
                      currentStatus={user.status}
                      onStatusChange={handleStatusChange}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        totalItems={total}
        itemsPerPage={limit}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
};

export default UsersTable;
