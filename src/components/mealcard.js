import React, { useState } from 'react';
import styled from 'styled-components';
import Icon from './icon';

function Mealcard({
  Image,
  text,
  icon = '',
  className1,
  className2,
  className3,
  innerText,
  price,
  handleClick,
}) {
  const [hover, setHover] = useState(false);
  return (
    <MealCardContainer
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
    >
      <img src={Image} alt="gallery" />
      <div className={className1}>
        <div className={className2}>
          <p>{text}</p>
          <div className={className3}>
            <p>{price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
            <div className="icon_cont">
              <Icon
                Name={hover ? 'PlusDark' : 'Plus2'}
                width="20px"
                className="icon"
              />
            </div>
          </div>
        </div>
        <p>{innerText}</p>
      </div>
    </MealCardContainer>
  );
}

const MealCardContainer = styled.div`
  display: flex;
  gap: 14.4px;
  border-bottom: 1px solid gray;
  min-height: 11.9rem;
  transition: transform 0.2s;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
      rgba(0, 0, 0, 0.22) 0px 10px 10px;
    cursor: pointer;
    .icon_cont {
      background: #dfc09a;
      color: #000;
    }
    .icon {
      color: #000;
    }
  }

  .icon_cont {
    height: 20px;
    width: 20px;
    border: 1px solid #dfc09a;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (min-width: 1024px) {
    border: 1px solid gray;
    width: 48%;
  }
`;
export default Mealcard;
