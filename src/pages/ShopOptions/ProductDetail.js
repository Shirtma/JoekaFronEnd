import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import {
  FiArrowLeft,
  FiShoppingCart,
  FiHeart,
  FiShare2,
  FiChevronLeft,
  FiChevronRight,
  FiCheck,
} from "react-icons/fi";
import { products } from "./data";
import { useProductsContext } from "../../context/products_context";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, addToCart } = useProductsContext();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  // const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  // Mock additional data for demo
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  // const colors = [
  //   { name: "Black", code: "#0a0a0a" },
  //   { name: "White", code: "#FFFFFF" },
  //   { name: "Navy", code: "#001f3f" },
  //   { name: "Gray", code: "#808080" },
  // ];

  useEffect(() => {
    const foundProduct = products.find((p) => p.id.toString() === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedSize("M"); 
      // setSelectedColor("Black"); 
    }
    setIsLoading(false);
  }, [id]);

  // Create multiple images using the same image for demo
  const productImages = product
    ? Array(4)
        .fill(product.image)
        .map((img, index) => ({ id: index, url: img }))
    : [];

  // Check if product is already in cart
  const isInCart = cart.some((item) => {
    if (item.id !== product?.id) return false;
    return item.size === selectedSize ;
  });

  // Get cart item if it exists
  const cartItem = cart.find((item) => {
    if (item.id !== product?.id) return null;
    return item.size === selectedSize ;
  });

  // Show notification helper
  const showNotificationMessage = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === productImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
  };

  const handleAddToCart = async () => {
    // Validation
    if (!selectedSize) {
      showNotificationMessage("Please select a size");
      return;
    }

    // if (!selectedColor) {
    //   showNotificationMessage("Please select a color");
    //   return;
    // }

    setIsAddingToCart(true);

    try {
      // Create cart product object
      const cartProduct = {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        category: product.category,
        description: product.description,
        size: selectedSize,
        // color: selectedColor,
        amount: quantity,
      };

      // Add to cart using context
      addToCart(cartProduct);

      // Show success notification
      showNotificationMessage(
        `${product.name} (${selectedSize}, added to cart!`
      );

      // Brief delay for UX feedback
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error("Error adding to cart:", error);
      showNotificationMessage("Failed to add item to cart. Please try again.");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      showNotificationMessage("Please select a size");
      return;
    }

    // if (!selectedColor) {
    //   showNotificationMessage("Please select a color");
    //   return;
    // }

    // Add to cart first if not already in cart
    if (!isInCart) {
      handleAddToCart();
    }

    // Navigate to cart/checkout
    setTimeout(
      () => {
        navigate("/checkout");
      },
      isInCart ? 0 : 1000
    );
  };

  const relatedProducts = products
    .filter((p) => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  if (isLoading) {
    return (
      <LoadingContainer>
        <div className="loading-spinner">Loading...</div>
      </LoadingContainer>
    );
  }

  if (!product) {
    return (
      <NotFoundContainer>
        <h2>Product not found</h2>
        <Link to="/shop">Back to Shop</Link>
      </NotFoundContainer>
    );
  }

  return (
    <ProductDetailContainer>
      {/* Notification Toast */}
      {showNotification && (
        <NotificationToast className={showNotification ? "show" : ""}>
          <div className="notification-content">
            <FiCheck className="notification-icon" />
            <span>{notificationMessage}</span>
          </div>
        </NotificationToast>
      )}

      <div className="container">
        {/* Breadcrumb & Back Button */}
        <div className="breadcrumb">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <FiArrowLeft /> Back
          </button>
          <nav className="breadcrumb-nav">
            <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> /{" "}
            <span>{product.category}</span> / <span>{product.name}</span>
          </nav>
        </div>

        <div className="product-content">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image-container">
              <img
                src={productImages[currentImageIndex]?.url}
                alt={product.name}
                className="main-image"
              />

              {productImages.length > 1 && (
                <>
                  <button
                    className="nav-btn nav-btn-prev"
                    onClick={prevImage}
                    aria-label="Previous image"
                  >
                    <FiChevronLeft />
                  </button>
                  <button
                    className="nav-btn nav-btn-next"
                    onClick={nextImage}
                    aria-label="Next image"
                  >
                    <FiChevronRight />
                  </button>

                  <div className="image-indicators">
                    {productImages.map((_, index) => (
                      <button
                        key={index}
                        className={`indicator ${
                          index === currentImageIndex ? "active" : ""
                        }`}
                        onClick={() => selectImage(index)}
                        aria-label={`View image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {productImages.length > 1 && (
              <div className="thumbnail-container">
                {productImages.map((image, index) => (
                  <button
                    key={image.id}
                    className={`thumbnail ${
                      index === currentImageIndex ? "active" : ""
                    }`}
                    onClick={() => selectImage(index)}
                  >
                    <img
                      src={image.url}
                      alt={`${product.name} thumbnail ${index + 1}`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="product-info">
            <div className="product-header">
              <h1>{product.name}</h1>
              <div className="product-actions">
                <button className="action-btn">
                  <FiHeart />
                </button>
                <button className="action-btn">
                  <FiShare2 />
                </button>
              </div>
            </div>

            <div className="price">
              <span className="current-price">
                ₦{product.price.toLocaleString()}
              </span>
              <span className="original-price">
                ₦{(product.price * 1.2).toLocaleString()}
              </span>
            </div>

            <div className="product-description">
              <p>{product.description}</p>
            </div>

            {/* Size Selection */}
            <div className="size-selection">
              <h3>Size</h3>
              <div className="size-options">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-btn ${
                      selectedSize === size ? "active" : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            {/* <div className="color-selection">
              <h3>Color: {selectedColor}</h3>
              <div className="color-options">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    className={`color-btn ${
                      selectedColor === color.name ? "active" : ""
                    }`}
                    style={{ backgroundColor: color.code }}
                    onClick={() => setSelectedColor(color.name)}
                    title={color.name}
                  />
                ))}
              </div>
            </div> */}

            {/* Quantity */}
            <div className="quantity-selection">
              <h3>Quantity</h3>
              <div className="quantity-controls">
                <button
                  className="qty-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="quantity">{quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="cart-section">
              <button
                className={`add-to-cart-btn ${isInCart ? "in-cart" : ""} ${
                  isAddingToCart ? "loading" : ""
                }`}
                onClick={handleAddToCart}
                disabled={isAddingToCart}
              >
                {isAddingToCart ? (
                  <>
                    <div className="spinner"></div>
                    Adding...
                  </>
                ) : isInCart ? (
                  <>
                    <FiCheck />
                    In Cart ({cartItem?.amount || 0})
                  </>
                ) : (
                  <>
                    <FiShoppingCart />
                    Add to Cart
                  </>
                )}
              </button>

              <button className="buy-now-btn" onClick={handleBuyNow}>
                Buy Now
              </button>

              {isInCart && (
                <Link to="/cart" className="view-cart-btn">
                  <FiShoppingCart />
                  View Cart
                </Link>
              )}
            </div>

            {/* Product Details */}
            <div className="product-details">
              <h3>Product Details</h3>
              <ul>
                <li>100% Premium Cotton</li>
                <li>Machine washable</li>
                <li>Regular fit</li>
                <li>Imported</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="related-products">
            <h2>You might also like</h2>
            <div className="related-grid">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/shop/product/${relatedProduct.id}`}
                  className="related-item"
                >
                  <img src={relatedProduct.image} alt={relatedProduct.name} />
                  <h4>{relatedProduct.name}</h4>
                  <p>₦{relatedProduct.price.toLocaleString()}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </ProductDetailContainer>
  );
};

const NotificationToast = styled.div`
  position: fixed;
  top: 100px;
  right: 20px;
  background: #4caf50;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  transform: translateX(400px);
  opacity: 0;
  transition: all 0.3s ease;
  max-width: 300px;
  word-wrap: break-word;

  @media (max-width: 480px) {
    right: 10px;
    left: 10px;
    max-width: calc(100% - 20px);
    transform: translateY(-100px);
    top: 80px;
  }

  &.show {
    transform: translateX(0);
    opacity: 1;

    @media (max-width: 480px) {
      transform: translateY(0);
    }
  }

  .notification-content {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-family: "Montserrat", sans-serif;
    font-size: 1.4rem;
    line-height: 1.4;

    @media (max-width: 480px) {
      font-size: 1.3rem;
    }
  }

  .notification-icon {
    font-size: 1.6rem;
    flex-shrink: 0;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  font-family: "Montserrat", sans-serif;
`;

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
  font-family: "Space Grotesk", sans-serif;

  h2 {
    margin-bottom: 2rem;
    color: #333;
  }

  a {
    color: #f8f8f5;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ProductDetailContainer = styled.div`
  font-family: "Montserrat", sans-serif;
  padding-top: 5.2rem;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    width: 100%;
    box-sizing: border-box;

    @media (max-width: 1240px) {
      max-width: calc(100vw - 40px);
      padding: 2rem 2rem;
    }

    @media (max-width: 768px) {
      padding: 1.5rem 1rem;
      max-width: calc(100vw - 20px);
    }

    @media (max-width: 480px) {
      padding: 1rem 0.8rem;
      max-width: calc(100vw - 16px);
    }
  }

  .breadcrumb {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;
    flex-wrap: wrap;
    gap: 1rem;
    width: 100%;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 2rem;
      gap: 0.8rem;
    }

    @media (max-width: 480px) {
      margin-bottom: 1.5rem;
    }
  }

  .back-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: transparent;
    border: 1px solid #e0e0e0;
    padding: 0.8rem 1.6rem;
    border-radius: 8px;
    cursor: pointer;
    font-family: "Montserrat", sans-serif;
    transition: all 0.3s ease;
    white-space: nowrap;

    &:hover {
      background: #f8f8f5;
    }

    @media (max-width: 480px) {
      padding: 0.6rem 1.2rem;
      font-size: 0.9rem;
    }
  }

  .breadcrumb-nav {
    font-size: 1.4rem;
    color: #555;
    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 768px) {
      font-size: 1.2rem;
      width: 100%;
    }

    @media (max-width: 480px) {
      font-size: 1.1rem;
    }

    a {
      color: #b8941f;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    span {
      color: #333;
    }
  }

  .product-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    margin-bottom: 5rem;
    width: 100%;
    max-width: 100%;

    @media (max-width: 1024px) {
      gap: 3rem;
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 2rem;
      margin-bottom: 3rem;
    }

    @media (max-width: 480px) {
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
  }

  .product-images {
    width: 100%;
    max-width: 100%;

    .main-image-container {
      position: relative;
      margin-bottom: 1rem;
      border-radius: 12px;
      overflow: hidden;
      background: #f9f9f9;
      width: 100%;

      @media (max-width: 480px) {
        border-radius: 8px;
      }

      .main-image {
        width: 100%;
        height: 400px;
        object-fit: cover;
        display: block;

        @media (max-width: 1024px) {
          height: 350px;
        }

        @media (max-width: 768px) {
          height: 300px;
        }

        @media (max-width: 480px) {
          height: 250px;
        }
      }

      .nav-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: #f5f5f5f3;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        color: #555;
        z-index: 2;

        @media (max-width: 480px) {
          width: 32px;
          height: 32px;
        }

        &:hover {
          background: #f5f5f5;
          transform: translateY(-50%) scale(1.1);
        }

        svg {
          font-size: 20px;

          @media (max-width: 480px) {
            font-size: 16px;
          }
        }

        &.nav-btn-prev {
          left: 10px;
        }

        &.nav-btn-next {
          right: 10px;
        }
      }

      .image-indicators {
        position: absolute;
        bottom: 15px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 8px;
        z-index: 2;

        @media (max-width: 480px) {
          bottom: 10px;
          gap: 6px;
        }

        .indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: all 0.3s ease;

          @media (max-width: 480px) {
            width: 6px;
            height: 6px;
          }

          &.active {
            background: #f8f8f5;
            transform: scale(1.2);
          }

          &:hover {
            background: rgba(212, 175, 55, 0.8);
          }
        }
      }
    }

    .thumbnail-container {
      display: flex;
      gap: 10px;
      overflow-x: auto;
      padding-bottom: 5px;

      @media (max-width: 480px) {
        gap: 8px;
      }

      &::-webkit-scrollbar {
        height: 4px;
      }

      &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 2px;
      }

      &::-webkit-scrollbar-thumb {
        background: #f8f8f5;
        border-radius: 2px;
      }

      .thumbnail {
        flex-shrink: 0;
        width: calc(25% - 7.5px);
        min-width: 80px;
        border: 2px solid transparent;
        border-radius: 8px;
        overflow: hidden;
        cursor: pointer;
        transition: all 0.3s ease;
        background: none;
        padding: 0;

        @media (max-width: 768px) {
          width: calc(25% - 6px);
          min-width: 70px;
        }

        @media (max-width: 480px) {
          border-radius: 6px;
          min-width: 60px;
        }

        &:hover {
          border-color: #e0e0e0;
          transform: scale(1.05);
        }

        &.active {
          border-color: #e0e0e0;
          transform: scale(1.05);
        }

        img {
          width: 100%;
          height: 80px;
          object-fit: cover;
          display: block;

          @media (max-width: 480px) {
            height: 60px;
          }
        }
      }
    }
  }
  .product-info {
    width: 100%;
    max-width: 100%;

    .product-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 2rem;
      gap: 1rem;

      @media (max-width: 480px) {
        margin-bottom: 1.5rem;
      }

      h1 {
        font-family: "Space Grotesk", sans-serif;
        font-size: 3.2rem;
        font-weight: 600;
        color: #333;
        margin: 0;
        flex: 1;
        word-break: break-word;
        line-height: 1.2;

        @media (max-width: 1024px) {
          font-size: 2.8rem;
        }

        @media (max-width: 768px) {
          font-size: 2.4rem;
        }

        @media (max-width: 480px) {
          font-size: 2rem;
        }
      }

      .product-actions {
        display: flex;
        gap: 1rem;
        flex-shrink: 0;

        @media (max-width: 480px) {
          gap: 0.8rem;
        }

        .action-btn {
          width: 40px;
          height: 40px;
          border: 1px solid #ddd;
          background: transparent;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;

          @media (max-width: 480px) {
            width: 36px;
            height: 36px;
          }

          &:hover {
            background: #f8f8f5;
            color: white;
            border-color: #f8f8f5;
          }
        }
      }
    }

    .price {
      margin-bottom: 2rem;

      @media (max-width: 480px) {
        margin-bottom: 1.5rem;
      }

      .current-price {
        font-size: 2.8rem;
        font-weight: 600;
        color: #333;
        margin-right: 1rem;

        @media (max-width: 768px) {
          font-size: 2.4rem;
        }

        @media (max-width: 480px) {
          font-size: 2rem;
          margin-right: 0.8rem;
        }
      }

      .original-price {
        font-size: 2rem;
        color: #555;
        text-decoration: line-through;

        @media (max-width: 768px) {
          font-size: 1.8rem;
        }

        @media (max-width: 480px) {
          font-size: 1.6rem;
        }
      }
    }

    .product-description {
      margin-bottom: 3rem;

      @media (max-width: 768px) {
        margin-bottom: 2rem;
      }

      @media (max-width: 480px) {
        margin-bottom: 1.5rem;
      }

      p {
        font-size: 1.6rem;
        line-height: 1.6;
        color: #666;

        @media (max-width: 768px) {
          font-size: 1.5rem;
        }

        @media (max-width: 480px) {
          font-size: 1.4rem;
          line-height: 1.5;
        }
      }
    }

    .size-selection,
    .color-selection,
    .quantity-selection {
      margin-bottom: 2.5rem;

      @media (max-width: 768px) {
        margin-bottom: 2rem;
      }

      @media (max-width: 480px) {
        margin-bottom: 1.5rem;
      }

      h3 {
        font-size: 1.8rem;
        font-weight: 600;
        margin-bottom: 1rem;
        color: #555;

        @media (max-width: 768px) {
          font-size: 1.6rem;
        }

        @media (max-width: 480px) {
          font-size: 1.5rem;
          margin-bottom: 0.8rem;
        }
      }
    }

    .size-options {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;

      @media (max-width: 480px) {
        gap: 0.8rem;
      }

      .size-btn {
        width: 50px;
        height: 50px;
        border: 1px solid #e0e0e0;
        background: transparent;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
        font-size: 1.4rem;

        @media (max-width: 480px) {
          width: 45px;
          height: 45px;
          font-size: 1.3rem;
        }

        &:hover {
          border-color: rgba(245, 236, 225, 0.95);
        }

        &.active {
          background: #f5f5f5;
          border-color: rgba(245, 236, 225, 0.95);
        }
      }
    }

    .color-options {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;

      @media (max-width: 480px) {
        gap: 0.8rem;
      }

      .color-btn {
        width: 40px;
        height: 40px;
        border: 3px solid transparent;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;

        @media (max-width: 480px) {
          width: 36px;
          height: 36px;
          border-width: 2px;
        }

        &.active {
          border-color: rgba(245, 236, 225, 0.95);
          transform: scale(1.1);
        }

        &:hover {
          transform: scale(1.05);
        }
      }
    }

    .quantity-controls {
      display: flex;
      align-items: center;
      gap: 1rem;

      @media (max-width: 480px) {
        gap: 0.8rem;
      }

      .qty-btn {
        width: 40px;
        height: 40px;
        border: 1px solid #e0e0e0;
        background: transparent;
        border-radius: 8px;
        cursor: pointer;
        font-size: 1.8rem;
        font-weight: 600;
        transition: all 0.3s ease;

        @media (max-width: 480px) {
          width: 36px;
          height: 36px;
          font-size: 1.6rem;
        }

        &:hover {
          background: #f5f5f5;
          border-color: rgba(245, 236, 225, 0.95);
        }
      }

      .quantity {
        font-size: 1.8rem;
        font-weight: 600;
        min-width: 40px;
        text-align: center;

        @media (max-width: 480px) {
          font-size: 1.6rem;
          min-width: 36px;
        }
      }
    }

    .cart-section {
      display: flex;
      gap: 1rem;
      margin-bottom: 3rem;
      width: 100%;
      flex-wrap: wrap;

      @media (max-width: 768px) {
        margin-bottom: 2rem;
      }

      @media (max-width: 480px) {
        flex-direction: column;
        gap: 0.8rem;
        margin-bottom: 1.5rem;
      }

      .add-to-cart-btn,
      .buy-now-btn,
      .view-cart-btn {
        flex: 1;
        padding: 1.5rem 2rem;
        border-radius: 8px;
        font-size: 1.6rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.8rem;
        white-space: nowrap;
        min-height: 50px;
        text-decoration: none;
        position: relative;
        overflow: hidden;

        @media (max-width: 768px) {
          padding: 1.2rem 1.5rem;
          font-size: 1.5rem;
        }

        @media (max-width: 480px) {
          padding: 1rem 1.2rem;
          font-size: 1.4rem;
          gap: 0.6rem;
          flex: none;
        }

        &:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      }

      .add-to-cart-btn {
        border: 1px solid #0a0a0a;
        background: rgba(245, 236, 225, 0.95);
        color: #0a0a0a;

        &:hover:not(:disabled) {
          background: rgba(245, 236, 225, 1);
          transform: translateY(-2px);
        }

        &.in-cart {
          background: #4caf50;
          color: white;
          border-color: #4caf50;

          &:hover {
            background: #45a049;
          }
        }

        &.loading {
          pointer-events: none;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid transparent;
          border-top: 2px solid currentColor;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @media (max-width: 480px) {
          &:hover {
            transform: none;
          }
        }
      }

      .buy-now-btn {
        border: 1px solid #0a0a0a;
        background: #0a0a0a;
        color: white;

        &:hover {
          background: #333;
          transform: translateY(-2px);
        }

        @media (max-width: 480px) {
          &:hover {
            transform: none;
            background: #333;
          }
        }
      }

      .view-cart-btn {
        background: transparent;
        border: 1px solid #666;
        color: #666;
        flex: 0 0 auto;
        min-width: 140px;

        &:hover {
          background: #f5f5f5;
          border-color: #333;
          color: #333;
        }

        @media (max-width: 480px) {
          min-width: auto;
        }
      }
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    .product-details {
      h3 {
        font-size: 1.8rem;
        font-weight: 600;
        margin-bottom: 1rem;
        color: #333;

        @media (max-width: 768px) {
          font-size: 1.6rem;
        }

        @media (max-width: 480px) {
          font-size: 1.5rem;
          margin-bottom: 0.8rem;
        }
      }

      ul {
        list-style: none;
        padding: 0;

        li {
          padding: 0.5rem 0;
          border-bottom: 1px solid #eee;
          font-size: 1.4rem;
          color: #666;

          @media (max-width: 480px) {
            font-size: 1.3rem;
            padding: 0.4rem 0;
          }

          &:last-child {
            border-bottom: none;
          }
        }
      }
    }
  }

  .related-products {
    width: 100%;
    max-width: 100%;

    h2 {
      font-family: "Space Grotesk", sans-serif;
      font-size: 2.8rem;
      font-weight: 600;
      margin-bottom: 2rem;
      text-align: center;
      color: #333;

      @media (max-width: 768px) {
        font-size: 2.4rem;
        margin-bottom: 1.5rem;
      }

      @media (max-width: 480px) {
        font-size: 2rem;
        margin-bottom: 1rem;
        text-align: left;
      }
    }

    .related-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, max-content));
      gap: 2rem;
      width: 100%;

      @media (max-width: 1024px) {
        grid-template-columns: repeat(auto-fit, minmax(220px, max-content));
        gap: 1.5rem;
      }

      @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fit, minmax(200px, max-content));
        gap: 1.2rem;
      }

      @media (max-width: 480px) {
        grid-template-columns: repeat(auto-fit, minmax(150px, max-content));
        gap: 1rem;
      }

      .related-item {
        text-decoration: none;
        color: inherit;
        border-radius: 12px;
        overflow: hidden;
        transition: transform 0.3s ease;
        width: 100%;
        box-sizing: border-box;

        @media (max-width: 480px) {
          border-radius: 8px;
        }

        &:hover {
          transform: translateY(-4px);

          @media (max-width: 480px) {
            transform: translateY(-2px);
          }
        }

        img {
          width: 100%;
          height: 200px;
          object-fit: cover;

          @media (max-width: 768px) {
            height: 180px;
          }

          @media (max-width: 480px) {
            height: 150px;
          }
        }

        h4 {
          font-size: 1.6rem;
          font-weight: 600;
          margin: 1rem 0 0.5rem;
          color: #333;
          padding: 0 0.5rem;
          word-break: break-word;

          @media (max-width: 768px) {
            font-size: 1.5rem;
            margin: 0.8rem 0 0.4rem;
          }

          @media (max-width: 480px) {
            font-size: 1.4rem;
            margin: 0.6rem 0 0.3rem;
          }
        }

        p {
          font-size: 1.4rem;
          color: #f8f8f5;
          font-weight: 600;
          margin: 0;
          padding: 0 0.5rem 0.5rem;

          @media (max-width: 768px) {
            font-size: 1.3rem;
          }

          @media (max-width: 480px) {
            font-size: 1.2rem;
          }
        }
      }
    }
  }
`;

export default ProductDetail;
