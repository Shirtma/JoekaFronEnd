import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import colours from 'lib/colours';
import Icon from './icon';
import logo from 'images/thehouse-logo.png';

function Footer() {
  return (
    <FooterContainer>
      <div className="footer__container">
        <div className="app__links">
          <div className="app__links-col1">
            <Link to="/rooms">SPACES</Link>
            <Link to="/restaurant">RESTAURANT</Link>
            <Link to="/">PLAYLISTS & EVENTS</Link>
          </div>
          <div className="app__links-col2">
            <Link to="/about">ABOUT US</Link>
            <Link to="/contact">PAY A VISIT</Link>
            <Link to="/contact">CONTACT US</Link>
          </div>
        </div>

        <div className="social__links">
          <Link
            to={{ pathname: 'https://www.instagram.com/thehouselagos' }}
            target="_blank"
          >
            <Icon
              Name="Instagram"
              colour="transparent"
              height="24px"
              width="24px"
              style={{ marginRight: '10px' }}
            />
            <span>INSTAGRAM</span>
          </Link>
          <Link
            to={{ pathname: 'https://www.twitter.com/thehouselagos' }}
            className="footer__socials"
            target="_blank"
          >
            <Icon
              Name="Twitter"
              colour="transparent"
              height="24px"
              width="24px"
              style={{ marginRight: '10px' }}
            />
            <span>TWITTER</span>
          </Link>
          <Link
            to={{
              pathname: 'https://www.linkedin.com/company/the-house-lagos',
            }}
            className="footer__socials"
            target="_blank"
          >
            <Icon
              Name="LinkdIn"
              colour="transparent"
              height="24px"
              width="24px"
              style={{ marginRight: '10px' }}
            />
            <span>LINKEDIN</span>
          </Link>
        </div>

        <form className="call-to-action" onSubmit={() => false}>
          <p>
            Subscribe to hear the latest about events, news and
            activities from The House
          </p>

          <span className="subscription__form">
            <label htmlFor="subscribe" className="subscription__form-label">
              Email Address
            </label>
            <input
              name="subscribe"
              id="subscribe"
              type="email"
              className="subscription__form-input"
              width="22.8rem"
              placeholder="Email address"
              // error="Please enter a valid email address"
              required
            />
            <button type="submit" className="subscription__form-btn">
              <span>SUBSCRIBE</span>
              <Icon
                Name="ArrowRightWhite"
                colour="transparent"
                height="24px"
                width="24px"
              />
            </button>
          </span>
        </form>

        <div className="copy-right">
          <span className="logo">
            <Link to="/">
              <img src={logo} alt="The House NG" width="128px" height="19.91px" />
            </Link>
          </span>
          <span className="name">&copy; THE HOUSE</span>
          <span className="year">2021</span>
        </div>
      </div>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  background-color: #f5ece1;

  .footer__container {
    padding: 40px 24px;

    @media (min-width: 768px) {
      display: grid;
      grid-template: repeat(3, minmax(50px, auto)) / repeat(12, 1fr);
    }

    @media (min-width: 1024px) {
      grid-template: repeat(2, minmax(50px, auto)) / repeat(12, 1fr);
      padding: 40px;
    }

    .app__links {
      grid-column: 1 / -1;
      display: grid;
      grid-template: repeat(1, auto) / repeat(12, 1fr);

      @media (min-width: 768px) {
        grid-row: 1 / 2;
        grid-column: 1 / 8;
      }

      @media (min-width: 1024px) {
        grid-column: 1 / 6;
      }

      &-col1 {
        grid-column: 1 / 6;
        @media (min-width: 768px) {
          grid-column:  1 / 8;
        }
      }

      &-col2 {
        grid-column: 6 / -1;
          @media (min-width: 768px) {
          grid-column: 8 / -1;
        }
      }

      &-col1, &-col2 {
        display: flex;
        flex-direction: column;
        column-gap: 16px;
      }
    }
    .social__links {
      grid-row: 2 / 4;
      grid-column: 1 / -1;
      display: flex;
      flex-direction: column;
      @media (min-width: 768px) {
        grid-row: 1 / 2;
        grid-column:  8 / -1;
      }
      @media (min-width: 1024px) {
        grid-column: 6 / 9;
      }
    }
    .app__links, .social__links {
      a {
          height: 48px;
          color: ${colours.primarygrey900};
          display: flex;
          align-items: center;
        }
    }

    .call-to-action {
        grid-row: 4 / 5;
        grid-column: 1 / -1;
        margin: 24px 0 40px;
        display: flex;
        flex-direction: column;
        column-gap: 16px;
        width: 295px;
        p {
          color: ${colours.primarygrey900};
          padding-right: 20px;
          font-size: 16px;
          margin-bottom: 29px;

          @media (min-width: 1024px) {
            grid-column: 1 / 12;
          }
        }

        /* Input field and label container element */
      .subscription__form {
          /* Input label */
          &-label {
            font-weight: 300;
            font-size: 14px;
            line-height: 17px;
            @media (min-width: 1024px){
              grid-row: 1 / 2;
              grid-column: 1 / -1;
            }
          }

        /* Input field */
        &-input {
          min-width: 100%;
          height: 48px;
          padding: 8px 0 8px 8px;
          border: 0;
          margin: 0 0 8px 0;
          border-radius: 0;
          outline: 0;
          ::placeholder {
            color: ${colours.primarygrey300}
          }
          @media (min-width: 768px) {
            width: 100% !important;
            grid-row: 2 / 3;
            grid-column: 1 / 6;
          }

          @media (min-width: 1024px) {
            grid-row: 2 / 3;
            grid-column: 1 / 9;
            /* width: 228px; */
          }
        }
        /* Subscribe button */
        &-btn {
          border: 0;
          background-color: ${colours.primarygrey900};
          color: ${colours.defaultwhite};
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          font-size: 14px;
          font-weight: 400;
          width: 100%;
          cursor: pointer;

          @media (min-width: 1024px) {
            grid-row: 2 / 3;
            grid-column: 9 / -1;
          }
        }
        @media (min-width: 1024px) {
            grid-column: 1 / -1;
            grid-row: 2 / 3;
            display: grid;
            grid-template: repeat(2, auto) / repeat(12, 1fr);
          }
        }

        @media (min-width: 768px) {
          grid-row: 2 / 3;
          grid-column: 1 / -1;
          width: 100%;
        }

        @media (min-width: 1024px) {
          margin: 0;
          grid-row: 1 / 2;
          grid-column: 9 / -1;
          display: grid;
          grid-template: repeat(2, minmax(50px, auto)) / repeat(12, 1fr);
      }
    }

    .copy-right {
      width: 295px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      img {
        width: 128px;
        height: 19.91px;
      }
      @media (min-width: 768px){
        width: 100% !important;
        grid-column: 1 / -1;
      }
      @media (min-width: 1024px) {
        margin-top: 40px;
        display: grid;
        grid-template: 1 auto / 12 1fr;

        .logo {
          grid-column: 1 / 5;
        }

        .name {
          grid-column: 5 / 7;
            margin-left: -60px;
        }
        .year {
          grid-column: 7 / 12;
            text-align: right;
        }
      }
    }
  }
`;

export default Footer;
