import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Icon from '../icon';

function CheckoutNavbar() {
  return (
    <NavContainer>
      <div className="nav-center">
        <div className="nav-cont">
          <div className="nav-header">
            <Link to="/">
              <Icon Name="LightTheHouseLogo" height="22.4px" width="144px" />
            </Link>
          </div>
        </div>
        <div className="nav-user">
          <Icon
            Name="Lock"
            colour="transparent"
            width="20px"
            style={{ paddingLeft: '8px' }}
          />
          <p>SECURE PAYMENT</p>
        </div>
      </div>
    </NavContainer>
  );
}

const NavContainer = styled.nav`
  position: sticky;
  top: 0;
  z-index: 100;
  .nav-center {
    display: flex;
    align-items: center;
    background-color: #333333;
    padding: 16px 14px 16px;
  }

  .nav-cont {
    display: flex;
    flex-grow: 1;
  }

    .nav-user {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-width: 15.2rem;
      width: fit-content;
      background: #4d4d4d;
      padding: 0 4px;
      height: 32px;
      border-radius: 32px;

      p {
        font-family: Rubik;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 14px;
        letter-spacing: 0em;
        text-align: left;
        color: #dfc09a;
        padding-right: 8px;
      }
    }

  @media (min-width: 768px) {
    .nav-center {
      padding: 24px 40px;
    }
  }
`;

export default CheckoutNavbar;
