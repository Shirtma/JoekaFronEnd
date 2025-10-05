import styled from "styled-components";
import { Link } from "react-router-dom";
import colours from "../../lib/colours";
import LinkButton from "../../components/linkButton";

function RoomComp({ Image, id, amount, title, desc }) {
  return (
    <RoomCont>
      <Link to={`/shop/product/${id}`} className="room__flex">
        <img src={Image} alt={title} />
        <div className="room__flex__text">
          <h1>{title}</h1>
          <p>{desc}</p>
          <div>
            <p style={{ color: "#333" }}>₦{amount}</p>
            <LinkButton
              to={`/shop/product/${id}`}
              label="View Details"
              onClick={(e) => e.stopPropagation()}
              className={"view__details-btn"}
            />
          </div>
        </div>
      </Link>
    </RoomCont>
  );
}

const RoomCont = styled.div`
  width: 100%;
  height: auto;

  .room__flex {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    margin: 0 auto;
    text-align: center;
    height: 45rem;
    border-radius: 12px;
    border: 1px solid #b29a7b;
    overflow: hidden;
    cursor: pointer;
    background: #fff;
    text-decoration: none;
    color: #0a0a0a;

    @media only screen and (max-width: 768px) {
      height: 35rem;
      border-radius: 8px;
    }

    @media only screen and (max-width: 480px) {
      height: 30rem;
      border-radius: 6px;
    }

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);

      @media only screen and (max-width: 480px) {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      }
    }

    &__text {
      position: absolute;
      bottom: 8px;
      right: 8px;
      left: 8px;
      display: flex;
      padding: 12px;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      gap: 8px;
      background: #fcf9f5;
      backdrop-filter: blur(4px);
      border-radius: 8px;
      color: ${colours.primarygrey900};
      min-height: 80px;
      transition: all 0.3s ease;
      z-index: 2;

      @media only screen and (max-width: 768px) {
        padding: 10px;
        gap: 6px;
        min-height: 70px;
        border-radius: 6px;
        bottom: 6px;
        right: 6px;
        left: 6px;
      }

      @media only screen and (max-width: 480px) {
        padding: 8px;
        gap: 4px;
        min-height: 60px;
        border-radius: 4px;
        bottom: 4px;
        right: 4px;
        left: 4px;
      }

      h1 {
        font-family: "Space Grotesk", sans-serif;
        font-size: 2rem;
        font-style: normal;
        font-weight: 500;
        line-height: 1.3;
        letter-spacing: -0.02em;
        text-align: left;
        margin: 0;
        color: #333;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;

        @media only screen and (max-width: 768px) {
          font-size: 1.6rem;
          line-height: 1.2;
          -webkit-line-clamp: 1;
        }

        @media only screen and (max-width: 480px) {
          font-size: 1.4rem;
          line-height: 1.2;
        }
      }

      p {
        font-family: "Montserrat", sans-serif;
        font-size: 1.4rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.4;
        letter-spacing: 0em;
        text-align: left;
        margin: 0;
        color: #666;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;

        @media only screen and (max-width: 768px) {
          font-size: 1.2rem;
          line-height: 1.3;
          -webkit-line-clamp: 1;
        }

        @media only screen and (max-width: 480px) {
          font-size: 1.1rem;
          line-height: 1.3;
        }
      }

      div {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: auto;

        p {
          font-family: "Montserrat", sans-serif;
          font-size: 1.8rem;
          font-style: normal;
          font-weight: 600;
          line-height: 1.2;
          letter-spacing: 0em;
          text-align: left;
          margin: 0;
          color: #f8f8f5;
          display: block;
          -webkit-line-clamp: unset;
          -webkit-box-orient: unset;
          overflow: visible;
          text-overflow: unset;

          @media only screen and (max-width: 768px) {
            font-size: 1.6rem;
          }

          @media only screen and (max-width: 480px) {
            font-size: 1.4rem;
          }
        }
      }
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    &:hover img {
      transform: scale(1.05);
    }
  }
  .view__details-btn {
    background: rgba(245, 236, 225, 0.95);
    border-radius: 4px; 
  }
`;

export default RoomComp;
