import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { FiUser, FiPackage} from "react-icons/fi";
import ProfileTab from "./components/ProfileTab";
import OrdersTab from "./components/OrdersTab";

const AccountPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get active tab from URL or default to profile
  const getActiveTabFromUrl = () => {
    const path = location.pathname;
    if (path.includes("/account/orders")) return "orders";
    return "profile";
  };

  const [activeTab, setActiveTab] = useState(getActiveTabFromUrl());

  // Update tab when URL changes
  useEffect(() => {
    setActiveTab(getActiveTabFromUrl());
  }, [location.pathname]);

  // Handle tab change and update URL
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    const newPath = tab === "profile" ? "/account" : `/account/${tab}`;
    navigate(newPath, { replace: true });
  };

  const tabs = [
    {
      id: "profile",
      label: "Profile",
      icon: FiUser,
    },
    {
      id: "orders",
      label: "Order History",
      icon: FiPackage,
    },
  ];

  return (
    <AccountContainer>
      <div className="container">
        <div className="account-header">
          <h1>My Account</h1>
          <p>Manage your profile and view your order history</p>
        </div>

        <div className="account-content">
          {/* Tab Navigation */}
          <div className="tab-navigation">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => handleTabChange(tab.id)}
              >
                <tab.icon />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === "profile" && <ProfileTab />}
            {activeTab === "orders" && <OrdersTab />}
          </div>
        </div>
      </div>
    </AccountContainer>
  );
};

const AccountContainer = styled.div`
  font-family: "Montserrat", sans-serif;
  padding-top: 7.2rem;
  min-height: 100vh;
  background: #fafafa;

  .container {
    max-width: 100%;
    margin: 0;
    padding: 3rem 2rem;

    @media (max-width: 768px) {
      padding: 2rem 1rem;
    }
  }

  .account-header {
    text-align: left;
    margin-bottom: 3rem;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 3rem;

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

    p {
      font-size: 1.6rem;
      color: #666;
      margin: 0;
    }
  }

  .account-content {
    background: white;
    border-radius: 0;
    box-shadow: none;
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    overflow: hidden;
    max-width: 1200px;
    margin: 0 auto;
  }

  .tab-navigation {
    display: flex;
    border-bottom: 1px solid #e0e0e0;
    background: white;

    @media (max-width: 480px) {
      flex-direction: column;
    }

    .tab-button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.8rem;
      padding: 2rem 3rem;
      border: none;
      background: transparent;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 1.4rem;
      font-weight: 500;
      color: #666;
      min-width: 200px;

      @media (max-width: 480px) {
        justify-content: flex-start;
        padding: 1.5rem 2rem;
        min-width: auto;
      }

      svg {
        font-size: 2rem;
      }

      &:hover {
        background: #f8f9fa;
        color: #333;
      }

      &.active {
        background: #f8f9fa;
        color: #d4af37;
        border-bottom: 3px solid #d4af37;
        font-weight: 600;

        @media (max-width: 480px) {
          border-bottom: none;
          border-left: 4px solid #d4af37;
        }
      }
    }
  }

  .tab-content {
    padding: 4rem 3rem;
    background: white;

    @media (max-width: 768px) {
      padding: 3rem 2rem;
    }

    @media (max-width: 480px) {
      padding: 2rem 1rem;
    }
  }
`;

export default AccountPage;
