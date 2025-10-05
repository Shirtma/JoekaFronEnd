import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { FiCheckCircle, FiMail, FiTruck } from "react-icons/fi";

const OrderSuccessPage = () => {
  const location = useLocation();
  const { orderNumber, total } = location.state || {};

  return (
    <SuccessContainer>
      <div className="container">
        <div className="success-content">
          <div className="success-icon">
            <FiCheckCircle />
          </div>

          <h1>Order Confirmed!</h1>
          <p className="success-message">
            Thank you for your purchase. Your order has been successfully
            placed.
          </p>

          {orderNumber && (
            <div className="order-details">
              <div className="order-number">
                <strong>Order Number: {orderNumber}</strong>
              </div>
              {total && (
                <div className="order-total">
                  Total: ₦{total.toLocaleString()}
                </div>
              )}
            </div>
          )}

          <div className="next-steps">
            <div className="step">
              <FiMail />
              <div>
                <h3>Confirmation Email</h3>
                <p>We've sent a confirmation email with your order details.</p>
              </div>
            </div>

            <div className="step">
              <FiTruck />
              <div>
                <h3>Shipping Updates</h3>
                <p>
                  You'll receive tracking information once your order ships.
                </p>
              </div>
            </div>
          </div>

          <div className="actions">
            <Link to="/shop" className="btn-primary">
              Continue Shopping
            </Link>
            <Link to="/account/orders" className="btn-secondary">
              View Order History
            </Link>
          </div>
        </div>
      </div>
    </SuccessContainer>
  );
};

const SuccessContainer = styled.div`
  font-family: "Montserrat", sans-serif;
  padding-top: 7.2rem;
  min-height: 100vh;
  background: #fafafa;
  display: flex;
  align-items: center;
  justify-content: center;

  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 3rem 2rem;
  }

  .success-content {
    background: white;
    border-radius: 12px;
    padding: 4rem 3rem;
    text-align: center;
    box-shadow: 0 11px 6px rgba(0, 0, 0, 0.08);

    @media (max-width: 768px) {
      padding: 3rem 2rem;
    }
  }

  .success-icon {
    font-size: 8rem;
    color: #28a745;
    margin-bottom: 2rem;
  }

  h1 {
    font-family: "Space Grotesk", sans-serif;
    font-size: 3.2rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
      font-size: 2.4rem;
    }
  }

  .success-message {
    font-size: 1.6rem;
    color: #666;
    margin-bottom: 3rem;
    line-height: 1.6;
  }

  .order-details {
    background: #f8f9fa;
    padding: 2rem;
    border-radius: 8px;
    margin-bottom: 3rem;

    .order-number {
      font-size: 1.8rem;
      color: #333;
      margin-bottom: 1rem;
    }

    .order-total {
      font-size: 1.6rem;
      color: #333;
      font-weight: 600;
    }
  }

  .next-steps {
    margin-bottom: 3rem;

    .step {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      padding: 1.5rem;
      margin-bottom: 1rem;
      text-align: left;

      svg {
        font-size: 2.4rem;
        color: #333;
        flex-shrink: 0;
      }

      h3 {
        font-size: 1.6rem;
        font-weight: 600;
        margin: 0 0 0.5rem 0;
        color: #333;
      }

      p {
        font-size: 1.4rem;
        color: #666;
        margin: 0;
      }
    }
  }

  .actions {
    display: flex;
    gap: 1rem;
    justify-content: center;

    @media (max-width: 480px) {
      flex-direction: column;
    }

    .btn-primary,
    .btn-secondary {
      padding: 1.5rem 2rem;
      border-radius: 8px;
      font-size: 1.4rem;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s ease;
      border: 2px solid transparent;

      @media (max-width: 480px) {
        text-align: center;
      }
    }

    .btn-primary {
      border: 1px solid #0a0a0a;
      background: rgba(245, 236, 225, 0.95);
      color: #0a0a0a;

      &:hover {
        background: rgba(245, 236, 225, 1);
        transform: translateY(-2px);
      }
    }

    .btn-secondary {
      background: transparent;
      color: #0a0a0a;
      border-color: #0a0a0a;

      &:hover {
        background: #f8f8f5;
      }
    }
  }
`;

export default OrderSuccessPage;
