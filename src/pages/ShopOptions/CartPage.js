import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import {
  FiMinus,
  FiPlus,
  FiTrash2,
  FiShoppingBag,
  FiArrowRight,
} from "react-icons/fi";
import { useProductsContext } from "../../context/products_context";

const CartPage = () => {
  const { cart, total, quantity, removeFromCart, toggleAmount, clearCart } =
    useProductsContext();

  const navigate = useNavigate();

  // Helper function to get the correct cart item ID
  const getCartItemId = (item) => {
    if (item.cartId) {
      return item.cartId;
    }
    // If no cartId, create one using the old system structure
    const size = item.selectedSize || item.size || "default";
    // const color = item.selectedColor || item.color || "default";
    return `${item.id}-${size}`;
  };

  const handleQuantityChange = (item, type) => {
    const cartId = getCartItemId(item);
    toggleAmount(cartId, type);
  };

  const handleRemoveItem = (item) => {
    const cartId = getCartItemId(item);
    removeFromCart(cartId);
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      clearCart();
    }
  };

  const handleCheckout = () => {
    // Navigate to checkout page
    navigate("/checkout");
  };

  if (cart.length === 0) {
    return (
      <CartContainer>
        <div className="container">
          <div className="empty-cart">
            <FiShoppingBag className="empty-icon" />
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <Link to="/shop" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <div className="container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <span className="cart-count">
            ({quantity} {quantity === 1 ? "item" : "items"})
          </span>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            <div className="cart-table-header desktop-only">
              <div className="col-product">Product</div>
              <div className="col-price">Price</div>
              <div className="col-quantity">Quantity</div>
              <div className="col-total">Total</div>
              <div className="col-remove"></div>
            </div>

            {cart.map((item) => {
              const cartItemId = getCartItemId(item);
              return (
                <div key={cartItemId} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="item-details">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-category">{item.category}</p>

                    {(item.size || item.selectedSize) && (
                      <div className="item-options">
                        <span className="option">
                          Size: {item.size || item.selectedSize}
                        </span>
                      </div>
                    )}

                    {/* {(item.color || item.selectedColor) && (
                      <div className="item-options">
                        <span className="option">
                          Color: {item.color || item.selectedColor}
                        </span>
                      </div>
                    )} */}

                    <div className="mobile-price mobile-only">
                      ₦{item.price.toLocaleString()}
                    </div>
                  </div>

                  <div className="mobile-right-section mobile-only">
                    <div className="item-quantity">
                      <div className="quantity-controls">
                        <button
                          className="qty-btn"
                          onClick={() => handleQuantityChange(item, "dec")}
                          disabled={item.amount <= 1}
                          aria-label="Decrease quantity"
                        >
                          <FiMinus />
                        </button>
                        <span className="quantity-display">{item.amount}</span>
                        <button
                          className="qty-btn"
                          onClick={() => handleQuantityChange(item, "inc")}
                          aria-label="Increase quantity"
                        >
                          <FiPlus />
                        </button>
                      </div>
                    </div>

                    <div className="item-total">
                      ₦{(item.price * item.amount).toLocaleString()}
                    </div>

                    <div className="item-remove">
                      <button
                        className="remove-btn"
                        onClick={() => handleRemoveItem(item)}
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>

                  <div className="item-price desktop-only">
                    ₦{item.price.toLocaleString()}
                  </div>

                  <div className="item-quantity desktop-only">
                    <div className="quantity-controls">
                      <button
                        className="qty-btn"
                        onClick={() => handleQuantityChange(item, "dec")}
                        disabled={item.amount <= 1}
                        aria-label="Decrease quantity"
                      >
                        <FiMinus />
                      </button>
                      <span className="quantity-display">{item.amount}</span>
                      <button
                        className="qty-btn"
                        onClick={() => handleQuantityChange(item, "inc")}
                        aria-label="Increase quantity"
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>

                  <div className="item-total desktop-only">
                    ₦{(item.price * item.amount).toLocaleString()}
                  </div>

                  <div className="item-remove desktop-only">
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveItem(item)}
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="cart-actions">
              <Link to="/shop" className="continue-shopping">
                Continue Shopping
              </Link>
              <button className="clear-cart-btn" onClick={handleClearCart}>
                Clear Cart
              </button>
            </div>
          </div>

          <div className="cart-summary">
            <div className="summary-card">
              <h3>Order Summary</h3>

              <div className="summary-row">
                <span>
                  Subtotal ({quantity} {quantity === 1 ? "item" : "items"})
                </span>
                <span>₦{total.toLocaleString()}</span>
              </div>

              <div className="summary-row">
                <span>Shipping</span>
                <span>It Supposed to be free</span>
              </div>

              <div className="summary-row">
                {/* <span>Tax</span>
                <span>Calculated at checkout</span> */}
              </div>

              <div className="summary-divider"></div>

              <div className="summary-total">
                <span>Total</span>
                <span>₦{total.toLocaleString()}</span>
              </div>

              <button className="checkout-btn" onClick={handleCheckout}>
                Proceed to Checkout
                <FiArrowRight />
              </button>

              <div className="security-badges">
                {/* <p>🔒 Secure Checkout</p>
                <p>✓ Free Returns</p>
                <p>🚚 Free Shipping on orders over ₦50,000</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CartContainer>
  );
};

const CartContainer = styled.div`
  font-family: "Montserrat", sans-serif;
  padding-top: 1.2rem;
  min-height: 100vh;
  background: #fafafa;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem 2rem;

    @media (max-width: 768px) {
      padding: 2rem 1rem;
    }
  }

  .cart-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 3rem;
    flex-wrap: wrap;

    h1 {
      font-family: "Space Grotesk", sans-serif;
      font-size: 3.2rem;
      font-weight: 600;
      color: #333;
      margin: 0;

      @media (max-width: 768px) {
        font-size: 2.4rem;
      }
    }

    .cart-count {
      font-size: 1.6rem;
      color: #666;
      font-weight: 500;
    }
  }

  .empty-cart {
    text-align: center;
    padding: 8rem 2rem;

    .empty-icon {
      font-size: 8rem;
      color: #ddd;
      margin-bottom: 2rem;
    }

    h2 {
      font-family: "Space Grotesk", sans-serif;
      font-size: 2.8rem;
      color: #333;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1.6rem;
      color: #666;
      margin-bottom: 3rem;
    }

    .continue-shopping-btn {
      padding: 1.5rem 2rem;
      border-radius: 8px;
      font-size: 1.6rem;
      font-weight: 600;
      cursor: pointer;
      text-align: center;
      border: 1px solid #0a0a0a;
      background: rgba(245, 236, 225, 0.95);
      color: #0a0a0a;
      transition: all 0.3s ease;

      &:hover:not(:disabled) {
        background: rgba(245, 236, 225, 1);
        transform: translateY(-2px);
      }
    }
  }

  .cart-content {
    display: grid;
    grid-template-columns: 1fr 350px;
    gap: 4rem;

    @media (max-width: 992px) {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
  }

  .cart-items {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  }

  .cart-table-header {
    width: 100%;
    display: grid;
    place-items: center;
    grid-template-columns: 2fr 1fr 1fr 1fr 20px;
    gap: 2rem;
    padding: 1rem 0;
    border-bottom: 2px solid #f0f0f0;
    font-weight: 600;
    color: #333;
    font-size: 1.4rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .cart-item {
    display: grid;
    grid-template-columns: 100px 2fr 1fr 1fr 1fr 60px;
    gap: 2rem;
    align-items: center;
    padding: 2rem 0;
    border-bottom: 1px solid #f0f0f0;

    &:last-child {
      border-bottom: none;
    }

    @media (max-width: 768px) {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 1.5rem;
      gap: 1rem;
      border: 1px solid #f0f0f0;
      border-radius: 8px;
      margin-bottom: 1rem;
      background: #fff;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .item-image {
    @media (max-width: 768px) {
      flex-shrink: 0;
    }

    img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 8px;

      @media (max-width: 768px) {
        width: 80px;
        height: 80px;
      }
    }
  }

  .item-details {
    @media (max-width: 768px) {
      flex: 1;
      text-align: left;
      margin-right: 1rem;
    }

    .item-name {
      font-size: 1.6rem;
      font-weight: 600;
      color: #333;
      margin: 0 0 0.5rem 0;
      line-height: 1.4;

      @media (max-width: 768px) {
        font-size: 1.4rem;
        margin: 0 0 0.3rem 0;
      }
    }

    .item-category {
      font-size: 1.3rem;
      color: #666;
      margin: 0 0 0.5rem 0;
      text-transform: capitalize;

      @media (max-width: 768px) {
        font-size: 1.2rem;
        margin: 0 0 0.3rem 0;
      }
    }

    .item-options {
      margin: 0.3rem 0;

      .option {
        font-size: 1.2rem;
        color: #888;
        background: #f5f5f5;
        padding: 0.2rem 0.6rem;
        border-radius: 4px;
        margin-right: 0.5rem;

        @media (max-width: 768px) {
          font-size: 1rem;
          padding: 0.1rem 0.4rem;
        }
      }
    }

    .mobile-price {
      font-size: 1.8rem;
      font-weight: 600;
      color: #333;
      margin-top: 1rem;

      @media (max-width: 768px) {
        display: none; /* Hide since we'll show price in the right section */
      }
    }
  }

  .mobile-right-section {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.8rem;
    flex-shrink: 0;
  }

  .item-price {
    font-size: 1.6rem;
    font-weight: 600;
    color: #333;
  }

  .item-quantity {
    @media (max-width: 768px) {
      flex-shrink: 0;
    }

    .quantity-controls {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 0.5rem;

      @media (max-width: 768px) {
        padding: 0.3rem;
        gap: 0.3rem;
      }

      .qty-btn {
        width: 36px;
        height: 36px;
        border: none;
        background: transparent;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;

        @media (max-width: 768px) {
          width: 28px;
          height: 28px;
        }

        &:hover:not(:disabled) {
          background: #f0f0f0;
        }

        &:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        svg {
          font-size: 1.4rem;

          @media (max-width: 768px) {
            font-size: 1.2rem;
          }
        }
      }

      .quantity-display {
        font-size: 1.6rem;
        font-weight: 600;
        min-width: 40px;
        text-align: center;

        @media (max-width: 768px) {
          font-size: 1.4rem;
          min-width: 30px;
        }
      }
    }
  }

  .item-total {
    font-size: 1.6rem;
    font-weight: 600;
    color: #333;

    @media (max-width: 768px) {
      font-size: 1.4rem;
      flex-shrink: 0;
      margin-left: 0.5rem;
    }
  }

  .item-remove {
    @media (max-width: 768px) {
      flex-shrink: 0;
      margin-left: 0.5rem;
    }

    .remove-btn {
      width: 40px;
      height: 40px;
      border: 1px solid #ff4444;
      background: transparent;
      border-radius: 8px;
      color: #ff4444;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;

      @media (max-width: 768px) {
        width: 32px;
        height: 32px;
      }

      &:hover {
        background: #ff4444;
        color: white;
      }

      svg {
        font-size: 1.6rem;

        @media (max-width: 768px) {
          font-size: 1.4rem;
        }
      }
    }
  }

  .cart-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 2px solid #f0f0f0;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 1rem;
    }

    .continue-shopping {
      color: #333;
      text-decoration: none;
      font-weight: 600;
      font-size: 1.4rem;

      &:hover {
        text-decoration: underline;
      }
    }

    .clear-cart-btn {
      background: transparent;
      border: 1px solid #ff4444;
      color: #ff4444;
      padding: 1rem 2rem;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s ease;

      &:hover {
        background: #ff4444;
        color: white;
      }
    }
  }

  .cart-summary {
    .summary-card {
      background: white;
      border-radius: 12px;
      padding: 2.5rem;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
      position: sticky;
      top: 2rem;

      h3 {
        font-family: "Space Grotesk", sans-serif;
        font-size: 2.2rem;
        font-weight: 600;
        color: #333;
        margin: 0 0 2rem 0;
      }

      .summary-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        font-size: 1.4rem;

        &:first-of-type span:first-child {
          color: #333;
          font-weight: 500;
        }

        &:not(:first-of-type) span:first-child {
          color: #666;
        }

        span:last-child {
          font-weight: 600;
          color: #333;
        }
      }

      .summary-divider {
        height: 1px;
        background: #e0e0e0;
        margin: 2rem 0;
      }

      .summary-total {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.8rem;
        font-weight: 700;
        color: #333;
        margin-bottom: 2.5rem;
      }

      .checkout-btn {
        width: 100%;
        border: 1px solid #0a0a0a;
        background: rgba(245, 236, 225, 0.95);
        color: #0a0a0a;
        padding: 1.8rem 2rem;
        border-radius: 8px;
        font-size: 1.6rem;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        transition: all 0.3s ease;
        margin-bottom: 2rem;

        &:hover {
          background: rgba(245, 236, 225, 1);
          transform: translateY(-2px);
        }

        svg {
          font-size: 1.8rem;
        }
      }

      .security-badges {
        text-align: center;

        p {
          font-size: 1.2rem;
          color: #666;
          margin: 0.5rem 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
      }
    }
  }

  /* Responsive utilities */
  .desktop-only {
    display: grid;

    @media (max-width: 768px) {
      display: none;
    }
  }

  .mobile-only {
    display: none;

    @media (max-width: 768px) {
      display: flex;
    }
  }
`;

export default CartPage;
