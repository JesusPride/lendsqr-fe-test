import React, { useState, useRef, useEffect } from "react";
import "./TableFilter.scss";

interface TableFilterProps {
  columnKey: string;
  onFilter: (filters: Record<string, string>) => void;
  filterType: "text" | "select" | "date";
  options?: string[];
}

interface FilterFormData extends Record<string, string> {
  organization: string;
  username: string;
  email: string;
  date: string;
  phoneNumber: string;
  status: string;
}

const TableFilter: React.FC<TableFilterProps> = ({
  columnKey,
  onFilter,
  // filterType, // Unused in current implementation
  // options, // Unused in current implementation
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<FilterFormData>({
    organization: "",
    username: "",
    email: "",
    date: "",
    phoneNumber: "",
    status: "",
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Determine dropdown alignment based on column
  const getDropdownClasses = () => {
    const baseClass = "filter-dropdown";

    // For rightmost columns, align to the left to prevent cutoff
    if (columnKey === "status" || columnKey === "dateJoined") {
      return `${baseClass} align-left`;
    }

    return baseClass;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (field: keyof FilterFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFilterSubmit = () => {
    onFilter(formData);
    setIsOpen(false);
  };

  const handleReset = () => {
    const resetData: FilterFormData = {
      organization: "",
      username: "",
      email: "",
      date: "",
      phoneNumber: "",
      status: "",
    };
    setFormData(resetData);
    onFilter(resetData);
    setIsOpen(false);
  };

  const renderFilterContent = () => {
    return (
      <div className="filter-form">
        <div className="filter-field">
          <label className="filter-label">Organization</label>
          <select
            value={formData.organization}
            onChange={(e) => handleInputChange("organization", e.target.value)}
            className="filter-select"
          >
            <option value="">Select</option>
            <option value="Lendsqr">Lendsqr</option>
            <option value="Irorun">Irorun</option>
            <option value="Lendstar">Lendstar</option>
          </select>
        </div>

        <div className="filter-field">
          <label className="filter-label">Username</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
            placeholder="User"
            className="filter-input"
          />
        </div>

        <div className="filter-field">
          <label className="filter-label">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="Email"
            className="filter-input"
          />
        </div>

        <div className="filter-field">
          <label className="filter-label">Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
            className="filter-input filter-date"
          />
        </div>

        <div className="filter-field">
          <label className="filter-label">Phone Number</label>
          <input
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            placeholder="Phone Number"
            className="filter-input"
          />
        </div>

        <div className="filter-field">
          <label className="filter-label">Status</label>
          <select
            value={formData.status}
            onChange={(e) => handleInputChange("status", e.target.value)}
            className="filter-select"
          >
            <option value="">Select</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
            <option value="Blacklisted">Blacklisted</option>
          </select>
        </div>
      </div>
    );
  };

  return (
    <div className="table-filter" ref={dropdownRef}>
      <button className="filter-trigger" onClick={() => setIsOpen(!isOpen)}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M6.22222 13.3333H9.77778V11.5556H6.22222V13.3333ZM0 2.66667V4.44444H16V2.66667H0ZM2.66667 8.88889H13.3333V7.11111H2.66667V8.88889Z"
            fill="#545F7D"
          />
        </svg>
      </button>

      {isOpen && (
        <div className={getDropdownClasses()}>
          {renderFilterContent()}
          <div className="filter-actions">
            <button
              className="filter-btn filter-btn-reset"
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              className="filter-btn filter-btn-apply"
              onClick={handleFilterSubmit}
            >
              Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableFilter;
