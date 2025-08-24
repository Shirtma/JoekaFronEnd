/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import colours from '../lib/colours';
import Icon from './icon';
// import Image1 from "../images/our-playlist-image.jpg";
import { useProductsContext } from '../context/products_context';
// import Image2 from "../images/nigeria-naira-currency-symbol.png";
import Badges from './badge';
import { Link } from 'react-router-dom';
import { DECREASE, INCREASE } from '../action';
import {zIndexes} from 'util/constants'

const Takeoutsidebar = () => {
  const [hover, setHover] = useState(false);
  // const [deliveryPrice, setDeliveryPrice] = useState(2000)

  const {
    closeSideBar,
    isSideBarOpen,
    cart,
    removeFromCart,
    total,
    toggleAmount,
    openTakeoutSideBar,
    isTakeoutSideBarOpen,
    closeTakeoutSideBar,
    selectedOption,
    quantity,
    form,
    deliveryPrice,
    setDeliveryPrice
  } = useProductsContext();

  const deliverPrice = useCallback(() => {
    if (form?.city === 'Ajah' || selectedOption === 'Ajah') {
      setDeliveryPrice(3000);
    } else if (form?.city === 'Surulere' || selectedOption === 'Surulere') {
      setDeliveryPrice(2000);
    } else if (
      form?.city === 'Lekki Phase 1' ||
      selectedOption === 'Lekki Phase 1'
    ) {
      setDeliveryPrice(1000);
    } else if (form?.city === 'Fadeyi' || selectedOption === 'Fadeyi') {
      setDeliveryPrice(2000);
    } else if (form?.city === 'Costain' || selectedOption === 'Costain') {
      setDeliveryPrice(2000);
    } else if (form?.city === 'Yaba' || selectedOption === 'Yaba') {
      setDeliveryPrice(2000);
    } else if (
      form?.city === 'Lagos Island' ||
      selectedOption === 'Lagos Island'
    ) {
      setDeliveryPrice(1000);
    } else if (form?.city === 'VGC' || selectedOption === 'VGC') {
      setDeliveryPrice(2000);
    }
  }, [selectedOption, setDeliveryPrice, form?.city]);

  useEffect(() => {
    deliverPrice();
  }, [selectedOption, deliverPrice]);

  return (
    <TakeoutsidebarContainer cart={cart} quantity={quantity}>
      {quantity > 0 && (
        <div className={`${isTakeoutSideBarOpen ? 'takeout__div' : ''}`}>
          <aside
            className={`${
              isTakeoutSideBarOpen ? 'sidebar show-sidebar' : 'sidebar'
            }`}
          >
            <div className="sidebar__header">
              <button
                className="close-btn"
                type="button"
                onClick={closeTakeoutSideBar}
              >
                <Icon Name="XTransparent" colour="white" height="24px" width="24px" />
              </button>
              <p style={{ color: '#fff' }}>MY CART</p>
            </div>
            <div className="sidebar__width">
              <div className="sidebar__innerWidth">
                {cart &&
                  cart.map((cart, i) => (
                    <div key={i} className="sidebar__cartContainer">
                      <img src={cart.image} alt="gallery" />

                      <div className="sidebar__midDetail">
                        <div className="sidebar__midDetail-header">
                          <h5 className='cart-name'>{ cart.menuItem }</h5>
                          <div className="cart-price">
                            <p>{cart.price}</p>
                            <Icon
                              style={{ cursor: 'pointer', marginLeft: '13.25px' }}
                              Name="Trash"
                              colour="transparent"
                              height="24px"
                              width="24px"
                              onClick={ () => removeFromCart(cart.id) }
                            />
                          </div>
                        </div>
                        <p className="description">
                          { cart.description.slice(0, 40) }...
                        </p>
                      <div className="action">
                        <button
                          disabled={cart.quantity > 1 ? false : true}
                          onClick={() => toggleAmount(cart.id, DECREASE)}
                          style={{
                              width:          '18px',
                              height:         '18px',
                              display:        'flex',
                              alignItems:     'center',
                              justifyContent: 'center',
                              borderRadius:   '50%',
                              border:
                                cart.quantity > 1
                                  ? '1px solid #fff'
                                  : '1px solid grey'
                            }}
                          >
                            <Icon
                              style={{ cursor: 'pointer' }}
                              Name={
                                cart.quantity > 1 ? 'MinusWhite' : 'MinusGrey'
                              }
                              colour="transparent"
                              width="18px"
                            />
                          </button>

                          <p className='cart-quantity'>{cart.quantity}</p>
                          <button className="sidebar__iconCont">
                            <Icon
                              style={{ cursor: 'pointer' }}
                              Name="PlusWhite"
                              colour="transparent"
                              width="18px"
                              onClick={() => toggleAmount(cart.id, INCREASE)}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            {cart?.length > 0 && (
              <div className="sidebar-st">
                <Badges
                  text={`Delivery to ${selectedOption}`}
                  background="transparent"
                  price={deliveryPrice}
                  color="#b3b3b3"
                />
                <Badges
                  text="Subtotal"
                  background="grey"
                  price={total}
                  color="#fff"
                />
                <Link
                  className="proceed"
                  onClick={() => closeTakeoutSideBar()}
                  to="/checkout"
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                >
                  <Badges
                    text="PROCEED TO CHECKOUT"
                    icon="RArrow"
                    color={hover ? '#fff' : '#000'}
                    background="golden"
                  />
                </Link>
              </div>
            )}
          </aside>
        </div>
      )}
    </TakeoutsidebarContainer>
  );
};

export const TakeoutsidebarContainer = styled.div`
  text-align: center;
  .sidebar-st{
    position: sticky;
    bottom: 0px;
    padding: 8px 8px 0px;
  }
  .takeout__div {
    position: fixed;
    z-index: ${zIndexes.overlay};
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.2);
    width: 100vw;
  }

  .sidebar {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100vh;
    background: #333333;
    transition: all 800ms ease;
    transform: translate(100%);
    z-index: 999;
    overflow-y: auto;
    box-shadow: 0px 1px 0px #4d4d4d;

    @media (min-width: 768px) {
      width: 327px;
    }

    &__width {
      height: 70vh;
    }

    &__innerWidth {
      overflow-y: auto;
      height: 90%;
    }

    &__header {
      display: flex;
      align-items: center;
      font-family: Space Grotesk;
      font-size: 16px;
      gap: 12.5px;

      .close-btn {
        background: transparent;
        border-color: transparent;
        transition: all 0.3s linear;
        cursor: pointer;
        z-index: 1000;
        &:hover {
          color: var(--clr-red-light);
        }
      }
    }

    &__cartContainer {
      padding: 8px;
      width: 100%;
      display: flex;
      gap: 8px;
      box-shadow: 0px 1px 0px #4D4D4D;
    }

    &__midDetail {
      &-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-family: Space Grotesk;
        .cart-name {
          font-size: 14px;
          font-weight: 500;
          color: #fff;
          text-align: left;
        }
        .cart-price {
          display: flex;
          align-items: center;
          font-size: 14px;
          font-weight: 400;
          color: #fff;
        }
      }
      .description {
        font-family: Montserrat;
        font-size: 14px;
        font-style: normal;
        font-weight: 300;
        line-height: 22px;
        text-align: left;
        color: #b3b3b3;
        margin: 9px 0;
      }
      .action {
        color: #fff;
        display: flex;
        justify-content: space-around;
        width: 8rem;
        align-items: center;
        .cart-quantity {
          font-family: Averta;
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
        }
      }
    }

    &__iconCont {
      width: 18px;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      border: 1px solid #ffffff;
    }

    &__card {
      display: flex;
      height: 4.4rem;
      border: 1px solid #ddd;
      margin: 0 auto;
      justify-content: space-between;
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      align-items: center;
      margin-bottom: 1rem;
    }

    &__card > p {
      font-size: 1.4rem;
    }

    &__image {
      object-fit: cover;
      height: 1.5rem;
      width: 1.5rem;
      margin-right: 0.2rem;
    }

    &__cardFlex {
      display: flex;
      align-items: center;
    }
    &__cardFlex > p {
      font-size: 1.4rem;
    }
  }

  .show-sidebar {
    transform: ${(props) =>
    props.quantity === 0 ? 'translate(100%)' : 'translate(0%)'};
    z-index: 999;
    transition: all 800ms ease;
  }

  img {
    height: 7.671074676513672rem;
    width: 8.251239776611328rem;
    object-fit: cover;
    // border-radius: 1rem;
  }
  .transparent {
    background: transparent;
    color: #b3b3b3;
  }

  .transparent > p {
    font-family: Space Grotesk;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;
  }

  .grey {
    background: #4d4d4d;
    color: #fff;
  }

  .grey > p {
    font-family: Space Grotesk;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;
  }
  .golden {
    background: #dfc09a;
    transition: all 1s ease;

    &:hover {
      cursor: pointer;
      background: #b29a7b;
      p {
        color: #fff;
      }
    }
  }

  .golden > p {
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: left;
  }

  a {
    text-decoration: none;
    color: #000;
  }

  button {
    background: transparent;
  }
`;

export default Takeoutsidebar;
