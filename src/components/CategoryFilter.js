import React, { useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

const CategoryFilter = ({
  categories = [],
  selectedCategories = [],
  onCategoryChange,
  onClearAll,
  title = "Filter by Category",
  layout = "grid", // "grid" or "inline"
  showClearButton = true,
  className = "",
  syncWithURL = false, // New prop to enable URL synchronization
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Helper function to convert category name to URL parameter
  const getCategoryParam = (categoryName) => {
    return categoryName.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-");
  };

  // Helper function to convert URL parameter back to category name
  const getCategoryFromParam = (param) => {
    // Find matching category by converting each to param format
    const found = categories.find((cat) => {
      const categoryId = typeof cat === "string" ? cat : cat.id;
      const categoryLabel = typeof cat === "string" ? cat : cat.label;

      // Try matching both ID and converted label
      return categoryId === param || getCategoryParam(categoryLabel) === param;
    });

    if (found) {
      return typeof found === "string" ? found : found.id;
    }

    // Fallback: convert param back to readable format
    return param
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
      .replace(/And/g, "&");
  };

  // Handle URL parameter on component mount
  useEffect(() => {
    if (syncWithURL && location.search) {
      const searchParams = new URLSearchParams(location.search);
      const catParam = searchParams.get("cat");

      if (catParam && onCategoryChange) {
        const categoryId = getCategoryFromParam(catParam);

        // Check if this category exists and isn't already selected
        const categoryExists = categories.some((cat) => {
          const id = typeof cat === "string" ? cat : cat.id;
          return id === categoryId;
        });

        if (categoryExists && !selectedCategories.includes(categoryId)) {
          onCategoryChange(categoryId);
        }
      }
    }
  }, [
    location.search,
    syncWithURL,
    categories,
    selectedCategories,
    onCategoryChange,
  ]);

  const handleCategoryToggle = (categoryId) => {
    if (onCategoryChange) {
      onCategoryChange(categoryId);
    }

    // Update URL if syncWithURL is enabled
    if (syncWithURL) {
      const searchParams = new URLSearchParams(location.search);

      if (selectedCategories.includes(categoryId)) {
        // Removing category - clear URL param if this was the only one
        if (selectedCategories.length === 1) {
          searchParams.delete("cat");
        }
      } else {
        // Adding category - set URL param
        const categoryObj = categories.find((cat) => {
          const id = typeof cat === "string" ? cat : cat.id;
          return id === categoryId;
        });

        if (categoryObj) {
          const label =
            typeof categoryObj === "string" ? categoryObj : categoryObj.label;
          searchParams.set("cat", getCategoryParam(label));
        }
      }

      const newURL = searchParams.toString()
        ? `${location.pathname}?${searchParams.toString()}`
        : location.pathname;

      navigate(newURL, { replace: true });
    }
  };

  const handleClearAll = () => {
    if (onClearAll) {
      onClearAll();
    }

    // Clear URL parameters if syncWithURL is enabled
    if (syncWithURL) {
      const searchParams = new URLSearchParams(location.search);
      searchParams.delete("cat");

      const newURL = searchParams.toString()
        ? `${location.pathname}?${searchParams.toString()}`
        : location.pathname;

      navigate(newURL, { replace: true });
    }
  };

  return (
    <FilterContainer className={`category-filter ${className}`} layout={layout}>
      <div className="filter__header">
        <h3 className="filter__title">{title}</h3>
        {showClearButton && selectedCategories.length > 0 && (
          <button
            className="clear__btn"
            onClick={handleClearAll}
            aria-label={`Clear all filters (${selectedCategories.length} active)`}
          >
            Clear All ({selectedCategories.length})
          </button>
        )}
      </div>

      <div className={`filter__${layout}`}>
        {categories.map((category) => {
          const categoryId =
            typeof category === "string" ? category : category.id;
          const categoryLabel =
            typeof category === "string" ? category : category.label;

          return (
            <label key={categoryId} className="filter__checkbox">
              <input
                type="checkbox"
                checked={selectedCategories.includes(categoryId)}
                onChange={() => handleCategoryToggle(categoryId)}
                aria-describedby={`${categoryId}-label`}
              />
              <span className="checkmark" aria-hidden="true"></span>
              <span className="label__text" id={`${categoryId}-label`}>
                {categoryLabel}
              </span>
            </label>
          );
        })}
      </div>
    </FilterContainer>
  );
};

// ...existing styled component...
const FilterContainer = styled.div`
  max-width: 100%;
  background: #fff;
  border-radius: 12px;
  padding: 2.4rem;
  border: 1px solid rgba(212, 175, 55, 0.2);
  font-family: "Montserrat", sans-serif;

  @media only screen and (max-width: 768px) {
    max-width: 100%;
    padding: 2rem;
    border-radius: 8px;
  }

  @media only screen and (max-width: 480px) {
    padding: 1.6rem;
    border-radius: 0;
  }

  .filter__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1rem;

    @media only screen and (max-width: 480px) {
      margin-bottom: 1.5rem;
    }
  }

  .filter__title {
    font-family: "Space Grotesk", sans-serif;
    font-size: 2.4rem;
    font-weight: 600;
    color: #333;
    margin: 0;

    @media only screen and (max-width: 768px) {
      font-size: 2rem;
    }

    @media only screen and (max-width: 480px) {
      font-size: 1.8rem;
    }
  }

  .clear__btn {
    background: #d4af37;
    color: white;
    border: none;
    padding: 0.8rem 1.6rem;
    border-radius: 8px;
    font-family: "Montserrat", sans-serif;
    font-size: 1.4rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;

    &:hover {
      background: #b8941f;
    }

    &:active {
      transform: translateY(0);
    }

    @media only screen and (max-width: 480px) {
      padding: 0.6rem 1.2rem;
      font-size: 1.3rem;
    }
  }

  /* Grid Layout */
  .filter__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.6rem;

    @media only screen and (max-width: 1024px) {
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1.4rem;
    }

    @media only screen and (max-width: 768px) {
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 1.2rem;
    }

    @media only screen and (max-width: 480px) {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }

  /* Inline Layout */
  .filter__inline {
    display: flex;
    flex-wrap: wrap;
    gap: 1.2rem;

    @media only screen and (max-width: 768px) {
      gap: 1rem;
    }

    @media only screen and (max-width: 480px) {
      gap: 0.8rem;
    }
  }

  .filter__checkbox {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 1.2rem;
    border-radius: 8px;
    transition: all 0.3s ease;
    border: 2px solid transparent;
    background: #fafafa;
    user-select: none;

    &:hover {
      background: #f5f5f5;
      border-color: rgba(212, 175, 55, 0.3);
    }

    &:focus-within {
      outline: 2px solid #d4af37;
      outline-offset: 2px;
    }

    @media only screen and (max-width: 768px) {
      padding: 1rem;
    }

    @media only screen and (max-width: 480px) {
      padding: 0.8rem;
    }

    /* Inline layout specific styles */
    ${(props) =>
      props.layout === "inline" &&
      `
      padding: 0.8rem 1.2rem;
      border-radius: 20px;
      background: #f8f8f8;
      
      @media only screen and (max-width: 768px) {
        padding: 0.6rem 1rem;
      }
      
      @media only screen and (max-width: 480px) {
        padding: 0.5rem 0.8rem;
      }
    `}

    input[type="checkbox"] {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;

      &:focus + .checkmark {
        box-shadow: 0 0 0 2px #d4af37;
      }
    }

    .checkmark {
      width: 2rem;
      height: 2rem;
      border: 2px solid #ddd;
      border-radius: 4px;
      margin-right: 1.2rem;
      position: relative;
      transition: all 0.3s ease;
      flex-shrink: 0;

      &::after {
        content: "";
        position: absolute;
        left: 6px;
        top: 2px;
        width: 6px;
        height: 10px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      @media only screen and (max-width: 480px) {
        width: 1.8rem;
        height: 1.8rem;
        margin-right: 1rem;

        &::after {
          left: 5px;
          top: 1px;
          width: 5px;
          height: 9px;
        }
      }

      /* Inline layout specific styles */
      ${(props) =>
        props.layout === "inline" &&
        `
        width: 1.6rem;
        height: 1.6rem;
        margin-right: 0.8rem;
        
        &::after {
          left: 4px;
          top: 1px;
          width: 5px;
          height: 8px;
        }
        
        @media only screen and (max-width: 480px) {
          width: 1.4rem;
          height: 1.4rem;
          margin-right: 0.6rem;
          
          &::after {
            left: 3px;
            top: 0px;
            width: 4px;
            height: 7px;
          }
        }
      `}
    }

    input[type="checkbox"]:checked + .checkmark {
      background: #d4af37;
      border-color: #d4af37;

      &::after {
        opacity: 1;
      }
    }

    .label__text {
      font-family: "Montserrat", sans-serif;
      font-size: 1.5rem;
      font-weight: 500;
      color: #555;
      line-height: 1.4;

      @media only screen and (max-width: 768px) {
        font-size: 1.4rem;
      }

      @media only screen and (max-width: 480px) {
        font-size: 1.3rem;
      }

      /* Inline layout specific styles */
      ${(props) =>
        props.layout === "inline" &&
        `
        font-size: 1.4rem;
        
        @media only screen and (max-width: 768px) {
          font-size: 1.3rem;
        }
        
        @media only screen and (max-width: 480px) {
          font-size: 1.2rem;
        }
      `}
    }

    input[type="checkbox"]:checked ~ .label__text {
      color: #333;
      font-weight: 600;
    }
  }

  /* Animation for filter changes */
  .filter__grid,
  .filter__inline {
    animation: fadeIn 0.3s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default CategoryFilter;
