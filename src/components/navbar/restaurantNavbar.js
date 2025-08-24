import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../images/light.png';
import { links } from '../../util/constants';
import Button from '../button';
import colours from '../../lib/colours';
import Icon from '../icon';
import { useProductsContext } from '../../context/products_context';
// import { useUserContext } from "../../context/user_context";

function RestaurantNavbar() {
  const {
    openSideBar,
    cart,
    quantity,
    total,
    openTakeoutSideBar,
    openProfileSideBar,
  } = useProductsContext();
  const [isHover, setIsHover] = useState(false);
  return (
    <NavContainer>
      <div className="nav-center">
        <div className="nav-cont">
          <div className="nav-header">
            <Link to="/">
              <img src={logo} alt="log-img" />
            </Link>
            <button type="button" className="nav-toggle" onClick={openSideBar}>
              <Icon Name="List" colour={colours.neutral1} />
            </button>
          </div>

          <ul className="nav-links">
            {links.map((link) => {
              const { id, text, url } = link;
              return (
                <li key={id}>
                  <Link style={{ color: '#fff' }} to={url}>
                    {text}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="nav-user">
          {!localStorage.user && (
            <Link to="/login">
              <p className="login-text">Signin</p>
            </Link>
          )}

          {cart.length === 0 ? (
            <Link to="/ordertakeout">
              <Button
                text="Order a Takeout!"
                backgroundColour={colours.primarygrey900}
                iconColour={colours.primarygold100}
                width="14.3rem"
                className="btn"
                textClassName="text"
              />
            </Link>
          ) : (
            <div
              className="cartBtn__cont"
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
              onClick={openTakeoutSideBar}
            >
              <Icon Name={isHover ? 'CartDark' : 'Cart'} />

              <div
                style={{
                  height: '25px',
                  width: '25px',
                  background: '#DFC09A',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '10px',
                }}
              >
                <p className="lead bold">{quantity}</p>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  paddingRight: '10px',
                }}
                className="takeout__cardFlex"
              >
                <p className="lead">&#8358;</p>
                <p className="lead">
                  {total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                </p>
              </div>
            </div>
          )}

          {localStorage.user && (
            <Icon
              Name="Home"
              colour={colours.neutral1}
              onClick={openProfileSideBar}
            />
          )}
        </div>
      </div>
    </NavContainer>
  );
}

const NavContainer = styled.nav`
  .nav-center {
    margin: 0 auto;
    justify-content: space-between;
    height: 7.2rem;
    background-color: inherit;
    position: fixed;
    z-index: 100;
    margin-left: 1.6rem;
    margin-right: 1.6rem;
    margin-top: 1.6rem;

    @media only screen and (max-width: 768px) {
      margin-top: 0;
      width: 100%;
      left: 0px;
    }
    @media only screen and (max-width: 1024px) {
      width: 100%;
      left: 0px;
    }
  }
  .nav-cont {
    // margin-left: 4rem;
    width: 30rem;

    @media (max-width: 768px) {
      width: 90%;
      margin-left: 1rem;
    }

    @media (max-width: 1024px) {
      width: 90%;
      margin-left: 1rem;
    }
  }
  .nav-header {
    display: flex;
    align-items: center;
    width: 34rem;
    z-index: 100;
    justify-content: space-between;

    @media (max-width: 768px) {
      width: 100%;
    }

    @media (max-width: 1024px) {
      width: 100%;
    }

    img {
      width: 175px;
      @media only screen and (max-width: 768px) {
        width: 150px;
        margin-top: 1.6rem;
        margin-left: -2rem;
      }
    }
  }
  .nav-toggle {
    background: transparent;
    border: transparent;
    cursor: pointer;

    @media only screen and (max-width: 768px) {
      margin-top: 1.6rem;
      margin-right: 2rem;
    }
  }
  .nav-links {
    display: none;
    color: "#fff";
  }
  .nav-user {
    display: none;
  }

  @media (min-width: 992px) {
    .nav-toggle {
      display: none;
    }
    .nav-cont {
      grid-column: 1/6;
      display: flex;
    }
    .nav-center {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      grid-column-gap: 2.4rem;
      width: 100%;
      margin-left: 4rem;
      margin-right: 4rem;
      margin-top: 0;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      width: 37.3rem;
      align-items: center;
      font-family: "Montserrat", sans-serif;
      font-weight: 400;
      margin-left: 4rem;
      li {
        margin: 0 0.5rem;
        list-style: none;
      }
      a {
        color: #000000;
        font-size: 1.6rem;
        text-decoration: none;
        line-height: 2rem;
        padding: 0.5rem;
        &:hover {
          text-decoration-line: underline;
          color: #333333;
        }
      }
    }
    .nav-user {
      grid-column: 11/13;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 24rem;
      margin-left: -8.8rem;
      a {
        color: #000000;
        font-size: 1.6rem;
        font-weight: 400;
        text-transform: capitalize;
        text-decoration: none;
        line-height: 2rem;
      }
    }
  }

  .login-text {
    font-family: "Montserrat", sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 1.3rem;
    line-height: 1.6rem;
    text-transform: uppercase;
    color: #ffffff;
  }
  @media only screen and (min-width: 1200px) and (max-width: 1290px) {
    .nav-center {
      width: 100%;
      margin-left: 4rem;
      margin-right: 4rem;
      margin-top: 0;
    }
    .nav-user {
      grid-column: 10/13;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: auto;
      margin-left: -3rem;
      width: 24rem;
    }
  }

  @media only screen and (min-width: 1550px) and (max-width: 1950px) {
    /* .nav-center {
        width: 100%;
        margin-left: 4rem;
        margin-right: 4rem;
      } */
    .nav-user {
      /* grid-column: 10/13;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: auto; */
      margin-left: -2.4rem;
      /* width: 24rem; */
    }
  }
  .cartBtn__cont {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 32px;
    width: 15rem;
    border-radius: 40px;
    padding: 8px 12px 8px 12px;
    background: #000;
    cursor: pointer;

    &:hover {
      background: #fff;
      .lead {
        color: #000;
      }
    }
  }

  .lead {
    color: #fff;
    font-size: 15px;
  }
  .bold {
    font-weight: 800;
  }
  .btn {
    &:hover {
      .text {
        color: #dfc09a;
        font-weight: 600;
      }
    }
  }
`;

export default RestaurantNavbar;
