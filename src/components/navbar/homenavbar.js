import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { links } from '../../util/constants';
import Button from '../button';
import colours from '../../lib/colours';
import Icon from '../icon';
import { useProductsContext } from '../../context/products_context';
import { useUserContext } from '../../context/user_context';

function HomeNavbar() {
  const [isHover, setIsHover] = useState(false);
  const {
    openSideBar,
    cart,
    quantity,
    total,
    openTakeoutSideBar,
    openProfileSideBar,
  } = useProductsContext();
  const { isAuthenticated } = useUserContext();
  console.log(isAuthenticated);

  return (
    <NavContainer>
      <div className="nav-center">
        <div className="nav-cont">
          <div className="nav-header">
            <Link to="/">
              <Icon Name="DarkTheHouseLogo" width="144px" height="22.4px" />
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
                  <Link to={url}>{text}</Link>
                </li>
              );
            })}
            {/* {myUser && (
           <li>
             <Link to='/checkout'>checkout</Link>
           </li>
         )} */}
          </ul>
        </div>
        <div className="nav-user">
          {!localStorage.user && (
            <Link to="/login">
              <p className="text">SIGN IN</p>
            </Link>
          )}

          {cart.length === 0 ? (
            <Link to="/ordertakeout">
              <Button
                text="ORDER A TAKEOUT!"
                backgroundColour={colours.primarygrey900}
                iconColour={colours.primarygold100}
                width="159px"
                minHeight="48px"
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
                <p
                  className="lead bold"
                  // style={{
                  //   color: "#fff",
                  //   fontSize: "14px",
                  //   fontWeight: 800,
                  // }}
                >
                  {quantity}
                </p>
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
              style={{ cursor: 'pointer' }}
            />
          )}
        </div>
      </div>
    </NavContainer>
  );
}

const NavContainer = styled.div`
border: 1px solid purple;
  .nav-center {
    // margin: 0 auto;
    justify-content: space-between;
    height: 7.2rem;
    background-color: #fcf9f5;
    position: fixed;
    top: 0;
    left: -40px;
    z-index: 100;
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
    margin-left: 4rem;
    width: 30rem;

    @media (max-width: 768px) {
      width: 90%;
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
      /* width: 100%; */
    }

    @media (max-width: 1024px) {
      /* width: 100%; */
    }

    svg {
      margin-right: 24px;
      /* @media only screen and (max-width: 768px) {
        width: 150px;
        margin-top: 1.6rem;
        margin-left: 1rem;
      } */
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
      margin-top: 0;
      padding: 0px 40px;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      width: 37.3rem;
      align-items: center;
      font-family: "Montserrat", sans-serif;
      font-weight: 400;
      li {
        margin: 0 0.5rem;
        list-style: none;
      }
      a {
        color: #000000;
        font-size: 13px;
        font-weight: 300;
        text-decoration: none;
        line-height: 2rem;
        padding: 0.5rem;
        &:hover {
          text-decoration-line: none;
          color: #333333;
        }
      }
    }
    .nav-user {
      grid-column: 11/13;
      display: flex;
      align-items: center;
      justify-content: space-between;
        border: 1px solid green;
      /* width: 24rem; */
      /* margin-left: -8.8rem; */
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
      /* margin-left: -2.4rem; */
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
`;

export default HomeNavbar;
