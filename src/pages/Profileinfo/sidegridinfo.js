import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/icon';

function Sidegridinfo({ activeTab = 0 }) {
  return (
    <div className="profile__gridLeft">
      <div className="profile__foodDish">
          {activeTab === 0 && (
          <div className="check3">
            <Icon Name="ArrowDown" colour="#000" width="20px" />
          </div>
        )}

        <Link to="/profile">
          <p style={{ fontWeight: activeTab === 0 ?  700 : 400 }}>MY PROFILE</p>
        </Link>
      </div>
      <div className="profile__foodDish">
        {activeTab === 1 && (
          <div className="check3">
            <Icon Name="ArrowDown" colour="#000" width="20px" />
          </div>
        )}

        <Link to="/profile/orders">
          <p style={{ fontWeight: activeTab === 1 ?  700 : 400 }}>MY ORDERS</p>
        </Link>
      </div>
    </div>
  );
}

export default Sidegridinfo;
