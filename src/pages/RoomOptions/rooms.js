import React from "react";
import styled from "styled-components";
// import Icon from "../../components/icon";


import RoomComp from "./roomComp";
import { products } from "./data";

const Rooms = () => {

  console.log("products", products);

  return (
    <RoomsContainer>
      <div className="rooms__wrapper">
        <div className="rooms__container">
          <div className="rooms__div">
            {products?.map((item, index) => (
              <RoomComp
                key={index}
                Image={item?.image}
                spaceId={item?.id}
                amount={item?.price}
                title={item?.name}
                desc={item?.description}
              />
            ))}
          </div>
          <p>
            Our collections are crafted for trendsetters who want to express
            themselves with confidence. Each piece is designed to be worn
            anywhere — whether you’re out with friends, at an event, or just
            catching a vibe. With styles that mix comfort and creativity, our
            brand makes sure you always look and feel your best.
          </p>
        </div>
      </div>
    </RoomsContainer>
  );
};

const RoomsContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 40px 24px;

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
      // overflow-y: auto;
      margin-top: 7.2rem;
    }

    &__div {
      width: 100%;
      margin-bottom: 4rem;
      margin-top: 4rem;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }
    &__container > p {
      font-family: "Space Grotesk", sans-serif;
      font-size: 3.2rem;
      font-style: normal;
      font-weight: 400;
      line-height: 48px;
      letter-spacing: 0em;
      text-align: left;
      margin: 4rem;
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
