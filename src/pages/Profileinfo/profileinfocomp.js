import React from 'react';
import { Link, useRouteMatch, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../../components/icon';
import Profileinfo from './profileinfo';
import Profileorders from '../ProfileOrders/profileorders';
import Sidegridinfo from './sidegridinfo';

function ProfileInfoComp() {
  const match = useRouteMatch();

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
            <Sidegridinfo activeTab={window.location.href.includes('orders') ? 1 : 0}/>
            <Switch>
              <Route exact path={match.path} component={Profileinfo} />
              <Route path={match.path +'/orders'} component={Profileorders} />
            </Switch>
          </div>
        </div>
      </div>
    </ProfileContainer>
  );
}

const ProfileContainer = styled.div`
  position: relative;
  width: 100%;

  .profile {
    &__container {
      background: #fcf9f5;
      display: flex;
      flex-direction: column;
      padding: 16px;

      @media (min-width: 768px) {
        margin: 0 auto;
        display: flex;
        padding-bottom: 2rem;
      }
    }
    &__flex {
      display: flex;
      width: 100%;
      align-items: center;
      margin-bottom: 32px;
      @media (min-width: 1024px) {
        padding: 0rem 2.5rem;
      }
    }

    &__flex > p {
      padding-left: 2.6rem;
      font-size: 1.6rem;
      text-transform: uppercase;
      color: #000;
    }
    &__mainSection {
      width: 100%;
      min-height: 70vh;
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
      display: flex;
      flex-direction: column;
      width: 100%;
      margin: 0 auto;

      @media (min-width: 1024px) {
        width: 700px;
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 101px;
      }
    }

    &__gridLeft {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 32px;

      @media (min-width: 1024px) {
        align-items: center;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        grid-column: 1 / 3;
      }
    }

    &__gridRight {
      width: 100%;
      @media (min-width: 1024px){
        grid-column: 3 / -1;
        .update-info-btn {
          width: 153px;
        }
      }
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

    &__a {
      width: 100%;
      margin-top: 3rem;

      .profile__first-row {
        @media (min-width: 1024px) {
          display: flex;
          gap: 24px;
        }
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
    width: 3rem;
    height: 3rem;
    border: 2px solid #dfc09a;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: #fff;
    background: #dfc09a;

    @media (min-width: 1024px) {
      transform: rotate(-90deg);
    }
  }

  a {
    text-decoration: none;
  }
`;

export default ProfileInfoComp;
