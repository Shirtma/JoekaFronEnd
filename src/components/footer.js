import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Icon from "./icon";
import logo from "../images/JOEKA.png";
import brandColours from "../lib/colours";

function Footer() {
  const currentDate = new Date();
  const [newsletter, setNewsletter] = useState({
    email: "",
    isLoading: false,
    isSubmitted: false,
    error: "",
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { value } = e.target;
    setNewsletter((prev) => ({
      ...prev,
      email: value,
      error: "",
    }));
  };

  // Handle form submission
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newsletter.email.trim()) {
      setNewsletter((prev) => ({ ...prev, error: "Email is required" }));
      return;
    }
    if (!emailRegex.test(newsletter.email)) {
      setNewsletter((prev) => ({
        ...prev,
        error: "Please enter a valid email address",
      }));
      return;
    }

    setNewsletter((prev) => ({ ...prev, isLoading: true, error: "" }));

    try {
      // Simulate API call - replace with actual endpoint
      const response = await fetch(
        `${process.env.REACT_APP_API_URL || ""}/newsletter/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: newsletter.email }),
        }
      );

      if (response.ok) {
        setNewsletter({
          email: "",
          isLoading: false,
          isSubmitted: true,
          error: "",
        });

        // Reset success message after 5 seconds
        setTimeout(() => {
          setNewsletter((prev) => ({ ...prev, isSubmitted: false }));
        }, 5000);
      } else {
        throw new Error("Subscription failed");
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setNewsletter((prev) => ({
        ...prev,
        isLoading: false,
        error: "Something went wrong. Please try again.",
      }));
    }
  };

  return (
    <FooterContainer>
      <div className="footer__container">
        <div className="app__links">
          <div className="app__links-col1">
            <Link to="/shop">BOLD EXCLUSIVES</Link>
            <Link to="/shop">ACCESSORIES</Link>
            <Link to="/shop">OUR STYLE</Link>
          </div>
          <div className="app__links-col2">
            <Link to="/about">ABOUT US</Link>
            <Link to="/contact">PAY A VISIT</Link>
            <Link to="/contact">CONTACT US</Link>
          </div>

          <form className="call-to-action" onSubmit={handleNewsletterSubmit}>
            <p>
              Subscribe to hear the latest about events, news and activities
              from Joeka Inc
            </p>
            {newsletter.isSubmitted && (
              <div className="success-message">
                <p>✅ Thank you for subscribing! We'll keep you updated.</p>
              </div>
            )}
            {newsletter.error && (
              <div className="error-message">
                <p>❌ {newsletter.error}</p>
              </div>
            )}
            <span className="subscription__form">
              <input
                name="subscribe"
                id="subscribe"
                type="email"
                className="subscription__form-input"
                placeholder="Enter your email"
                value={newsletter.email}
                onChange={handleInputChange}
                disabled={newsletter.isLoading || newsletter.isSubmitted}
                required
              />
              <button
                type="submit"
                className="subscription__form-btn"
                disabled={newsletter.isLoading || newsletter.isSubmitted}
              >
                {newsletter.isLoading ? (
                  <span className="loading-spinner">⏳ SUBSCRIBING...</span>
                ) : newsletter.isSubmitted ? (
                  "✓ SUBSCRIBED"
                ) : (
                  "SUBSCRIBE"
                )}
              </button>
            </span>
          </form>
        </div>

        <div className="copy-right">
          <span className="logo">
            <Link to="/">
              <img src={logo} alt="JOEKA INC" />
            </Link>
          </span>
          <span className="name">
            &copy; {currentDate.getFullYear()} JOEKA INC
          </span>
          <div className="social__links">
            <Link
              to={{ pathname: "https://www.instagram.com/JoekaInc" }}
              target="_blank"
            >
              <Icon Name="Instagram" height="24px" width="24px" />
            </Link>
            <Link
              to={{ pathname: "https://www.twitter.com/JoekaInc" }}
              target="_blank"
            >
              <Icon Name="Twitter" height="24px" width="24px" />
            </Link>
            <Link
              to={{
                pathname: "https://www.linkedin.com/company/Joeka-inc",
              }}
              target="_blank"
            >
              <Icon Name="LinkdIn" height="24px" width="24px" />
            </Link>
          </div>
        </div>
      </div>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  background-color: #f8f8f5;
  // border-top: 1px solid #0a0a0a;

  .footer__container {
    padding: 40px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    .app__links {
      width: 100%;
      display: flex;
      justify-content: space-between;

      @media (max-width: 768px) {
        flex-direction: column;
        gap: 12px;
        margin-bottom: 0;
      }

      a {
        color: ${brandColours.primarygrey900};
        margin: 5px 0;
        text-decoration: none;
        font-size: 17px;
      }

      > div {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
    }

    .call-to-action {
      text-align: center;

      p {
        font-size: 14px;
        margin-bottom: 10px;
        text-align: left;
      }

      .success-message,
      .error-message {
        margin: 10px 0;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 13px;

        p {
          margin: 0;
          text-align: center;
          font-weight: 500;
        }
      }

      .success-message {
        background-color: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
      }

      .error-message {
        background-color: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
      }

      .subscription__form {
        display: flex;
        flex-direction: column;

        @media (min-width: 768px) {
          flex-direction: row;
        }

        &-input {
          padding: 10px;
          margin-bottom: 10px;
          border: 1px solid ${brandColours.primarygrey300};
          border-radius: 4px;
          font-size: 14px;
          transition: all 0.3s ease;

          &:focus {
            outline: none;
            border-color: ${brandColours.primarygrey900};
            box-shadow: 0 0 0 2px rgba(10, 10, 10, 0.1);
          }

          &:disabled {
            background-color: #f8f9fa;
            cursor: not-allowed;
            opacity: 0.7;
          }

          @media (min-width: 768px) {
            margin-bottom: 0;
            margin-right: 10px;
            flex: 1;
          }
        }

        &-btn {
          padding: 10px 16px;
          background-color: ${brandColours.primarygrey900};
          color: ${brandColours.defaultwhite};
          border: none;
          cursor: pointer;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.3s ease;
          min-height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;

          &:hover:not(:disabled) {
            background-color: #000;
            transform: translateY(-1px);
          }

          &:disabled {
            cursor: not-allowed;
            opacity: 0.7;
            transform: none;
          }

          .loading-spinner {
            display: flex;
            align-items: center;
            gap: 5px;
          }

          @media (min-width: 768px) {
            min-width: 120px;
          }
        }
      }
    }

    .copy-right {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      @media (max-width: 768px) {
        flex-direction: column;
        gap: 12px;
        align-items: flex-start;
      }

      .logo img {
        width: 150px;
        height: auto;
      }

      .social__links {
        display: flex;
        justify-content: center;
      }
    }
  }
`;

export default Footer;
