import React from "react";
import styled from "styled-components";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage = 10,
  totalItems = 0,
  showInfo = true,
}) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalPages <= 1) return null;

  return (
    <PaginationContainer>
      {showInfo && (
        <div className="pagination__info">
          <span>
            Showing {startItem}-{endItem} of {totalItems} products
          </span>
        </div>
      )}

      <div className="pagination__controls">
        <button
          className="pagination__btn pagination__btn--prev"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <FiChevronLeft />
          <span className="btn__text">Previous</span>
        </button>

        <div className="pagination__numbers">
          {getVisiblePages().map((page, index) => (
            <React.Fragment key={index}>
              {page === "..." ? (
                <span className="pagination__dots">...</span>
              ) : (
                <button
                  className={`pagination__number ${
                    page === currentPage ? "active" : ""
                  }`}
                  onClick={() => handlePageChange(page)}
                  aria-label={`Go to page ${page}`}
                  aria-current={page === currentPage ? "page" : undefined}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        <button
          className="pagination__btn pagination__btn--next"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <span className="btn__text">Next</span>
          <FiChevronRight />
        </button>
      </div>
    </PaginationContainer>
  );
};

const PaginationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin: 4rem 0;
  font-family: "Montserrat", sans-serif;

  .pagination__info {
    span {
      font-size: 1.4rem;
      color: #666;
      font-weight: 500;
    }
  }

  .pagination__controls {
    display: flex;
    align-items: center;
    gap: 1rem;

    @media only screen and (max-width: 768px) {
      gap: 0.5rem;
    }
  }

  .pagination__btn {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 1rem 1.6rem;
    border: 2px solid #e1e1e1;
    background: white;
    color: #555;
    border-radius: 8px;
    font-family: "Montserrat", sans-serif;
    font-size: 1.4rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover:not(:disabled) {
      border-color: #d4af37;
      color: #d4af37;
      transform: translateY(-1px);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }

    .btn__text {
      @media only screen and (max-width: 480px) {
        display: none;
      }
    }

    svg {
      font-size: 1.6rem;
    }

    @media only screen and (max-width: 768px) {
      padding: 0.8rem 1.2rem;
      gap: 0.6rem;
    }

    @media only screen and (max-width: 480px) {
      padding: 1rem;
      min-width: 4rem;
      justify-content: center;
    }
  }

  .pagination__numbers {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    @media only screen and (max-width: 480px) {
      gap: 0.3rem;
    }
  }

  .pagination__number {
    width: 4rem;
    height: 4rem;
    border: 2px solid #e1e1e1;
    background: white;
    color: #555;
    border-radius: 8px;
    font-family: "Montserrat", sans-serif;
    font-size: 1.4rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      border-color: #d4af37;
      color: #d4af37;
      transform: translateY(-1px);
    }

    &.active {
      background: #d4af37;
      border-color: #d4af37;
      color: white;
      transform: translateY(-1px);
    }

    @media only screen and (max-width: 768px) {
      width: 3.6rem;
      height: 3.6rem;
      font-size: 1.3rem;
    }

    @media only screen and (max-width: 480px) {
      width: 3.2rem;
      height: 3.2rem;
      font-size: 1.2rem;
    }
  }

  .pagination__dots {
    padding: 0 0.8rem;
    color: #999;
    font-weight: 600;
    display: flex;
    align-items: center;
    height: 4rem;

    @media only screen and (max-width: 768px) {
      height: 3.6rem;
      padding: 0 0.6rem;
    }

    @media only screen and (max-width: 480px) {
      height: 3.2rem;
      padding: 0 0.4rem;
    }
  }

  @media only screen and (max-width: 768px) {
    margin: 3rem 0;
    gap: 1.5rem;
  }

  @media only screen and (max-width: 480px) {
    margin: 2rem 0;
    gap: 1rem;
  }
`;

export default Pagination;
