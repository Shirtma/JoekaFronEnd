import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../../components/icon';
import Profileorders from './profileorders';

function ProfileOrderComp() {
  return (
    <ProfileContainer>
      <div className="profile__container">
        <Link to="/restaurant" className="profile__flex">
          <div className="check">
            <Icon Name="ArrowLeft" colour="transparent" />
          </div>
          <p>Back</p>
        </Link>
        <div className="profile__mainSection">
          <div className="profile__gridCont">
            <Profileorders />
          </div>
        </div>
      </div>
    </ProfileContainer>
  );
}

const ProfileContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  .profile {
    &__container {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: #fcf9f5;
      display: flex;
      flex-direction: column;

      @media (max-width: 768px) {
        margin: 0 auto;
        width: 90rem;
        height: 250vh;
        display: flex;
        // padding-bottom: 2rem;
      }
    }
    &__flex {
      display: flex;
      width: 95%;
      margin-top: 10rem;
      margin-left: 4rem;
      align-items: center;
      margin-bottom: 10rem;
    }

    &__flex > p {
      padding-left: 2.6rem;
      font-size: 1.6rem;
      text-transform: uppercase;
      color: #000;
    }
    &__mainSection {
      width: 80rem;
      height: 100%;
      margin: 0 auto;
    }
    &__foodDish {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2rem;
    }

    &__foodDish:hover {
      font-weight: 700;
      cursor: pointer;
    }

    &__foodDish > a {
      font-size: 1.6rem;
      text-transform: uppercase;
      margin-left: 1rem;
      color: #000;
      cursor: pointer;

      &:hover {
        font-weight: 700;
      }
    }

    &__gridCont {
      display: grid;
      grid-template-columns: 20% 80%;
      grid-gap: 4rem;

      @media (max-width: 768px) {
        grid-template-columns: 100%;
      }
    }

    &__gridLeft {
      display: flex;
      flex-direction: column;
      align-items: center;

      @media (max-width: 768px) {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        width: 40%;
        margin-right: auto;
      }
    }

    &__gridRight {
    }

    &__gridItemContainer {
      height: 450px;
      overflow-y: auto;
    }

    &__gridRight > span {
      font-family: Space Grotesk;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 28px;
      letter-spacing: 0em;
      text-align: left;
    }

    &__gridRight > p {
      font-family: Space Grotesk;
      font-size: 4rem;
      font-style: normal;
      font-weight: 400;
      line-height: 48px;
      letter-spacing: 0em;
      text-align: left;
    }

    &__form {
      display: grid;
      grid-template-columns: 50% 50%;
      margin-top: 20px;
    }
    &__a {
      width: 70%;
      //   background: blue;
    }
    &__a > p {
      font-family: Space Grotesk;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 28px;
      letter-spacing: 0em;
      text-align: left;
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
    width: 3rem;
    height: 3rem;
    border: 2px solid #dfc09a;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: #fff;
    background: #dfc09a;

    @media (max-width: 768px) {
      display: none;
    }
  }

  .check4 {
    display: none;

    @media (max-width: 768px) {
      width: 3rem;
      height: 3rem;
      border: 2px solid #dfc09a;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      color: #fff;
      background: #dfc09a;
    }
  }

  a {
    text-decoration: none;
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

export default ProfileOrderComp;
