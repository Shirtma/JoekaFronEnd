import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  FiPackage,
  FiEye,
  FiTruck,
  FiCheck,
  FiClock,
  FiX,
} from "react-icons/fi";

const OrdersTab = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Mock orders data (replace with API call)
  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data
        const mockOrders = [
          {
            id: "ORD001",
            orderNumber: "JK1642234567890",
            date: "2024-01-15",
            status: "delivered",
            total: 105625,
            items: [
              {
                id: 1,
                name: "Premium T-Shirt",
                image: "/api/placeholder/60/60",
                size: "Large",
                color: "Red",
                quantity: 2,
                price: 25000,
              },
              {
                id: 2,
                name: "Hoodie",
                image: "/api/placeholder/60/60",
                size: "Medium",
                color: "Blue",
                quantity: 1,
                price: 45000,
              },
            ],
            shippingAddress: {
              name: "John Doe",
              address: "123 Main Street",
              city: "Lagos",
              state: "Lagos",
              country: "Nigeria",
            },
            trackingNumber: "JK123456789",
          },
          {
            id: "ORD002",
            orderNumber: "JK1642234567891",
            date: "2024-01-10",
            status: "processing",
            total: 75000,
            items: [
              {
                id: 3,
                name: "Tank Top",
                image: "/api/placeholder/60/60",
                size: "Medium",
                color: "White",
                quantity: 3,
                price: 15000,
              },
            ],
            shippingAddress: {
              name: "John Doe",
              address: "123 Main Street",
              city: "Lagos",
              state: "Lagos",
              country: "Nigeria",
            },
            trackingNumber: null,
          },
          {
            id: "ORD003",
            orderNumber: "JK1642234567892",
            date: "2024-01-05",
            status: "cancelled",
            total: 30000,
            items: [
              {
                id: 4,
                name: "Cap",
                image: "/api/placeholder/60/60",
                size: "One Size",
                color: "Black",
                quantity: 2,
                price: 15000,
              },
            ],
            shippingAddress: {
              name: "John Doe",
              address: "123 Main Street",
              city: "Lagos",
              state: "Lagos",
              country: "Nigeria",
            },
            trackingNumber: null,
          },
        ];

        setOrders(mockOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Get status info
  const getStatusInfo = (status) => {
    const statusMap = {
      pending: { color: "#ffc107", icon: FiClock, text: "Pending" },
      processing: { color: "#17a2b8", icon: FiPackage, text: "Processing" },
      shipped: { color: "#fd7e14", icon: FiTruck, text: "Shipped" },
      delivered: { color: "#28a745", icon: FiCheck, text: "Delivered" },
      cancelled: { color: "#dc3545", icon: FiX, text: "Cancelled" },
    };
    return statusMap[status] || statusMap.pending;
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <OrdersContainer>
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading your orders...</p>
        </div>
      </OrdersContainer>
    );
  }

  if (orders.length === 0) {
    return (
      <OrdersContainer>
        <div className="empty-orders">
          <FiPackage className="empty-icon" />
          <h3>No orders yet</h3>
          <p>
            You haven't placed any orders. Start shopping to see your orders
            here.
          </p>
          <button
            className="shop-btn"
            onClick={() => (window.location.href = "/shop")}
          >
            Start Shopping
          </button>
        </div>
      </OrdersContainer>
    );
  }

  return (
    <OrdersContainer>
      <div className="orders-header">
        <h2>Order History</h2>
        <p>View and track your orders</p>
      </div>

      <div className="orders-list">
        {orders.map((order) => {
          const statusInfo = getStatusInfo(order.status);
          const StatusIcon = statusInfo.icon;

          return (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>Order #{order.orderNumber}</h3>
                  <p className="order-date">
                    Placed on {formatDate(order.date)}
                  </p>
                </div>

                <div className="order-status">
                  <div
                    className="status-badge"
                    style={{ backgroundColor: statusInfo.color }}
                  >
                    <StatusIcon />
                    {statusInfo.text}
                  </div>
                </div>
              </div>

              <div className="order-items">
                {order.items.slice(0, 2).map((item) => (
                  <div key={item.id} className="order-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <p>
                        Size: {item.size} | Color: {item.color}
                      </p>
                      <p>Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
                {order.items.length > 2 && (
                  <div className="more-items">
                    +{order.items.length - 2} more item
                    {order.items.length - 2 !== 1 ? "s" : ""}
                  </div>
                )}
              </div>

              <div className="order-footer">
                <div className="order-total">
                  <span>Total: ₦{order.total.toLocaleString()}</span>
                </div>

                <button
                  className="view-details-btn"
                  onClick={() => setSelectedOrder(order)}
                >
                  <FiEye />
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderModal>
          <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Order #{selectedOrder.orderNumber}</h3>
                <button
                  className="close-btn"
                  onClick={() => setSelectedOrder(null)}
                >
                  <FiX />
                </button>
              </div>

              <div className="modal-body">
                <div className="order-summary">
                  <div className="summary-row">
                    <span>Order Date:</span>
                    <span>{formatDate(selectedOrder.date)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Status:</span>
                    <span
                      className="status-text"
                      style={{
                        color: getStatusInfo(selectedOrder.status).color,
                      }}
                    >
                      {getStatusInfo(selectedOrder.status).text}
                    </span>
                  </div>
                  {selectedOrder.trackingNumber && (
                    <div className="summary-row">
                      <span>Tracking Number:</span>
                      <span className="tracking-number">
                        {selectedOrder.trackingNumber}
                      </span>
                    </div>
                  )}
                </div>

                <div className="items-section">
                  <h4>Items Ordered</h4>
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="modal-item">
                      <img src={item.image} alt={item.name} />
                      <div className="item-details">
                        <h5>{item.name}</h5>
                        <p>
                          Size: {item.size} | Color: {item.color}
                        </p>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                      <div className="item-price">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="shipping-section">
                  <h4>Shipping Address</h4>
                  <div className="address">
                    <p>{selectedOrder.shippingAddress.name}</p>
                    <p>{selectedOrder.shippingAddress.address}</p>
                    <p>
                      {selectedOrder.shippingAddress.city},{" "}
                      {selectedOrder.shippingAddress.state}
                    </p>
                    <p>{selectedOrder.shippingAddress.country}</p>
                  </div>
                </div>

                <div className="total-section">
                  <div className="total-row">
                    <span>Order Total:</span>
                    <span className="total-amount">
                      ₦{selectedOrder.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </OrderModal>
      )}
    </OrdersContainer>
  );
};

const OrdersContainer = styled.div`
  .orders-header {
    margin-bottom: 2rem;

    h2 {
      font-family: "Space Grotesk", sans-serif;
      font-size: 2.4rem;
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

  .loading {
    text-align: center;
    padding: 4rem 0;

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #d4af37;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 2rem;
    }

    p {
      font-size: 1.6rem;
      color: #666;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }

  .empty-orders {
    text-align: center;
    padding: 4rem 0;

    .empty-icon {
      font-size: 6rem;
      color: #ddd;
      margin-bottom: 2rem;
    }

    h3 {
      font-family: "Space Grotesk", sans-serif;
      font-size: 2.4rem;
      color: #333;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1.6rem;
      color: #666;
      margin-bottom: 2rem;
    }

    .shop-btn {
      background: #0a0a0a;
      color: white;
      border: none;
      padding: 1.2rem 2rem;
      border-radius: 8px;
      font-size: 1.4rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: #000;
        transform: translateY(-1px);
      }
    }
  }

  .orders-list {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .order-card {
    background: #f8f9fa;
    border-radius: 12px;
    padding: 2rem;
    border: 1px solid #e0e0e0;
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }

  .order-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1.5rem;

    @media (max-width: 480px) {
      flex-direction: column;
      gap: 1rem;
    }

    .order-info {
      h3 {
        font-size: 1.8rem;
        font-weight: 600;
        margin: 0 0 0.5rem 0;
        color: #333;
      }

      .order-date {
        font-size: 1.4rem;
        color: #666;
        margin: 0;
      }
    }

    .status-badge {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: white;
      padding: 0.8rem 1.2rem;
      border-radius: 20px;
      font-size: 1.3rem;
      font-weight: 600;
    }
  }

  .order-items {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;

    .order-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      background: white;
      padding: 1rem;
      border-radius: 8px;
      flex: 1;
      min-width: 200px;

      img {
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 6px;
      }

      .item-info {
        h4 {
          font-size: 1.4rem;
          margin: 0 0 0.3rem 0;
          color: #333;
        }

        p {
          font-size: 1.2rem;
          color: #666;
          margin: 0.2rem 0;
        }
      }
    }

    .more-items {
      display: flex;
      align-items: center;
      justify-content: center;
      background: white;
      padding: 1rem;
      border-radius: 8px;
      font-size: 1.3rem;
      color: #666;
      font-weight: 500;
      min-width: 120px;
    }
  }

  .order-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1.5rem;
    border-top: 1px solid #e0e0e0;

    @media (max-width: 480px) {
      flex-direction: column;
      gap: 1rem;
      align-items: flex-start;
    }

    .order-total {
      font-size: 1.6rem;
      font-weight: 600;
      color: #333;
    }

    .view-details-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: #0a0a0a;
      color: white;
      border: none;
      padding: 1rem 1.5rem;
      border-radius: 6px;
      font-size: 1.3rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: #000;
        transform: translateY(-1px);
      }
    }
  }
`;

const OrderModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;

  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .modal-content {
    background: white;
    border-radius: 12px;
    max-width: 600px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    border-bottom: 1px solid #e0e0e0;

    h3 {
      font-family: "Space Grotesk", sans-serif;
      font-size: 2rem;
      font-weight: 600;
      margin: 0;
      color: #333;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 2rem;
      cursor: pointer;
      color: #666;
      padding: 0.5rem;
      border-radius: 50%;
      transition: all 0.3s ease;

      &:hover {
        background: #f8f9fa;
        color: #333;
      }
    }
  }

  .modal-body {
    padding: 2rem;
  }

  .order-summary {
    margin-bottom: 2rem;

    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      font-size: 1.4rem;

      &:first-child span:first-child {
        font-weight: 600;
        color: #333;
      }

      .status-text {
        font-weight: 600;
      }

      .tracking-number {
        font-family: monospace;
        background: #f8f9fa;
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
      }
    }
  }

  .items-section,
  .shipping-section {
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #e0e0e0;

    h4 {
      font-size: 1.6rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #333;
    }

    .modal-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 8px;

      img {
        width: 60px;
        height: 60px;
        object-fit: cover;
        border-radius: 6px;
      }

      .item-details {
        flex: 1;

        h5 {
          font-size: 1.4rem;
          margin: 0 0 0.3rem 0;
          color: #333;
        }

        p {
          font-size: 1.2rem;
          color: #666;
          margin: 0.2rem 0;
        }
      }

      .item-price {
        font-size: 1.4rem;
        font-weight: 600;
        color: #333;
      }
    }

    .address p {
      font-size: 1.4rem;
      margin: 0.3rem 0;
      color: #333;
    }
  }

  .total-section {
    .total-row {
      display: flex;
      justify-content: space-between;
      font-size: 1.8rem;
      font-weight: 700;
      color: #333;

      .total-amount {
        color: #d4af37;
      }
    }
  }
`;

export default OrdersTab;
