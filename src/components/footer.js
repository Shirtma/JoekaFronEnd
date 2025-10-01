import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Icon from "./icon";
import logo from "../images/JOEKA.png";
import brandColours from "../lib/colours";

function Footer() {
  const currentDate = new Date();
  return (
    <FooterContainer>
      <div className="footer__container">
        <div className="app__links">
          <div className="app__links-col1">
            <Link to="/shop">TOPS</Link>
            <Link to="/shop">THE MEN</Link>
            <Link to="/shop">OUR STYLE</Link>
          </div>
          <div className="app__links-col2">
            <Link to="/about">ABOUT US</Link>
            <Link to="/contact">PAY A VISIT</Link>
            <Link to="/contact">CONTACT US</Link>
          </div>

          <form className="call-to-action" onSubmit={() => false}>
            <p>
              Subscribe to hear the latest about events, news and activities
              from The House
            </p>
            <span className="subscription__form">
              <input
                name="subscribe"
                id="subscribe"
                type="email"
                className="subscription__form-input"
                placeholder="Enter your email"
                required
              />
              <button type="submit" className="subscription__form-btn">
                SUBSCRIBE
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
              to={{ pathname: "https://www.instagram.com/thehouselagos" }}
              target="_blank"
            >
              <Icon Name="Instagram" height="24px" width="24px" />
            </Link>
            <Link
              to={{ pathname: "https://www.twitter.com/thehouselagos" }}
              target="_blank"
            >
              <Icon Name="Twitter" height="24px" width="24px" />
            </Link>
            <Link
              to={{
                pathname: "https://www.linkedin.com/company/the-house-lagos",
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
  background-color: #f5ece1;

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

          @media (min-width: 768px) {
            margin-bottom: 0;
            margin-right: 10px;
          }
        }

        &-btn {
          padding: 10px;
          background-color: ${brandColours.primarygrey900};
          color: ${brandColours.defaultwhite};
          border: none;
          cursor: pointer;
          border-radius: 4px;
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
