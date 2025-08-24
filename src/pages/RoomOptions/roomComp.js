import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Icon from '../../components/icon';
import colours from '../../lib/colours';
import { useProductsContext } from '../../context/products_context';

function RoomComp({ text, Image, spaceId }) {
  const [display, setDisplay] = useState(false);
  const { setRoomText } = useProductsContext();

  return (
    <RoomCont>
      <div className="room__flex">
        <div
          onMouseEnter={() => setDisplay(true)}
          onMouseLeave={() => setDisplay(false)}
        >
          <Link onClick={() => setRoomText(text)} to={`rooms/space/${spaceId}`}>
            {text}
          </Link>
        </div>
        {display && (
          <div className="room__iconCont">
            <Icon
              Name="ArrowRightWhite"
              colour={colours.neutral1}
              style={{ zIndex: 2 }}
            />
          </div>
        )}
        {display && <img src={Image} alt="gallery" />}
      </div>
    </RoomCont>
  );
}

const RoomCont = styled.div`
  .room {
    &__flex {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
      position: relative;
      width: 90%;
      margin: 0 auto;
      text-align: center;

      @media only screen and (max-width: 768px) {
        flex-direction: column;
        margin-bottom: 10rem;
      }
    }
    &__flex > div {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &__flex > div > a {
      z-index: 2;
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
      text-transform: uppercase;

      @media only screen and (max-width: 768px) {
        font-family: Space Grotesk;
        font-size: 48px;
        font-style: normal;
        font-weight: 700;
        line-height: 61px;
        letter-spacing: 0em;
        text-align: center;
      }

      &:hover {
        -webkit-text-fill-color: #dfc09a;
        -webkit-text-stroke-width: 1px;
        -webkit-text-stroke-color: #dfc09a;
      }
    }

    &__iconCont {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: #dfc09a;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
    }
  }

  img {
    width: 50rem;
    height: 34rem;
    position: absolute;
    z-index: 1;
    transform: translateX(72%);
    object-fit: cover;

    @media only screen and (max-width: 768px) {
      transform: translateX(0%);
      position: fixed;
      width: 100%;
      height: 90vh;
      top: 7.2rem;
    }
  }
`;

export default RoomComp;
