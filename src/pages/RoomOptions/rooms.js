import React, { useState, useMemo } from "react";
import styled from "styled-components";
import RoomComp from "./roomComp";
import { products } from "./data";
import Pagination from "../../components/Pagination";
import CategoryFilter from "../../components/CategoryFilter";

const categories = [
  { id: "shirts", label: "Shirts" },
  { id: "tees", label: "Tees" },
  { id: "hoodies-sweatshirts", label: "Hoodies & Sweatshirts" },
  { id: "tank-tops", label: "Tank Tops" },
  { id: "hats-caps", label: "Hats / Caps" },
  { id: "shortsuits-plays", label: "Shortsuits & Plays" },
  { id: "bold-exclusives", label: "Bold Exclusives" },
  { id: "accessories", label: "Accessories" },
];

const ITEMS_PER_PAGE = 8;

const Rooms = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  console.log("products", products);

  const filteredProducts = useMemo(() => {
    if (selectedCategories.length === 0) {
      return products;
    }
    return products.filter((product) =>
      selectedCategories.includes(product.category)
    );
  }, [selectedCategories]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
    // Reset to first page when filters change
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of products section
    document.querySelector(".rooms__div")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <RoomsContainer>
      <div className="rooms__wrapper">
        <div className="rooms__container">
          <CategoryFilter
            categories={categories}
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
            onClearAll={clearAllFilters}
            title="Filter by Category"
            layout="grid"
            showClearButton={true}
            className="product-filter"
            syncWithURL={true}
          />

          <div className="results__header">
            <h2>
              {selectedCategories.length > 0
                ? `Showing ${filteredProducts.length} products in selected categories`
                : `All Products (${products.length})`}
            </h2>
          </div>

          <div className="rooms__div">
            {paginatedProducts?.map((item, index) => (
              <RoomComp
                key={`${item?.id}-${currentPage}`}
                Image={item?.image}
                spaceId={item?.id}
                amount={item?.price}
                title={item?.name}
                desc={item?.description}
              />
            ))}
          </div>

          {filteredProducts.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={ITEMS_PER_PAGE}
              totalItems={filteredProducts.length}
              showInfo={true}
            />
          )}

          <p>
            Our collections are crafted for trendsetters who want to express
            themselves with confidence. Each piece is designed to be worn
            anywhere — whether you're out with friends, at an event, or just
            catching a vibe. With styles that mix comfort and creativity, our
            brand makes sure you always look and feel your best.
          </p>
        </div>
      </div>
    </RoomsContainer>
  );
};

// ...existing styled component remains the same...
const RoomsContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 40px 24px;

  @media only screen and (max-width: 768px) {
    height: auto;
    padding: 20px 16px;
  }

  @media only screen and (max-width: 480px) {
    padding: 16px 8px;
  }

  .product-filter {
    margin-bottom: 3rem;

    @media only screen and (max-width: 768px) {
      margin-bottom: 2rem;
    }

    @media only screen and (max-width: 480px) {
      margin-bottom: 1.5rem;
    }
  }

  .results__header {
    margin-bottom: 2rem;

    h2 {
      font-family: "Space Grotesk", sans-serif;
      font-size: 2rem;
      font-weight: 500;
      color: #444;
      margin: 0;
      text-align: center;

      @media only screen and (max-width: 768px) {
        font-size: 1.8rem;
      }

      @media only screen and (max-width: 480px) {
        font-size: 1.6rem;
        text-align: left;
      }
    }
  }

  .rooms {
    &__wrapper {
    }
    &__container {
      width: 100%;
      height: 100%;
      margin-top: 7.2rem;

      @media only screen and (max-width: 768px) {
        margin-top: 6rem;
      }

      @media only screen and (max-width: 480px) {
        margin-top: 5rem;
      }
    }

    &__div {
      width: 100%;
      margin-bottom: 2rem;
      margin-top: 4rem;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      min-height: 400px;

      @media only screen and (max-width: 768px) {
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
        margin-top: 3rem;
      }

      @media only screen and (max-width: 480px) {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin-top: 2rem;
        min-height: 300px;
      }
    }
    &__container > p {
      max-width: 100%;
      font-family: "Space Grotesk", sans-serif;
      font-size: 2.2rem;
      font-style: normal;
      font-weight: 400;
      line-height: 48px;
      letter-spacing: 0em;
      text-align: left;
      margin: 4rem;

      @media only screen and (max-width: 768px) {
        font-size: 1.4rem;
        line-height: 36px;
        margin: 3rem 2rem;
      }

      @media only screen and (max-width: 480px) {
        font-size: 1rem;
        line-height: 28px;
        margin: 2rem 1rem;
      }
    }
    &__btnCont {
      height: 4.8rem;
      width: 256px;
      padding: 8px 16px 8px 16px;
      background: #000000;
      margin: 2rem 4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      margin-left: 4rem;
      margin-right: 4rem;

      &:hover {
        .hovered {
          color: #dfc09a;
        }
      }

      @media only screen and (max-width: 768px) {
        margin: 2rem;
        width: calc(100% - 4rem);
        max-width: 256px;
      }

      @media only screen and (max-width: 480px) {
        margin: 1rem;
        width: calc(100% - 2rem);
      }
    }
    &__btnCont > p {
      font-family: "Montserrat", sans-serif;
      font-size: 1.4rem;
      font-style: normal;
      font-weight: 400;
      line-height: 17px;
      letter-spacing: 0em;
      text-align: left;
      color: #fff;
      text-transform: uppercase;
    }
  }
`;

export default Rooms;
