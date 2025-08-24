import React from 'react';
import styled from 'styled-components';
import Icon from './icon';

function Badges({
  text, background, price, icon = '', color,
}) {
  return (
    <BadgeCont className={`sidebar__card ${background}`}>
      <p>{text}</p>
      <div className="sidebar__cardFlex">
        {icon ? (
          <Icon Name={icon} colour={color} width="20px" />
        ) : (
          <>
            <p
              style={{
                color,
                marginRight: '0.3rem',
              }}
            >
              &#8358;
            </p>
            <p>{price}</p>
          </>
        )}
      </div>
    </BadgeCont>
  );
}

export const BadgeCont = styled.div`
  .sidebar {
    &__card {
      display: flex;
      height: 4.4rem;
      width: 311px;
      border-radius: 0px;
      border: 1px solid #ddd;
      margin: 0 auto;
      justify-content: space-between;
      /* padding-left: 1.5rem;
      padding-right: 1.5rem; */
      align-items: center;
      /* margin-bottom: 10px; */
    }

    &__card > p {
      font-size: 1.4rem;
      font-family: Space Grotesk;
      font-style: normal;
      font-weight: 400;
      line-height: 18px;
      letter-spacing: 0em;
      text-align: left;
    }

    &__image {
      object-fit: cover;
      height: 1.5rem;
      width: 1.5rem;
      margin-right: 0.5rem;
    }
  }

  .transparent {
    background: transparent;
  }

  .grey {
    background: #4d4d4d;
    color: #fff;
  }
  .golden {
    background: #dfc09a;

    &:hover {
      cursor: pointer;
    }
  }
`;

export default Badges;
