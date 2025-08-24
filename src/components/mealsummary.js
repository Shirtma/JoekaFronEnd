import React from 'react';
import styled from 'styled-components';
import Icon from './icon';

function MealSummary({
  Image,
  text1,
  text2,
  icon,
  number,
  icon2,
  price,
  icon3,
}) {
  return (
    <CheckoutContainer>
      {/* <div className="menu__width"> */}
      <div className="menu__cartContainer">
        <img src={Image} alt="gallery" />
        <div className="menu__midDetail">
          <div className="menu__midDet1">
            <p
              style={{
                color: '#000',
                fontSize: '14px',
                lineHeight: '1.8rem',
                fontWeight: '500',
                fontFamily: 'Space Grotesk',
              }}
            >
              {text1}
            </p>
          </div>
          <div className="menu__midDet2">
            <p>{text2}</p>
          </div>
          <div className="menu__addMinFlex">
            <Icon Name={icon} colour="transparent" width="2.0rem" />
            <p
              style={{
                color: '#fff',
                paddingLeft: '.8rem',
                paddingRight: '.8rem',
              }}
            >
              {number}
            </p>
            <Icon Name={icon2} colour="transparent" width="2.0rem" />
          </div>
        </div>
        <div style={{ width: '6.0rem' }} className="menu__rightDetail">
          <p>
            &#8358;
            {price}
          </p>
          <Icon Name={icon3} colour="transparent" />
        </div>
      </div>
      {/* </div> */}
    </CheckoutContainer>
  );
}
const CheckoutContainer = styled.div`
  .menu {
    &__width {
    }
    &__cartContainer {
      margin: 0.5rem 0rem;
      width: 100%;
      height: 12rem;
      display: flex;
      justify-content: space-between;
    }

    &__midDetail {
      margin-left: 1.5rem;
    }

    &__midDet1 {
      //   height: 3.6rem;
      width: 42rem;
    }
    &__midDet2 {
      height: 3.6rem;
      width: 46rem;
    }

    &__midDet1 > p {
      font-family: Montserrat;
      font-size: 14px;
      font-style: normal;
      font-weight: 300;
      line-height: 22px;
      letter-spacing: 0em;
      text-align: left;
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
      margin-right: 1.5rem;
      width: 8rem;
      height: 5rem;
      align-items: center;
    }

    &__rightDetail > p {
      font-family: Space Grotesk;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 18px;
      letter-spacing: 0em;
      text-align: right;
      color: #000;
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

  img {
    height: 76.71074676513672px;
    width: 82.5123977661132.8rem;
    border-radius: 0rem;
    object-fit: cover;
  }
`;

export default MealSummary;
