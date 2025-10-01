import styled from "styled-components";
import { Link } from "react-router-dom";
import colours from "../../lib/colours";
import LinkButton from "../../components/linkButton";

function RoomComp({ Image, spaceId, amount, title, desc }) {
  return (
    <RoomCont>
      <div className="room__flex">
        <Link to={`/shop/product/${spaceId}`} className="room__flex__text">
          <h1>{title}</h1>
          <p>{desc}</p>
          <div>
            <p>₦{amount}</p>
            <LinkButton to={`/shop/product/${spaceId}`} label="View Details" />
          </div>
        </Link>
        <img src={Image} alt={title} />
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
      text-align: center;
      min-height: 2rem;
      height: 50rem;
      max-height: 50rem;
      border-radius: 8px;
      border: 1px solid #b29a7b;
      overflow: hidden;
      cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      }

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
        text-decoration: none;

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
        height: auto;
        max-height: 50rem;
        object-fit: cover;
      }
    }
  }
`;

export default RoomComp;
