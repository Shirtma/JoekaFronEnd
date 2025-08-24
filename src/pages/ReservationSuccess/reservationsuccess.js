import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../components/button";
import Icon from "../../components/icon";
import { useProductsContext } from "../../context/products_context";
import colours from "../../lib/colours";

const Reservationsuccess = () => {
  const [hover, setHover] = useState(false);
  const { reserveData } = useProductsContext();
  console.log(reserveData);
  return (
    <ReservationContainer hover={hover}>
      <div className="reservation__wrapper">
        <div className="reservation__container">
          <div
            // style={{
            //   marginBottom: "24px",
            //   height: "48px",
            //   width: "48px",
            //   borderRadius: "50%",
            //   background: "#DFC09A",
            //   display: "flex",
            //   alignItems: "center",
            //   justifyContent: "center",
            // }}
            className="reservation__round"
          >
            <Icon Name="Tick" colour="transparent" width="45px" />
          </div>
          <div className="reservation__reservation">
            <h1>Reservation request sent successfully</h1>
          </div>
          <div className="reservation__reservation reservation__mb">
            <p>Your reservation info has been sent to your email</p>
          </div>
          <div className="reservation__reservation reservation__mt">
            <h1>RESERVATION DETAILS</h1>
          </div>
          <div className="reservation__details">
            <Icon Name="UsersG" colour="transparent" width="35px" />
            <strong>Space:</strong>
            <p>{reserveData?.data?.space}</p>
          </div>
          <div className="reservation__details">
            <Icon Name="ClockG" colour="transparent" width="35px" />
            <strong>Time:</strong>
            <p>{reserveData?.data?.time}</p>
          </div>
          <div className="reservation__details">
            <Icon Name="CalendarG" colour="transparent" width="35px" />
            <strong>Date:</strong>
            <p>{reserveData?.data?.date}</p>
          </div>
          <div className="reservation__details">
            <Icon Name="UsersG" colour="transparent" width="35px" />
            <strong>Guests:</strong>
            <p>{reserveData?.data?.guests}</p>
          </div>
          <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="reservation__form-btn"
          >
            <a href='/rooms'>
              <Button
                text="OK"
                textClassName="tertiary-text"
                backgroundColour={
                  hover ? colours.primarygold700 : colours.primarygold600
                }
                iconColour={colours.primarygold100}
                width="14rem"
              />
            </a>
          </div>
        </div>
      </div>
    </ReservationContainer>
  );
};

const ReservationContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #fcf9f5;

  .reservation {
    &__wrapper {
      width: 43.8rem;
      //   background: red;
      height: 80vh;
      margin: 7.2rem auto;
    }
    &__container {
      width: 100%;
      height: 100%;
      padding-top: 7rem;

      @media only screen and (max-width: 481px) {
        padding-top: 4rem;
      }
    }

    &__reservation {
      width: 438px;
      margin-bottom: 1.5rem;

      @media only screen and (max-width: 481px) {
        width: 34.3rem;
        margin-left: 3rem;
      }
    }
    &__mb {
      margin-bottom: 4rem;
    }

    &__reservation > h1 {
      font-family: Space Grotesk;
      font-size: 40px;
      font-style: normal;
      font-weight: 300;
      line-height: 48px;
      letter-spacing: 0em;
      text-align: left;
    }
    &__reservation > p {
      font-family: Space Grotesk;
      font-size: 16px;
      font-style: normal;
      font-weight: 300;
      line-height: 28px;
      letter-spacing: 0em;
      text-align: left;
    }

    &__round {
      margin-bottom: 24px;
      height: 48px;
      width: 48px;
      border-radius: 50%;
      background: #dfc09a;
      display: flex;
      align-items: center;
      justify-content: center;

      @media only screen and (max-width: 481px) {
        margin-left: 3rem;
      }
    }
    &__mt {
      //   margin-top: 2.5rem;
    }
    &__mt > h1 {
      font-family: Space Grotesk;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 32px;
      letter-spacing: 0em;
      text-align: left;
    }
    &__details {
      display: flex;
      justify-content: space-between;
      width: fit-content;
      align-items: center;
      margin-bottom: 1rem;

      @media only screen and (max-width: 481px) {
        margin-left: 2.5rem;
      }
    }
    &__details > p {
      font-family: Montserrat;
      font-size: 14px;
      font-style: normal;
      line-height: 17px;
      letter-spacing: 0em;
      //   text-align: left;
      padding-left: 1rem;
    }
    &__details > strong {
      font-family: Montserrat;
      font-size: 14px;
      font-style: normal;
      line-height: 17px;
      letter-spacing: 0em;
      text-align: left;
      padding-left: 1rem;
    }

    &__form-btn {
      margin-top: 6rem;
      cursor: pointer;

      @media only screen and (max-width: 481px) {
        margin-left: 2.5rem;
      }
    }
  }
  .tertiary-text {
    color: ${({ hover }) => (hover ? "#fff" : "#000")};
    font-weight: ${({ hover }) => (hover ? "bold" : "normal")};
  }
`;

export default Reservationsuccess;
