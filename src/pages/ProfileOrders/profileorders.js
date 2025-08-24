/* eslint-disable no-unused-vars */
import React from "react";
import Button from "../../components/button";
import colours from "../../lib/colours";
import { Link } from "react-router-dom";
import { useProductsContext } from "../../context/products_context";

const Profileorders = () => {
  const { orderHistory, quantity } = useProductsContext();
  const history = orderHistory?.data;
  // console.log(
  //   history[history.length - 1].orderHistoryDetails[
  //     history[history.length - 1].orderHistoryDetails.length - 1
  //   ].image
  // );
  return (
    <div className="profile__gridRight">
      <p>Orders</p>
      <span>See your purchase history below</span>
      {history?.length === 0 && (
        <div className="profile__a">
          <p style={{ margin: "20px 0" }}>
            There are no orders in your history
          </p>
          <Link to="/restaurant/ordertakeout">
            <Button
              text="MAKE YOUR FIRST ORDER"
              backgroundColour="#000000"
              iconColour={colours.primarygold100}
              width="23.1rem"
              className="btn"
              textClassName="text"
            />
          </Link>
        </div>
      )}
      <div className="profile__gridItemContainer">
        {history &&
          history?.map((hist, index) => (
            <div
              key={index}
              style={{
                width: "48rem",
                height: "9.6rem",
                padding: "1.6rem",
                background: "#fff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "1.6rem",
              }}
              className="profile__orderContainer"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "60%",
                }}
                className="profile__orderLeft"
              >
                <img
                  style={{
                    width: "7rem",
                    height: "6.5rem",
                    objectFit: "cover",
                    borderRadius: "1rem",
                  }}
                  src={hist?.orderHistoryDetails[0]?.image}
                  alt="gallery"
                />
                <div
                  style={{
                    width: "3.2rem",
                    height: "3.2rem",
                    background: "#ddd",
                    borderRadius: "2.4rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "Space Grotesk",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: "400",
                      lineHeight: "1.8rem",
                      textAlign: "left",
                    }}
                  >
                    +{hist?.orderHistoryDetails?.length}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "Space Grotesk",
                      fontSize: "1.6rem",
                      fontStyle: "normal",
                      fontWeight: "400",
                      lineHeight: "2rem",
                      textAlign: "left",
                    }}
                  >
                    Order Date
                  </p>
                  <span
                    style={{
                      fontFamily: "Montserrat",
                      fontSize: "1.2rem",
                      fontStyle: "normal",
                      fontWeight: "300",
                      lineHeight: "1.9rem",
                    }}
                  >
                    {hist?.orderDate?.slice(0, 10).replace(/[-]/g, "/")}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    //   alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "Space Grotesk",
                      fontSize: "1.6rem",
                      fontStyle: "normal",
                      fontWeight: "400",
                      lineHeight: "2rem",
                      textAlign: "left",
                    }}
                  >
                    Order No.
                  </p>
                  <span
                    style={{
                      fontFamily: "Montserrat",
                      fontSize: "1.2rem",
                      fontStyle: "normal",
                      fontWeight: "300",
                      lineHeight: "1.9rem",
                    }}
                  >
                    {hist.orderId}
                  </span>
                </div>
              </div>
              <div className="profile__orderRight">
                <Link to={`/viewinfo/${hist?.transRef}`}>
                  <Button
                    text="VIEW ORDER"
                    backgroundColour="#000"
                    iconColour={colours.primarygold100}
                    width="13.1rem"
                    style={{ color: "#000", border: "1px solid #000" }}
                    className="btn"
                    textClassName="text"
                  />
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Profileorders;
