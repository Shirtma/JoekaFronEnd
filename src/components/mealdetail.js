import React from 'react';
import styled from 'styled-components';
import Icon from './icon';
import { useProductsContext } from '../context/products_context';
import { DECREASE, INCREASE } from '../action';

function Mealdetail({
  Image,
  text1,
  text2,
  icon,
  number,
  icon2,
  price,
  icon3,
  id
}) {
  const { removeFromCart, toggleAmount } = useProductsContext();
  return (
    <CheckoutContainer>
      <div className="menu__cartContainer">
        <img src={Image} alt="gallery"   height="86.38px" width="82.51px" className="img"/>
        <div className="menu__midDetail">
          <div className="menu__midDet1">
            <div className="menu__textCont">
              <p>{text1}</p>
            </div>
            <div className="menu__rightDetail">
              <p>{price}</p>
              <Icon
                Name={icon3}
                colour="transparent"
                width="2.0rem"
                onClick={() => removeFromCart(id)}
              />
            </div>
          </div>
          <div className="menu__midDet2">
            <p>
              {text2}
              ...
            </p>
          </div>
          <div className="menu__addMinFlex">
            <button
              disabled={number > 1 ? false : true}
              className="cta-button-wrap"
            >
            <Icon
              Name={icon}
              colour="transparent"
              width="2.0rem"
              onClick={() => toggleAmount(id, DECREASE)}
              className="icon"
            />
            </button>
            <p
              style={{
                color: '#fff',
                paddingLeft: '.8rem',
                paddingRight: '.8rem',
              }}
            >
              {number}
            </p>
            <button className="cta-button-wrap">
            <Icon
              Name={icon2}
              colour="transparent"
              width="2.0rem"
              onClick={() => toggleAmount(id, INCREASE)}
              className="icon"
            />
            </button>
          </div>
        </div>
      </div>
    </CheckoutContainer>
  );
}
const CheckoutContainer = styled.div`
  .menu {
    &__cartContainer {
      display: flex;
      border-bottom: 1px solid grey;
      background: transparent;
      padding-bottom: 8px;
      @media (max-width: 768px) {
        min-width: 95%;
      }
    }
  &__addMinFlex {
    margin-top: 19px;
  }
    &__midDetail {
      width: 100%;
    }

    &__textCont {
      width: 16rem;
      margin-right: 1.5rem;
    }

    &__midDet1 {
      min-width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &__midDet2 {
      width: 20.7rem;
    }

    &__midDet1 > div > p {
      font-family: Space Grotesk;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 1.8rem;
      letter-spacing: 0em;
      text-align: left;
      flex: 1;
      color: #fff; 
    }
    &__midDet2 > p {
      font-family: Space Grotesk;
      font-size: 14px;
      font-style: normal;
      line-height: 1.8rem;
      letter-spacing: 0em;
      text-align: left;
      color: #999;
      margin-top: 0.5rem;
    }

    &__rightDetail {
      display: flex;
      width: 25%;
      align-items: center;
      justify-content: space-between;

      @media (max-width: 768px) {
        width: 15%;
      }
    }

    &__rightDetail > p {
      text-align: center;
      font-size: 14px;
      color: #fff;
      padding-right: 0.8rem;
    }

    &__addMinFlex {
      display: flex;
      justify-content: space-around;
      width: 6rem;
      align-items: center;
    }

    &__addMinFlex > p {
      font-size: 14px;
    }
  }

  .check {
    width: 4rem;
    height: 4rem;
    border: 2px solid #dfc09a;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: #ddd;
  }

  img, .img {
    height: 86.38px;
    width: 82.51px;
    border-radius: 0rem;
    object-fit: cover;
  }

  .cta-button-wrap {
      width: 18px;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      border: 1px solid #ffffff;
      background-color: transparent;
      cursor: pointer;
      &:disabled {
        pointer-events: none;
        cursor: default;
        border-color: grey;
      }
  }
`;

export default Mealdetail;
