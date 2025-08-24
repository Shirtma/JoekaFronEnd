import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/icon';

function Sidegrid() {
  return (
    <div
      style={{
        fontFamily: 'Space Grotesk',
      }}
      className="profile__gridLeft"
    >
      <div className="profile__foodDish">
        {false && (
          <div className="check3">
            <Icon Name="RArrowWhite" colour="transparent" width="20px" />
          </div>
        )}
        <Link to="/profileinfo">
          <p>MY PROFILE</p>
        </Link>
      </div>
      <div className="profile__foodDish">
        <div className="check3">
          <Icon Name="RArrowWhite" colour="transparent" width="20px" />
        </div>

        <Link to="/profile/orders">
          <p>MY ORDERS</p>
        </Link>
      </div>
    </div>
  );
}

export default Sidegrid;
