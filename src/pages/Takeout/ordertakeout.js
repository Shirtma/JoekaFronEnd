/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import styled from 'styled-components';
import Icon from '../../components/icon';
import Mealcard from '../../components/mealcard';
import { useProductsContext } from '../../context/products_context';
import Product from './Product';

function OrderTakeout({ storage, setStorage, track }) {
  const {
    openTakeoutSideBar,
    total,
    quantity,
    products,
    addToCart,
    selectedOption,
    setDeliveryLocation,
    setForm,
    form,
    options,
  } = useProductsContext();

  const [isHover, setIsHover] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);
  const [hasSelected, setHasSelected] = useState(false);
  const [tab, setTab] = useState('Breakfast');
  const [activeTab, setActiveTab] = useState('Breakfast');
  const [searchText, setSearchText] = useState('');
  const [filteredSearch, setFilteredSearch] = useState([]);

  const toggling = () => setIsOpen(!isOpen);
  const onOptionClicked = (value) => {
    setDeliveryLocation(value);
    setStorage(value);
    setHasSelected(true);
    setIsOpen(false);
  };

  const handleTab = (e) => {
    setTab(e.target.innerText);
    setActiveTab(e.target.innerText);
  };

  useEffect(() => {
    setStorage(localStorage.getItem('selectedOption'));
    // eslint-disable-next-line
  }, []);

  const handleFilter = (e) => {
    const text = e.target.value;
    setSearchText(text);
    if (text !== '') {
      const newFilter = products.filter((product) => product.description.toLowerCase().includes(text.toLowerCase()));
      setFilteredSearch(newFilter);
    }
  };

  const filteredFunc = (array, item) => array.some((x) => x.category === item);

  const removeText = () => {
    setSearchText('');
    setSearchClicked(false);
  };

  useEffect(() => {
    setTimeout(() => {
      if (!!selectedOption) {
        setHasSelected(true);
      }
    }, 0)
  }, [ selectedOption ]);

  return (
    <OrderTakeOutContainer
      storage={ storage }
      track={ track }
      searchIsActive={ searchClicked }
      selectedDeliveryLocation={hasSelected}
    >
      <section className="delivery__location">
        <aside>
        <div className="delivery__location--searchbox">
          <input
            type="text"
            placeholder="Search"
            onChange={handleFilter}
            value={searchText}
          />
          <Icon
            Name={searchText.length > 0 ? 'TimesCircle' : 'Search'}
            colour="transparent"
            width="48px"
            height="48px"
            onClick={searchText.length > 0 ? removeText : () => setSearchClicked(!searchClicked)}
            className="icon"
          />
        </div>
           <div className="takeout__menuContainer">
              <h2 className="heading">Menu</h2>
              <button className="takeout__foodDish">
                <div className="check3">
                  <Icon
                    Name="RArrowWhite"
                    colour="transparent"
                    width="2.0rem"
                  />
                </div>
                <p>FOOD &amp; DISHES</p>
              </button>
              <div className="takeout__drinks">
                <p>DRINKS &amp; BEVERAGES</p>
              </div>
            </div>
        </aside>
        <div className="delivery__location--area2" onClick={toggling}>
          <div className="delivery__location--area2-row1">
            <p>DELIVERING TO:</p>
            <div className="cta">
              <span>
                {!storage
                  ? 'Select delivery area'
                    : selectedOption}
              </span>
              <Icon
                Name="AngleDown"
                colour="transparent"
                width="3.0rem"
              />
            </div>
          </div>
          {!storage && (
            <p>
              Select from our available areas where we deliver to. More locations coming soon
            </p>
          ) }
          {isOpen && (
            <ul className="delivery__location--options">
              {options.map((option, i) => (
                <li onClick={() => onOptionClicked(option)} key={i}>{option}</li>
              ))}
            </ul>
            )}
        </div>
      </section>
      <section className="meals__type">
        <div className="delivery__location--area" onClick={toggling}>
          <div className="delivery__location--area-row1">
            <p>DELIVERING TO:</p>
            <div className="cta">
              <span>
                {!storage
                  ? 'Select delivery area'
                    : selectedOption}
              </span>
              <Icon
                Name="AngleDown"
                colour="transparent"
                width="3.0rem"
              />
            </div>
          </div>
          {!storage && (
            <p>
              Select from our available areas where we deliver to. More locations coming soon
            </p>
          ) }
          {isOpen && (
            <ul className="delivery__location--options">
              {options.map((option, i) => (
                <li onClick={() => onOptionClicked(option)} key={i}>{option}</li>
              ))}
            </ul>
            )}
        </div>
        <div
            onClick={() => setIsOpen(false)}
            className={
                isOpen
                  ? 'takeout__mainContainer__ overlay'
                  : 'takeout__mainContainer__'
              }
          >
            {searchText.length === 0 && (
              <div className="meals__type--optiontab">
                <button
                  className={
                        tab === 'Breakfast'
                          ? 'takeout__mainItem active'
                          : 'takeout__mainItem'
                      }
                  onClick={handleTab}
                >
                Breakfast
                </button>
                <button
                  className={
                        tab === 'Starters salads & platter'
                          ? 'takeout__mainItem active'
                          : 'takeout__mainItem'
                      }
                  onClick={handleTab}
                >
                Starters salads &amp; platter
                </button>
                <button
                  className={
                        tab === 'Mains'
                          ? 'takeout__mainItem active'
                          : 'takeout__mainItem'
                      }
                  onClick={handleTab}
                >
                Mains
                </button>
                <button
                  className={
                        tab === 'Sides'
                          ? 'takeout__mainItem active'
                          : 'takeout__mainItem'
                      }
                   onClick={handleTab}
                >
                Sides
                </button>
                <button
                  className={
                        tab === 'Desserts'
                          ? 'takeout__mainItem active'
                          : 'takeout__mainItem'
                      }
                  onClick={handleTab}
                >
                Desserts
                </button>
              </div>
          ) }
          </div>
      </section>
      <main className="meals__listing">
          {searchText.length === 0 && <Product tab={tab} />}
            {searchText.length > 0 && (
            <p
              className="search"
              style={{ marginTop: '20px', marginBottom: '20px' }}
            >
              Search Result
            </p>
        ) }

          {searchText.length > 0 && (
            <>
              <div
                className="takeout__mealContainer1"
                style={{ marginBottom: '3rem' }}
              >
                {filteredSearch
                      && filteredSearch.map(
                        (product) => product.category === activeTab && (
                        <Mealcard
                          className1="takeout__mealDetail"
                          className2="takeout__mealTopFlex"
                          className3="takeout__mealRightFlex"
                          price={product.price}
                          text={product.menuItem}
                          innerText={product.description}
                          Image={product.image}
                          handleClick={() => addToCart(product)}
                        />
                        ),
                      )}
              </div>
            </>
            )}
      </main>
      <div
        className="cart__respCont"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={openTakeoutSideBar}
        >
          <div className="cartBtn__cont">
            <Icon Name={isHover ? 'CartDark' : 'Cart'} />
            <p className="lead bold quantity">{quantity}</p>
            <div className="takeout__cardFlex">
            <p className="lead">
              &#8358; {' '}
                {total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
              </p>
            </div>
          </div>
          <div className="cart__rightCont">
            <p className="lead">View Cart</p>
            <Icon Name="ArrowRightGold" />
          </div>
      </div>
      <div className="cta-overlay" />
    </OrderTakeOutContainer>
  );
}

