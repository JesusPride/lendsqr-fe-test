import React from 'react';
import './StatusBadge.scss';

interface StatusBadgeProps {
  status: 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'status-active';
      case 'inactive':
        return 'status-inactive';
      case 'pending':
        return 'status-pending';
      case 'blacklisted':
        return 'status-blacklisted';
      default:
        return 'status-inactive';
    }
  };

  return (
    <span className={`status-badge ${getStatusClass(status)}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
