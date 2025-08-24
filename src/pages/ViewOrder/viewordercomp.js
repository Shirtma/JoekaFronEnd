/* eslint-disable no-unused-vars */
import axios from "axios";
import React, {useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import Icon from "../../components/icon";
import styled from "styled-components";
import verve from "../../images/verve.jpeg";
import MealSummary from "../../components/mealsummary";
import { useProductsContext } from "../../context/products_context";

const ViewOrderComp = () => {
  const [orderDetails, setOrderDetails] = useState([])
  let params = useParams();
  console.log(params)

  const fetchOrderHistory = async () => {
    try {
      const response = await axios.get(`https://api.thehouseng.com/api/v1/order/details/${params.ref}` , {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      const history = response.data;
      console.log(history)
      setOrderDetails(history.data);
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    // eslint-disable-next-line
    fetchOrderHistory();
    // eslint-disable-next-line
  }, [params.ref]);
  console.log(orderDetails)
  

  return (
    <ProfileContainer>
      <div className="profile__container">
        <div className="profile__cont">
          <Link to="/profile/orders" className="profile__flex">
            <div className="check">
              <Icon Name="Times" colour="transparent" />
            </div>
            <p>Close</p>
          </Link>
          <div className="profile__mainSection">
            {/* {orderDetails.map((hist) => ( */}
            {orderDetails  && (
              <div className="profile__gridCont">
                <div>
                  <div className="profile__top">
                    <p>Order</p>
                    <span>{orderDetails?.orderId}</span>
                  </div>
                  <div
                    style={{
                      width: "70rem",
                      height: "24.2rem",
                      background: "#fff",
                      padding: "24px",
                      fontFamily: "Space Grotesk",
                      marginBottom: "14px",
                    }}
                  >
                    <div
                      style={{
                        //   marginLeft: "30px",
                        //   marginTop: "13px",
                        marginBottom: "24px",
                        height: "48px",
                        width: "48px",
                        borderRadius: "50%",
                        background: "#DFC09A",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      className="checkout__round"
                    >
                      <Icon Name="Tick" colour="transparent" width="45px" />
                    </div>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#000",
                        //   marginLeft: "30px",
                      }}
                    >
                      ORDER CONFIRMED
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#000",
                        marginTop: "20px",
                        marginBottom: "24px",
                        //   marginLeft: "30px",
                      }}
                    >
                      Thank you for your order. See the details below.
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        //   marginLeft: "30px",
                      }}
                      className="checkout__detailFlex"
                    >
                      <div
                        style={{
                          paddingRight: "30px",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "16px",
                            color: "#000",
                            marginTop: "20px",
                            marginBottom: "10px",
                          }}
                        >
                          Email
                        </p>
                        <span
                          style={{
                            fontFamily: "Montserrat",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: "300",
                            lineHeight: "17px",
                            color: "#4d4d4d",
                          }}
                        >
                          {orderDetails?.email}
                        </span>
                      </div>
                      <div
                        style={{
                          paddingRight: "30px",
                          //     fontSize: "14px",
                          //   color: "#fff",
                          //   marginTop: "20px",
                          //   marginBottom: "24px",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "16px",
                            color: "#000",
                            marginTop: "20px",
                            marginBottom: "10px",
                          }}
                        >
                          Phone Number
                        </p>
                        <span
                          style={{
                            fontFamily: "Montserrat",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: "300",
                            lineHeight: "17px",
                            color: "#4d4d4d",
                          }}
                        >
                          {orderDetails?.phoneNumber}
                        </span>
                      </div>
                      <div
                        style={{
                          paddingRight: "30px",
                          //     fontSize: "14px",
                          //   color: "#fff",
                          //   marginTop: "20px",
                          //   marginBottom: "24px",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "16px",
                            color: "#000",
                            marginTop: "20px",
                            marginBottom: "10px",
                          }}
                        >
                          Order Date
                        </p>
                        <span
                          style={{
                            fontFamily: "Montserrat",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: "300",
                            lineHeight: "17px",
                            color: "#4d4d4d",
                          }}
                        >
                          {orderDetails?.orderDate?.slice(0, 10)
                            .replace(/[-]/g, "/")}
                        </span>
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: "16px",
                            color: "#000",
                            marginTop: "20px",
                            marginBottom: "10px",
                          }}
                        >
                          Order No
                        </p>
                        <span
                          style={{
                            fontFamily: "Montserrat",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: "300",
                            lineHeight: "17px",
                            color: "#4d4d4d",
                          }}
                        >
                          {orderDetails?.orderId}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="profile__orderTop">
                    <div className="profile__orderContainer">
                      <p style={{ fontSize: "14px", color: "#fff" }}>
                        ORDER SUMMARY
                      </p>
                      <div className="profile__orderCont">
                        {orderDetails?.orderHistoryDetails?.map((c, index) => (
                          <MealSummary key={index}
                            Image={c.image}
                            text1={c.menuItem}
                            text2={c.description.slice(0, 80)}
                            price={c.amount}
                          />
                        ))}
                      </div>

                      <div className={`profile__card golden`}>
                        <p>Total</p>
                        <div className="profile__cardFlex">
                          <p>&#8358;</p>
                          <p>{orderDetails?.totalAmount}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      height: "16rem",
                      width: "70rem",
                      background: "#fff",
                      marginTop: "10px",
                      padding: "24px",
                    }}
                    className="profile__midGridCont"
                  >
                    <div className="profile__midWrap">
                      <p
                        style={{
                          color: "#000",
                          fontSize: "16px",
                          lineHeight: "20.5px",
                          fontWeight: "400",
                          fontFamily: "Space Grotesk",
                          marginBottom: "30px",
                        }}
                      >
                        SHIPPING & DELIVERY
                      </p>

                      <div className="profile__detailsTop">
                        <p
                          style={{
                            color: "#4D4D4D",
                            fontSize: "14px",
                            lineHeight: "17px",
                            fontWeight: "300",
                            fontFamily: "Montserrat",
                          }}
                        >
                          {orderDetails?.fullName}
                        </p>
                        <p
                          style={{
                            color: "#4D4D4D",
                            fontSize: "14px",
                            lineHeight: "17px",
                            fontWeight: "300",
                            fontFamily: "Montserrat",
                          }}
                        >
                          {orderDetails?.address}
                        </p>
                        <p
                          style={{
                            color: "#4D4D4D",
                            fontSize: "14px",
                            lineHeight: "17px",
                            fontWeight: "300",
                            fontFamily: "Montserrat",
                          }}
                        >
                        Lagos
                        </p>
                        <p
                          style={{
                            color: "#4D4D4D",
                            fontSize: "14px",
                            lineHeight: "17px",
                            fontWeight: "300",
                            fontFamily: "Montserrat",
                          }}
                        >
                          Nigeria
                        </p>
                        <p
                          style={{
                            color: "#4D4D4D",
                            fontSize: "14px",
                            lineHeight: "17px",
                            fontWeight: "300",
                            fontFamily: "Montserrat",
                          }}
                        >
                          {orderDetails?.phoneNumber}
                        </p>
                      </div>
                    </div>
                    {/* )} */}
                  </div>
                  <div
                    style={{
                      width: "70rem",
                      height: "12rem",
                      background: "#fff",
                      marginTop: "10px",
                      display: "flex",
                      flexDirection: "column",
                      padding: "24px",
                      // alignItems: "flex-start" : "",
                    }}
                  >
                    <p
                      style={{
                        color: "#000",
                        fontSize: "16px",
                        lineHeight: "20.5px",
                        fontWeight: "400",
                        fontFamily: "Space Grotesk",
                        marginTop: "15px",
                      }}
                    >
                      PAYMENT DETAILS
                    </p>

                    <div
                      style={{
                        marginTop: "10px",
                        display: "flex",
                        alignItems: "center",
                        // marginLeft: "30px",
                      }}
                      className="checkout__finalPay"
                    >
                      <img className="img" src={verve} alt="graph" />
                      <p
                        style={{
                          color: "#000",
                          fontSize: "16px",
                          lineHeight: "20.5px",
                          fontWeight: "400",
                          fontFamily: "Space Grotesk",
                          marginLeft: "30px",
                        }}
                      >
                        ****1234
                      </p>
                    </div>
                  </div>
                </div>
              </div>
           )}
          </div>
        </div>
      </div>
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;

  .profile {
    &__container {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: #f5ece1;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
    }

    &__cont {
      display: flex;
      justify-content: space-between;

      @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
      }
    }

    &__top {
      height: 58px;
      width: 438px;
      margin-bottom: 30px;
    }

    &__top > p {
      font-family: Space Grotesk;
      font-size: 40px;
      font-style: normal;
      font-weight: 400;
      line-height: 48px;
      letter-spacing: 0em;
      text-align: left;
    }

    &__top > span {
      font-family: Montserrat;
      font-size: 16px;
      font-style: normal;
      font-weight: 300;
      line-height: 28px;
      letter-spacing: 0em;
      text-align: left;
    }

    &__flex {
      display: flex;
      width: 55%;
      height: 3rem;
      margin-top: 9rem;
      margin-left: 4rem;
      align-items: center;
      margin-bottom: 10rem;

      @media (max-width: 768px) {
        margin-bottom: 4rem;
      }
    }

    &__flex > p {
      padding-left: 1.6rem;
      font-size: 1.6rem;
      text-transform: uppercase;
      color: #000;
    }
    &__mainSection {
      width: 80rem;
      height: 100%;
      margin-top: 9rem;

      @media (max-width: 768px) {
        margin-top: 0rem;
        margin-left: 4rem;
      }
    }
    &__foodDish {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2rem;
    }

    &__foodDish:hover {
      font-weight: 700;
      cursor: pointer;
    }

    &__foodDish > a {
      font-size: 1.6rem;
      text-transform: uppercase;
      margin-left: 1rem;
      color: #000;
      cursor: pointer;

      &:hover {
        font-weight: 700;
      }
    }

    &__gridCont {
      display: grid;
      grid-template-columns: 25% 75%;
      grid-gap: 3rem;
      padding-bottom: 5rem;
    }

    &__gridLeft {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &__gridRight > span {
      font-family: Space Grotesk;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 28px;
      letter-spacing: 0em;
      text-align: left;
    }

    &__gridRight > p {
      font-family: Space Grotesk;
      font-size: 4rem;
      font-style: normal;
      font-weight: 400;
      line-height: 48px;
      letter-spacing: 0em;
      text-align: left;
    }

    &__form {
      display: grid;
      grid-template-columns: 50% 50%;
      margin-top: 20px;
    }
    &__a {
      width: 70%;
      //   background: blue;
    }

    &__orderTop {
      background: #fff;
      width: 70rem;
      height: 550px;
      padding: 24px;
    }

    &__orderContainer {
      width: 100%;
      height: 90%;
      margin: 0 auto;
    }

    &__orderCont {
      height: 100%;
      width: 100%;
      overflow-y: auto;
    }

    &__card {
      display: flex;
      height: 44px;
      width: 650px;
      border-radius: 0px;
      border: 1px solid #ddd;
      margin: 0 auto;
      justify-content: space-between;
      padding-left: 12px;
      padding-right: 15px;
      align-items: center;
      margin-bottom: 10px;
      margin-right: 22px;
    }

    &__card > p {
      font-family: Space Grotesk;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 18px;
      letter-spacing: 0em;
      text-align: left;
      color: #4d4d4d;
      text-transform: uppercase;
    }

    &__cardFlex {
      display: flex;
      align-items: center;
    }
    &__cardFlex > p {
      font-family: Space Grotesk;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: 0em;
      text-align: left;
      color: #000;
    }

    // &__midWrap {
    //   width: 100%;
    //   //   margin-left: 32px;
    // }

    // &__midWrap > p {
    //   font-size: 17px;
    //   //   padding: 10px 0;
    //   color: #fff;
    // }
  }

  .check {
    width: 4rem;
    height: 4rem;
    border: 2px solid #dfc09a;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: #fff;
  }

  .check3 {
    width: 3rem;
    height: 3rem;
    border: 2px solid #dfc09a;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: #fff;
    background: #dfc09a;
  }

  a {
    text-decoration: none;
  }

  .transparent {
    background: transparent;
  }

  .grey {
    background: #cccccc;
    color: #000;
  }
  .golden {
    background: #dfc09a;
  }

  .img {
    height: 35.67320251464844px;
    width: 54.6982421875px;
    object-fit: cover;
    border-radius: 4px;
    padding: 8px;
  }
`;

export default ViewOrderComp;
