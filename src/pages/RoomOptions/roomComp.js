import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import colours from "../../lib/colours";
import LinkButton from "../../components/linkButton";
// import { useProductsContext } from '../../context/products_context';

function RoomComp({ Image, spaceId, amount, title, desc }) {
  // const navigate = useNavigate();
  // const { setRoomText } = useProductsContext();

  return (
    <RoomCont>
      <div className="room__flex">
        <Link
          className="room__flex__text"
          // onClick={() => navigate(`rooms/space/${spaceId}`)}
        >
          <h1>{title}</h1>
          <p>{desc}</p>
          <div>
            <p>₦{amount}</p>
            <LinkButton to='#' label="Add to cart" />
          </div>
        </Link>
        <img src={Image} alt="gallery" />
      </div>
    </RoomCont>
  );
}

const RoomCont = styled.div`
  .room {
    width: 100%;
    height: auto;

    &__flex {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      margin-bottom: 10px;
      position: relative;
      margin: 0 auto;
      text-align: center;_
      min-height: 2rem;
      height: 50rem;
      max-height: 50rem;
      border-radius: 8px;
      border: 1px solid #b29a7b;
      overflow: hidden;

      &__text {
        position: absolute;
        bottom: 10px;
        right: 10px;
        left: 10px;
        display: flex;
        padding: 8px;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        gap: 10px;  
        background: #f5ece1;
        border-radius: 8px;
        color: ${colours.primarygrey900};
        min-height: 50px;

        h1 {
          font-family: "Space Grotesk", sans-serif;
          font-size: 24px;
          font-style: normal;
          font-weight: 400;
          line-height: 32px;
          letter-spacing: 0em;
          text-align: left;
          margin: 0;
        }
        p {
          font-family: "Montserrat", sans-serif;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 24px;
          letter-spacing: 0em;
          text-align: left;
          margin: 0;
        }
        div {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          
          p {
            font-family: "Montserrat", sans-serif;
            font-size: 20px;
            font-style: normal;
            font-weight: 400;
            line-height: 24px;
            letter-spacing: 0em;
            text-align: left;
            margin: 0;
          }
        }
      }

              img {
     display: block;
    width: 100%;
    heigh: auto;
    max-height: 50rem;
    object-fit: contain;
  }

    }

  }


`;

export default RoomComp;