const OrderTakeOutContainer = styled.div`
  background-color: #333333;
  padding: 16px;
  border-top: 1px solid gray;
  position: relative;

  /* An overlay which prompts a user to select delivery location */
.cta-overlay {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: #191919;
  opacity: 0.8;
  z-index: 3;
  display: ${({selectedDeliveryLocation}) => !!selectedDeliveryLocation ? 'none' : 'block'};
}
  @media (min-width: 1024px) {
    display: grid;
    grid-template: repeat(3, auto) / repeat(12, 1fr);
    padding: 0 16px 0 0;
  }

  .delivery__location {
    position: relative;
    @media (min-width: 1024px) {
      background-color: rgba(0, 0, 0, 0.2);
      box-shadow: 1px 0px 0px #4D4D4D, -1px 0px 0px #4D4D4D;
      margin-right: 41px;
      padding: 23px 40px;
    }

    &--searchbox {
      display: flex;
      align-items: center;
      background-color: #333333;

      @media (min-width: 1024px) {
        background-color: #191919;
      }

      input {
        height: 48px;
        width: 100%;
        color: #B3B3B3;
        padding: 8px;
        font-family: Montserrat;
        background-color: transparent;
        border: none;
        outline: none;
      }

      input::placeholder {
        font-family: Montserrat;
        color: #B3B3B3;
      }

      .icon {
        height: 24px;
        width: 24px;
        margin-right: 8px;
        cursor: pointer;
        @media (min-width: 1024px) {
          height: 16px;
          width: 16px;
        }
      }
    }

    &--area {
      display: none;
      flex-direction: column;
      align-items: flex-start;
      font-size: 14px;
      font-weight: 400;
      position: relative;
      z-index: 5;

      @media (min-width: 1024px) {
        display: flex;
        flex-direction: row;
        gap: 24px;
        width: 90%;
      }

      &-row1 {
        min-height: 48px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        background-color: #191919;
        color: #B3B3B3;
        @media (min-width: 1024px) {
          padding: 8px;
          width: 412px;
        }
      }

      p {
        color: #B3B3B3;
      }
      .cta {
        display: inherit;
        align-items: center;
        flex-direction: row;
        color: white;
      }

      &2{
        width: 100%;
        @media (min-width: 1024px) {
          display: none;
        }
        &-row1 {
          min-height: 48px;
          display: ${(props) => props.searchIsActive ? 'none' : 'flex'};
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          background-color: #191919;
          color: #B3B3B3;
          position: absolute;
          top: 0;
          left: 0;
          right: 48px;
          padding: 0px 8px;
        }
        p {
          color: #B3B3B3;
        }
        .cta {
          position: relative;
          display: inherit;
          align-items: center;
          flex-direction: row;
          color: white;

        }
      }
    }

    &--options {
      margin: 0;
      padding: 0;
      list-style-type: none;
      min-width: 343px;
      background-color: #FFFFFF;
      box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05);
      position: absolute;
      top: 46px;

      li {
        height: 40px;
        display: flex;
        align-items: center;
        padding: 0 24px;
        cursor: pointer;
      }
    }

    @media (min-width: 1024px) {
      grid-column: 1 / 2;
      grid-row: 1 / 4;
      width: 291px;
    }
  }

  .meals__type {
    margin-top: 16px;

    &--optiontab {
      overflow-x: auto;
      display: flex;
      gap: 8px;
      @media (min-width: 1024px) {
        margin-top: 17px;
      }

      button {
        height: 36px;
        min-width: fit-content;
        background-color: transparent;
        border-radius: 40px;
        padding: 9px 16px;
        cursor: pointer;
        color: #999999;
        border: 0;
        font-family: 'Space Grotesk';
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 18px;
        &.active {
          color: #DFC09A;
          background-color: #191919;
          pointer-events: none;
        }
      }
    }

    @media (min-width: 1024px) {
      grid-column: 2 / -1;
      grid-row: 1 / 2;
    }
  }

  .meals__listing {
    margin-bottom: 56px;
    @media (min-width: 1024px) {
      grid-column: 2 / -1;
      grid-row: 2 / 4;
      margin-bottom: 0;
    }
  }

  .takeout {
  /* Left Bar */
    &__menuContainer {
      display: none;
      margin-top: 40px;
      .heading {
        font-family: 'Space Grotesk';
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 32px;
        color: #666666;
        margin-bottom: 16px;
      }

      @media (min-width: 1024px) {
        display: block;
      }
    }

    &__foodDish {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 8px;
      background-color: transparent;
      font-family: 'Space Grotesk';
      width: 100%;
      border: 0;
      font-size: 16px;
      color: #fff;
      cursor: pointer;
      &:hover {
        font-weight: 700;
      }
    }

    &__drinks {
      display: flex;
      align-items: center;
      margin-top: 2rem;
      opacity: 20%;
      font-family: 'Space Grotesk';
      pointer-events: none;
      & > p {
        font-size: 16px;
        text-transform: uppercase;
        color: #fff;
        cursor: pointer;
      }
    }

    &__mainOptionCont {
      width: 100%;
      background: #333;
      position: sticky;
      top: 0;
      height: 50px;
      display: flex;
      align-items: center;
    }

    &__mainOption {
      width: 50%;
      display: flex;
      height: 40px;
      align-items: center;
      justify-content: space-between;
      color: #bbb;
      margin-bottom: 2rem;
      margin-left: 4rem;
      margin-top: 1.5rem;
    }

    &__mealContainer1 {
      display: flex;
      flex-direction: column;
      gap: 21.12px;
      padding-bottom: 24px;

      @media (min-width: 1024px) {
        flex-direction: row;
        flex-wrap: wrap;
      }
    }

    &__mealDetail {
      padding: 1rem;
      width: 100%;
    }

    &__mealDetail > p {
      margin-top: 1rem;
      color: #b3b3b3;
      font-size: 14px;
      font-family: Montserrat;
      font-size: 14px;
      font-style: normal;
      font-weight: 300;
      line-height: 20px;
      letter-spacing: 0em;
      text-align: left;
    }

    &__mealTopFlex {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__mealTopFlex > p {
      color: #ffffff;
      font-family: Space Grotesk;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 18px;
      letter-spacing: 0em;
      text-align: left;
    }

    &__mealRightFlex {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 95px;
    }

    &__mealRightFlex > p {
      color: #fff;
      font-family: Space Grotesk;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 18px;
      letter-spacing: 0em;
      text-align: right;
    }

    &__cardFlex > .lead {
      font-family: Space Grotesk;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 18px;
      letter-spacing: 0em;
      text-align: left;
    }
  }
  .check3 {
    width: 32px;
    height: 32px;
    border: 2px solid #dfc09a;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: #fff;
    background: #dfc09a;
  }
  .active {
    background: #000;
    border-radius: 50px;
    color: #dfc09a;
  }

  img {
    object-fit: cover;
    width: 82.51px;
    height: 76.71px;
    border-radius: 0rem;

    @media (min-width: 1024px) {
      width: 128px;
      height: 119px;
    }
  }

  .cart__respCont {
    position: fixed;
    top: 93%;
    right: 50%;
    transform: translate(50%, -50%);
    display: flex;
    justify-content: space-between;
    width: 343px;
    padding: 20px;
    background-color: #000000;
    box-shadow: 0px 25px 50px -12px rgba(0, 0, 0, 0.25);
    border-radius: 40px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
      background-color: #fff;

      .cartBtn__cont, .cart__rightCont {
        color: #000;
      }
    }
    @media (min-width: 1024px){
      display: none;
    }
  }

  .cartBtn__cont {
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: space-between;
    color: white;

    .quantity {
      width: 26px;
      height: 26px;
      background-color: #DFC09A;
      border-radius: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 600;
    }
  }

  .cartBtn__cont > div > .bold {
    font-family: Space Grotesk;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: center;
  }
  .cart__rightCont {
    display: flex;
    align-items: center;
    color: white;
  }
  .cart__rightCont > .lead {
    font-family: Space Grotesk;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: center;
  }

  .search {
    font-family: Space Grotesk;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 18px;
    letter-spacing: 0px;
    text-align: left;
    color: #999999;
  }

  .title {
    font-family: Space Grotesk;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
    text-transform: uppercase;
    color: #FFFFFF;
    margin: 16px 0px 24px;
  }
`;

export default OrderTakeout;
