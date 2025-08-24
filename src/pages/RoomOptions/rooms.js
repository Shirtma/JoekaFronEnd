import React, { useState } from "react";
import styled from "styled-components";
// import Icon from "../../components/icon";

import { Link } from "react-router-dom";

import RoomComp from "./roomComp";
import Icon from "../../components/icon";
import { useProductsContext } from "../../context/products_context";

const Rooms = () => {
  const [isHover, setHover] = useState(false);
  const { spaces } = useProductsContext();

  return (
    <RoomsContainer>
      <div className="rooms__wrapper">
        <div className="rooms__container">
          <div className="rooms__div">
            {spaces?.map((space, index) => (
              <RoomComp
                key={index}
                text={space.space}
                Image={space.image1}
                spaceId={space.id}
              />
            ))}
          </div>
          <p>
            Our Spaces are creative rooms for The House friends to visit with up
            to two or more guests. Friends can eat and drink, party, meet up and
            catch-a-vibe.
          </p>
          <Link to="register">
            <div
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              className="rooms__btnCont"
            >
              <p className="hovered">Become a member</p>
              <Icon
                Name={isHover ? "ArrowRightGold" : "ArrowRightWhite"}
                colour="transparent"
                width="2.5rem"
              />
            </div>
          </Link>
        </div>
      </div>
    </RoomsContainer>
  );
};

const RoomsContainer = styled.div`
  position: relative;
  width: 100%;

  @media only screen and (max-width: 768px) {
    height: 300vh;
  }

  .rooms {
    &__wrapper {
      // position: absolute;
      // top: 0;
      // bottom: 0;
      // left: 0;
      // right: 0;
      // background: #fcf9f5;
      // display: flex;
      // flex-direction: column;
      // padding: 3rem;
      // padding-bottom: 10rem;
    }
    &__container {
      width: 100%;
      height: 100%;
      overflow-y: auto;
      margin-top: 7.2rem;
    }

    &__div {
      margin-bottom: 12rem;
      margin-top: 12rem;
    }
    &__container > p {
      font-family: "Space Grotesk", sans-serif;
      font-size: 4rem;
      font-style: normal;
      font-weight: 400;
      line-height: 48px;
      letter-spacing: 0em;
      text-align: left;
      margin-left: 4rem;
      margin-right: 4rem;
    }
    &__btnCont {
      height: 4.8rem;
      width: 256px;
      padding: 8px 16px 8px 16px;
      background: #000000;
      margin: 2rem 4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      margin-left: 4rem;
      margin-right: 4rem;

      &:hover {
        .hovered {
          color: #dfc09a;
        }
      }
    }
    &__btnCont > p {
      font-family: "Montserrat", sans-serif;
      font-size: 1.4rem;
      font-style: normal;
      font-weight: 400;
      line-height: 17px;
      letter-spacing: 0em;
      text-align: left;
      color: #fff;
      text-transform: uppercase;
    }
  }
`;

export default Rooms;
