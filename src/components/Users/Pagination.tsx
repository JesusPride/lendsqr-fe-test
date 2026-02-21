import React from "react";
import "./Pagination.scss";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  // Calculate pagination display values
  // const startItem = (currentPage - 1) * itemsPerPage + 1;
  // const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getVisiblePages = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <div className="pagination-info">
        <span>Showing</span>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="items-per-page-select"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <span>out of {totalItems}</span>
      </div>

      <div className="pagination-controls">
        <button
          className="pagination-btn pagination-prev"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M9.49 2.45L8.05 1L2.05 7L8.05 13L9.49 11.55L4.94 7L9.49 2.45Z"
              fill="currentColor"
            />
          </svg>
        </button>

        <div className="pagination-pages">
          {getVisiblePages().map((page, index) => (
            <React.Fragment key={index}>
              {page === "..." ? (
                <span className="pagination-ellipsis">...</span>
              ) : (
                <button
                  className={`pagination-page ${
                    currentPage === page ? "active" : ""
                  }`}
                  onClick={() => onPageChange(page as number)}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        <button
          className="pagination-btn pagination-next"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M4.51 11.55L5.95 13L11.95 7L5.95 1L4.51 2.45L9.06 7L4.51 11.55Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
