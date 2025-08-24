import React from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import colours from '../lib/colours';
import Icon from './icon';
import { useProductsContext } from '../context/products_context';
import { order_history_url } from '../util/constants';

function Profilebar() {
  const {
    isProfileSideBarOpen,
    closeProfileSideBar,
    orderHistory,
    setOrderHistory,
  } = useProductsContext();
  const history = useHistory();

  const fetchOrderHistory = async (url) => {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        },
      });
      const history = response.data;
      console.log(history);
      setOrderHistory(history);
    } catch (error) {
      const history = error.response.data;
      setOrderHistory({ ...orderHistory, history });
    }
  };

  // useEffect(() => {
  //   setOrderHistory(order);
  // }, [order]);

  const handleCLick = async () => {
    fetchOrderHistory(order_history_url);
  };

  const logout = () => {
    localStorage.clear();
    closeProfileSideBar();
    history.push('/login');
  };
  return (
    <ProfilebarContainer>
      <div className={`${isProfileSideBarOpen ? 'takeout__div' : ''}`}>
        <aside
          className={`${
            isProfileSideBarOpen ? 'sidebar show-sidebar' : 'sidebar'
          }`}
        >
          <div className="sidebar__header">
            <button
              className="close-btn"
              type="button"
              onClick={closeProfileSideBar}
            >
              <Icon Name="Close" colour={colours.neutral1} />
            </button>
          </div>
          <div className="profilebar__menuCont">
            <div onClick={handleCLick} className="profilebar__flex">
              <Link to="/profile" onClick={closeProfileSideBar}>
                Profile
              </Link>
              <Icon
                Name="User"
                width="24px"
                height="24px"
                colour={colours.neutral1}
              />
            </div>
            <div onClick={handleCLick} className="profilebar__flex">
              <Link to="/profile/orders" onClick={closeProfileSideBar}>
                Orders
              </Link>
              <Icon
                Name="Board"
                width="24px"
                height="24px"
                colour={colours.neutral1}
              />
            </div>
            <div className="profilebar__flex">
              <Link to="#" onClick={(e) => {
                e.preventDefault();
                logout();
              }} role="button">Logout</Link>
              <Icon
                Name="Exit"
                width="24px"
                height="24px"
                colour={colours.neutral1}
              />
            </div>
          </div>
        </aside>
      </div>
    </ProfilebarContainer>
  );
}

export const ProfilebarContainer = styled.div`

  .takeout__div {
    position: fixed;
    z-index: 4000;
    top: 0;
    background: rgba(0, 0, 0, 0.2);
    width: 100vw;
    height: 100vh;
  }

  .sidebar {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100vh;
    background: #ffffff;
    transition: all 0.3s linear;
    transform: translate(100%);

    &__header {
      display: flex;
      justify-content: flex-end;
      margin-top: 2rem;
      margin-right: auto;
    }

    &__header > p {
      font-size: 2rem;
      margin-top: 1.5rem;
    }
    @media (min-width: 768px) {
      width: 34rem;
      height: fit-content;
    }
  }

  .profilebar {
    &__menuCont {
      width: 100%;
      margin-top: 2.5rem;
      padding: 32px 0px;
    }

    &__flex {
      min-height: 48px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      padding: 0px 32px;
    }
      &__flex svg {
        margin-left: auto;
      }

    &__flex > a {
      font-family: Montserrat;
      font-size: 13px;
      font-style: normal;
      font-weight: 300;
      line-height: 16px;
      letter-spacing: 0em;
      text-align: left;
      text-transform: uppercase;
      cursor: pointer;
      color: #000;
      position: absolute;
      left: 0;
      width: 100%;
      padding-left: 32px;
      height: 100%;
      display: flex;
      align-items: center;
    }
  }

  .show-sidebar {
    transform: translate(0);
    z-index: 999;
  }
  .close-btn {
    background: transparent;
    border-color: transparent;
    height: 1.5rem;
    transition: all 0.3s linear;
    cursor: pointer;
    z-index: 1000;
    margin-right: 32px;
  }
  .close-btn:hover {
    color: var(--clr-red-light);
  }

  img {
    height: 7.671074676513672rem;
    width: 8.251239776611328rem;
    object-fit: cover;
    border-radius: rem;
  }
  .transparent {
    background: transparent;
  }
`;

export default Profilebar;
