import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { zIndexes } from 'util/constants';
import { links } from '../../util/constants';
import LinkButton from '../../components/linkButton';
import colours from '../../lib/colours';
import Icon from '../icon';
import { useProductsContext } from '../../context/products_context';
import useWindowScroll from 'hooks/useWindowScroll';

function Navbar() {
  const [isHover, setIsHover] = useState(false);
  const {
    openSideBar,
    cart,
    quantity,
    total,
    openTakeoutSideBar,
    openProfileSideBar,
    headerNavThemeName
  } = useProductsContext();

  // const { isAuthenticated } = useUserContext();
  const [ scroll ] = useWindowScroll();

  return (
    <NavContainer
      className={
        `${scroll <= 50 ? 'transparent' : 'opaque'} ${headerNavThemeName}`
      }>
      <div className="container">
        <div className="container__inner">
          <div className="container__inner-homebtn">
            <Link to="/">
              <Icon
                Name={headerNavThemeName === "dark-theme" ? "LightTheHouseLogo" : "DarkTheHouseLogo"}
                width="144px"
                height="22.4px"
              />
            </Link>
            <button type="button" className="nav-toggle" onClick={openSideBar}>
              <Icon
                Name="List"
                colour={colours.neutral1}
                height='40px'
                width='40px'
              />
            </button>
          </div>

          <div className="container__inner-links">
            {links.map((link) => {
              const { id, text, url } = link;
              return (
                <Link key={id} to={url}>{text}</Link>
              );
            })}
          </div>
        </div>
        <div className="container__cta">
          {!localStorage.user && (<Link to="/login">SIGN IN</Link>)}
          {!window.location.href.includes('ordertakeout') && cart.length === 0 ? (
            <LinkButton
              to="/restaurant/ordertakeout"
              label="ORDER A TAKEOUT!"
              className="btn"
            />
          ) : (
            <button
              className="cartBtn__cont"
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
              onClick={openTakeoutSideBar}
            >
              <Icon
                Name={ isHover ? 'CartDark' : 'Cart' }
                height='24px'
                width='24px'
              />
              <p className="lead bold quantity">{ quantity }</p>
              <p className="lead summation">
                <span>&#8358;</span>
                <span>
                  { total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') }
                </span>
              </p>
            </button>
          )}
          {localStorage.user && (
            <Icon
              Name="Home"
              colour={headerNavThemeName === "dark-theme" ? "#FFF" : '#333'}
              onClick={openProfileSideBar}
              style={{ cursor: 'pointer', marginLeft: '30.25px' }}
            />
          )}
        </div>
      </div>
    </NavContainer>
  );
}

const NavContainer = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    box-shadow: none;
  }
  position: sticky;
  top: 0px;
  z-index: ${zIndexes.stepper};
  transition: all 0.3s ease-in-out;

  &.opaque {
    background-color: #FCF9F5;
  }
  &.transparent {
    background-color: transparent;
  }
  &.dark-theme {
    background-color: transparent;
    .container__inner-homebtn svg {
      color: #FFFF;
    }
    .container__inner a, .container__cta a {
      color: #FFFF;
    }
  }
  .container {
    padding: 16.96px 16px;
    @media (min-width: 1024px) {
      display: grid;
      grid-template: repeat(1, 48px) / repeat(12, 1fr);
      padding: 12px 40px;
    }

    &__inner {
      @media (min-width: 1024px) {
        grid-column: 1 / 9;
        display: grid;
        grid-template: repeat(1, 48px) / repeat(12, 1fr);
      }

      &-homebtn {
        display: none;
        display: flex;
        align-items: center;
        width: 100%;

        .nav-toggle {
          display: block;
          margin-left: auto;
          background-color: transparent;
          border: 0;
          @media (min-width: 1024px) {
            display: none;
          }
        }
      }

      &-links {
        display: none;
        margin-left: 24px;
        @media (min-width: 1024px) {
          display: flex;
          align-items: center;
          a {
            margin-right: 24px;
            font-size: 13px;
            color: ${colours.primarygrey900};
          }
        }
      }
    }
    /* Call to action button (sign in / order takeout) */
    &__cta {
      display: none;
      grid-column: 9 / 13;
      @media (min-width: 1024px) {
        position: relative;
        z-index: ${zIndexes.lay};
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 12px 0px;
      }
      & > a {
        color: ${colours.primarygrey900};
        font-weight: 300;
        font-size: 13px;
        line-height: 16px;
      }
      .btn {
        min-width: 159px;
        margin-left: 24px;
        background-color: #000000;
        .LinkButton__text {
          color: #FFFFFF;
          font-size: 13px;
        }
      }
    }
  }
  .cartBtn__cont {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px 12px;
    gap: 8px;
    width: fit-content;
    min-width: 148px;
    height: 42px;
    background: #000000;
    border: 0;
    border-radius: 40px;
    margin-left: 16px;
    font-family: 'Space Grotesk';
    transition: all 0.2s ease-in-out;
    cursor: pointer;

    .quantity {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4px;
      width: fit-content;
      height: fit-content;
      min-width: 26px;
      min-height: 26px;
      background: #DFC09A;
      border-radius: 40px;
      font-weight: 600;
      font-size: 14px;
      line-height: 18px;
      color: #FFFFFF;
    }
    .summation {
      font-weight: 600;
      font-size: 14px;
      line-height: 18px;
      color: #FFFFFF;
    }
    &:hover {
      background-color: #FFFFFF;
      color: #000000;
      .summation {
        color: #000000;
      }
    }
  }
`;

export default Navbar;
