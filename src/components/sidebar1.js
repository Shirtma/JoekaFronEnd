import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { zIndexes } from 'util/constants';
import { links, accLinks } from '../util/constants';
import Icon from './icon';
import colours from '../lib/colours';
import Button from './button';
// import CartButtons from './CartButtons'
import { useProductsContext } from '../context/products_context';
import { useUserContext } from '../context/user_context';

function Sidebar() {
  const {
    closeSideBar,
    isSideBarOpen,
    cart,
    quantity,
    total,
    openTakeoutSideBar,
    openProfileSideBar,
  } = useProductsContext();
  const { isAuthenticated } = useUserContext();
  const [isHover, setIsHover] = useState(false);
  return (
    <SidebarContainer>
      <aside
        className={`${isSideBarOpen ? 'sidebar show-sidebar' : 'sidebar'}`}
      >
        <div className="sidebar-header">
          <button className="close-btn" type="button" onClick={closeSideBar}>
            <Icon Name="Close" colour={colours.neutral1} />
          </button>
        </div>
        {isAuthenticated ? (
          <ul className="acctlinks">
            {accLinks.map((link) => {
              const {
                id, text, url, icon,
              } = link;
              return (
                <li key={id} className="list_item">
                  <Link to={url} onClick={closeSideBar}>
                    {text}
                  </Link>
                  <Icon Name={icon} colour="transparent" />
                </li>
              );
            })}
          </ul>
        ) : null}

        <ul className="links">
          {links.map((link) => {
            const { id, text, url } = link;
            return (
              <li key={id}>
                <Link to={url} onClick={closeSideBar}>
                  {text}
                </Link>
              </li>
            );
          })}
          {localStorage.user && cart.length === 0 && (
            <Button
              text="Order a Takeout!"
              backgroundColour={colours.primarygrey900}
              iconColour={colours.primarygold100}
              width="28.5rem"
            />
          )}
        </ul>

        {
          !localStorage.user && (
            <div className="nav-user">
              <Link to="/login">
                <p className="text">Signin</p>
              </Link>
              <Button
                text="Order a Takeout!"
                backgroundColour={colours.primarygrey900}
                iconColour={colours.primarygold100}
                width="28.5rem"
              />
            </div>
          )
          // : (
          // <div className="logout_small">
          //   <p className="text">Logout</p>

          //   <Icon Name="Logout" colour="transparent" />
          // </div>
          // )
        }

        {cart.length === 0 ? (
          <Link to="/ordertakeout">
            <Button
              text="Order a Takeout!"
              backgroundColour={colours.primarygrey900}
              iconColour={colours.primarygold100}
              width="14.3rem"
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
          <>
            <div className="icon__cont">
              <Icon
                Name="Home"
                colour={colours.neutral1}
                onClick={openProfileSideBar}
              />
            </div>
            <div className="logout_small">
              <p className="text">Logout</p>

              <Icon Name="Logout" colour="transparent" />
            </div>
          </>
        )}
      </aside>
    </SidebarContainer>
  );
}

const SidebarContainer = styled.div`
  text-align: center;
  width: 35rem;
  z-index: ${zIndexes.modal};
  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    justify-content: flex-end;
    padding: 0.5rem 1.5rem;
  }
  .close-btn {
    background: transparent;
    border-color: transparent;
    height: 22.5px;
    /* width: 22.5px; */
    transition: all 0.3s linear;
    cursor: pointer;
    margin-top: 0.2rem;
    z-index: 1000;
  }
  .close-btn:hover {
    color: var(--clr-red-light);
  }
  .logo {
    justify-self: center;
    height: 30px;
  }
  .acctlinks {
    margin-bottom: 2rem;
    margin-top: 1.7rem;
    width: 31.1rem;
    margin-left: 3.2rem;
    border-bottom: 1px solid #cccccc;
    list-style-type: none;

    a {
      list-style-type: none;
      padding-left: 0;
      margin-left: 0 !important;
    }
  }
  .links {
    margin-bottom: 2rem;
    margin-top: 1.7rem;
    width: 31.1rem;
    margin-left: 3.2rem;
    margin-right: 3.2rem;
    list-style-type: none;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #cccccc;
  }
  .links a,
  .acctlinks a {
    display: block;
    font-family: "Montserrat", sans-serif;
    font-weight: 400;
    /* margin-left: 3.2rem; */
    text-align: left;
    font-size: 1.6rem;
    list-style-type: none;
    /* list-style: none !important; */
    text-decoration: none;
    text-transform: capitalize;
    padding: 2.5rem 1.5rem;
    padding-left: 0;
    color: #000000;
    transition: all 0.3s linear;
    letter-spacing: var(--spacing);
  }
  .list_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .links a:hover {
    text-decoration-line: underline;
    color: #333333;
  }
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ffffff;
    transition: all 0.3s linear;
    transform: translate(-100%);
    z-index: -1;
    overflow-y: scroll;
  }
  .show-sidebar {
    transform: translate(0);
    z-index: 999;
  }
  .cart-btn-wrapper {
    margin: 2rem auto;
  }
  .nav-user {
    margin-top: 3.45;
    display: flex;
    /* align-items: center; */
    /* justify-content: space-between; */
    margin-left: 3.2rem;
    height: 9rem;
    text-align: left;
    /* width: 24rem; */
    flex-direction: column;
    justify-content: space-between;
    a {
      color: #000000;
      font-size: 1.6rem;
      font-weight: 400;
      text-transform: capitalize;
      text-decoration: none;
      line-height: 2rem;
    }
  }

  .logout_small {
    font-size: 1.6rem;
    margin-left: 3.2rem;
    display: flex;
    width: 31.1rem;
    justify-content: space-between;
    align-items: center;
  }
  @media screen and (min-width: 992px) {
    .sidebar {
      display: none;
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
    margin-left: 3.2rem;

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

  .icon__cont {
    width: 10%;
    margin: 3rem 0;
  }
`;

export default Sidebar;
