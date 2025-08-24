import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../../components/icon';
import Pdf from '../../components/pdf/new_menu.pdf';

function DeliveryDinein() {
  return (
    <DeliveryDineinContainer>
      <div className="delivery__container">
        <Link to="/restaurant" className="delivery__flex">
          <div className="check">
            <Icon Name="ArrowLeft" colour="transparent" />
          </div>
          <p>Back</p>
        </Link>
        <div className="delivery__section">
          <div className="check2">
            <Icon Name="ListUL" colour="transparent" />
          </div>
          <div className="delivery__sectionMain" style={{ width: '100%' }}>
            <Link to="/restaurant/ordertakeout">
              <p>TAKEOUT MENU</p>
            </Link>
            <Link to="/restaurant" className="delivery__flex2">
              <div className="check3">
                <Icon Name="RArrowWhite" colour="transparent" />
              </div>
            </Link>
            <a href={Pdf} target="_blank" rel="noreferrer">
              <p className="dinein">DINE-IN MENU</p>
            </a>
          </div>
        </div>
      </div>
    </DeliveryDineinContainer>
  );
}
const DeliveryDineinContainer = styled.div`
  width: 100%;
  height: 95vh;
  background: #333333;
  .delivery {
    &__container {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: #333333;
      display: flex;
      flex-direction: column;
    }
    &__flex {
      display: flex;
      width: 95%;
      margin-top: 100px;
      margin-left: 40px;
      align-items: center;

      @media (max-width: 768px) {
        display: none;
      }
    }

    &__flex2 {
      display: none;

      @media (max-width: 768px) {
        font-size: 50px;
        display: block;
      }
    }
    &__flex > p {
      padding-left: 20px;
      font-size: 16px;
      color: #dfc09a;
    }
    &__section {
      width: 900px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      @media (max-width: 768px) {
        width: 450px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 5rem;
      }
    }

    &__sectionMain {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    &__sectionMain > a > p {
      font-family: Space Grotesk;
      font-size: 90px;
      font-style: normal;
      font-weight: 700;
      line-height: 122px;
      letter-spacing: 0em;
      text-align: center;
      margin-left: 4rem;
      margin-right: 4rem;
      -webkit-text-fill-color: transparent;
      -webkit-text-stroke-width: 1px;
      -webkit-text-stroke-color: #b29a7b;
      cursor: pointer;

      &:hover {
        -webkit-text-fill-color: #dfc09a;
        -webkit-text-stroke-width: 1px;
        -webkit-text-stroke-color: #dfc09a;
      }
      @media (max-width: 768px) {
        font-size: 50px;
      }
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
    color: #fff;
  }

  .check3 {
    width: 4rem;
    height: 4rem;
    border: 2px solid #dfc09a;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: #fff;
    background: #dfc09a;
  }

  .check2 {
    width: 5rem;
    height: 5rem;
    border: 2px solid #dfc09a;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: #fff;
    margin-bottom: 90px;

    @media (max-width: 768px) {
      margin-top: 80px;
    }
  }
  .dinein {
    @media (max-width: 768px) {
      margin-top: 150px;
    }
  }
`;
export default DeliveryDinein;
