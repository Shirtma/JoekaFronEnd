/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import naijaNumber from "naija-phone-number";
import styled from "styled-components";
import Icon from "../../components/icon";
import Input from "../../components/input";
import { PaystackButton } from "react-paystack";
import Button from "../../components/button";
import colours from "../../lib/colours";
import Mealdetail from "../../components/mealdetail";
import mastercard from "../../images/MC1.png";
import verve from "../../images/VerveLogo.png";
import paystack from "../../images/paystack.png";
import visa from "../../images/Visa1.png";
import { useProductsContext } from "../../context/products_context";
import axios from "axios";
import { CHECKOUT_INFO_LOAD, CHECKOUT_INFO_SUCCESS } from "../../action";
import useMouseClick from 'hooks/useMouseClick';

const Checkout = () => {
  const {
    cart,
    total,
    quantity,
    clearCart,
    selectedOption,
    info_loading,
    info_success,
    dispatch,
    form,
    setForm,
    orderDet,
    setOrderDet,
    deliveryPrice,
    setDeliveryPrice,
    setDeliveryLocation,
    options
  } = useProductsContext();
  const [succeeded, setSucceeded] = useState(false);
  const [edit, setEdit] = useState(false);
  const [copied, setCopied] = useState(false);
  const [editEmail, setEditEmail] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const history = useHistory();
  const [count, setCount] = useState(0);
  const [payData, setPayData] = useState(null);
  const [payRef, setPayRef] = useState("");

  const deliverPrice = useCallback(() => {
    if (form?.city === "Ajah") {
      setDeliveryPrice(3000);
    } else if (form?.city === "Surulere" || selectedOption === "Surulere") {
      setDeliveryPrice(3000);
    } else if (
      form?.city === "Lekki Phase 1" ||
      selectedOption === "Lekki Phase 1"
    ) {
      setDeliveryPrice(1000);
    } else if (form?.city === "Fadeyi" || selectedOption === "Fadeyi") {
      setDeliveryPrice(3000);
    } else if (form?.city === "Costain" || selectedOption === "Costain") {
      setDeliveryPrice(3000);
    } else if (form?.city === "Yaba" || selectedOption === "Yaba") {
      setDeliveryPrice(3000);
    } else if (
      form?.city === "Lagos Island" ||
      selectedOption === "Lagos Island"
    ) {
      setDeliveryPrice(2000);
    } else if (form?.city === "VGC" || selectedOption === "VGC") {
      setDeliveryPrice(2000);
    }
  }, [selectedOption, setDeliveryPrice, form?.city]);

  useEffect(() => {
    deliverPrice()
  }, [selectedOption, deliverPrice, form?.city]);

  const formValidate = naijaNumber.isValid(form.phone_number);
  const isValidLocation = options.includes(form?.city);
  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleChangeNotSignedIn = (e) => {
      setEmail(e.target.value);
  };

  const order = cart.map(({ price, menuItem, quantity }) => {
    return { amount: price * quantity, item: menuItem, quantity };
  });

  let emailP = localStorage.user && JSON.parse(localStorage.user).email;

  const checkoutFirstName =
    localStorage.user && JSON.parse(localStorage.user).firstName;
  const checkoutLastName =
    localStorage.user && JSON.parse(localStorage.user).lastName;

  const handleUserNotSignedIn = async (e) => {
    setCount(count + 1);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!formValidate) {
      setError(true);
    } else if(!isValidLocation) {
      setLocationError(true)
    }
     else {
      dispatch({ type: CHECKOUT_INFO_LOAD });
      // try {
      setError(false);
      setLocationError(false)
      const { data } = await axios.post(
        process.env.REACT_APP_API_POST,
        {
          address: form.address,
          email: emailP || email,
          fullName: form.first_name + " " + form.last_name,
          orders: [...order, { amount: deliveryPrice, item: "Delivery", quantity: 1 }],
          phoneNumber: form.phone_number,
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      dispatch({ type: CHECKOUT_INFO_SUCCESS, payload: data });
      if (data.status === "OK") {
        const { ref } = data.data;
        setPayRef(ref);
        setPayData(data);
        setTimeout(() => {
          setCount(count + 1);
        }, 2000);
      }
      // }
    }
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    if (!isValidEmail(editEmail)) return false;

    setEdit(false);
  };

  const copy = () => {
    navigator.clipboard.writeText(
      payData && payData.data && payData.data.orderId
    );
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const handlePaystackSuccessAction = async (reference) => {
    console.log(reference.message);
    // Implementation for whatever you want to do with reference and after success call.
    if (reference.status === "success" && reference.message === "Approved") {
      try {
        await axios.post(
          process.env.REACT_APP_API_CHECK,
          {
            status: reference.status,
            reference: reference.reference,
          },
          {
            headers: {
              Accept: "application/json",
            },
          }
        );
        // console.log(data)
      } catch (error) {}
      setSucceeded(true);
      setTimeout(() => {
        clearCart();
        setCount(count + 1);
      }, 2000);
    }
  };

  let config;

  config = {
    reference: payData?.data.ref,
    email: editEmail || emailP || email,
    amount: payData?.data.totalAmount * 100,
    publicKey: process.env.REACT_APP_PAYMENT,
  };

  // you can call this function anything
  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const componentProps = {
    ...config,
    text: "Continue",
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };

  // Check when delivery location option is clicked and allow user to modify
  const { ref, isClicked, setIsClicked } = useMouseClick();
  
  return (
    <CheckoutContainer>
      <div className="checkout__container">
        <div className="checkout__div">
          <div className="checkout__header">
            <div className="checkout__header-navback">
            <button className="checkout__flex" onClick={()=> history.goBack()}>
              <div className="check">
                <Icon Name="ArrowLeft" colour="transparent" />
              </div>
              <p>Back</p>
            </button>
            </div>
            <div className="checkout__right">
              <p>CHECKOUT</p>
              <span>{quantity} items</span>
            </div>
          </div>
          <div className="checkout__gridCont">
            <div className="checkout__LeftCont">
              <div className="checkout__gridTopCont">
                {localStorage.user && (count === 0 || count === 1) ? (
                  <div>
                    <div className="checkout__gridTop">
                      <p>YOUR EMAIL &amp; PHONE NUMBER</p>
                      {!edit && <span onClick={() => setEdit(true)}>Edit</span>}
                    </div>

                    {!edit && (
                      <p className="text_class">{editEmail || emailP}</p>
                    )}
                    {edit && (
                      <div className="edit__input">
                        <Input
                          name="editEmail"
                          type="email"
                          defaultValue={editEmail || emailP}
                          onChange={(e) => setEditEmail(e.target.value)}
                          labelClassName="contact__form-label"
                          className="contact__form-input"
                          outClassName="contact__form-out1"
                          placeholder="Email address"
                          required
                        />
                        <button
                          onClick={handleEditClick}
                          className="button"
                          style={{ cursor: "pointer" }}
                        >
                          Submit
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  !localStorage.user &&
                  count === 0 && (
                    <div>
                      <div className="checkout__gridTop1">
                        <p>YOUR EMAIL &amp; PHONE NUMBER</p>
                        <Input
                          name="Email address"
                          onChange={handleChangeNotSignedIn}
                          value={email}
                          type="email"
                          labelClassName="contact__form-label"
                          className="contact__form-input"
                          outClassName="contact__form-out1"
                          placeholder="Email address"
                          required
                        />
                        <p>
                          You'll receive receipts and notifications at this
                          email address.
                        </p>
                        <p>
                          Already have an account?{" "}
                          <Link to="/login"> Sign In </Link>{" "}
                        </p>
                        <Button
                          text="Continue"
                          backgroundColour={colours.primarygrey900}
                          iconColour={colours.primarygold100}
                            onClick={
                              isValidEmail(email) ? handleUserNotSignedIn : () => false
                            }
                            disabled={isValidEmail(email) ? false : true}
                            className="unsigned-button"
                        />
                      </div>
                    </div>
                  )
                )}
                {((!localStorage.user && count === 1) ||
                  (!localStorage.user && count === 2)) && (
                  <div>
                    <div className="checkout__gridTop">
                      <p>YOUR EMAIL &amp; PHONE NUMBER</p>
                      {!edit && <span onClick={() => setEdit(true)}>Edit</span>}
                    </div>

                    {!edit && (
                      <p className="text_class">{editEmail || email}</p>
                    )}
                    {edit && (
                      <div className="edit__input">
                        <Input
                          name="Email address"
                          type="email"
                          defaultValue={editEmail || email}
                          onChange={(e) => setEditEmail(e.target.value)}
                          labelClassName="contact__form-label"
                          className="contact__form-input"
                          outClassName="contact__form-out1"
                          placeholder="Email address"
                          required
                        />
                        <button
                          onClick={handleEditClick}
                          className="button"
                          style={{ cursor: "pointer" }}
                          // disabled={!formValidate}
                        >
                          Submit
                        </button>
                      </div>
                    )}
                  </div>
                )}
                {((localStorage.user && count === 2) ||
                  (!localStorage.user && count === 3)) && (
                  <>
                    <div
                      style={{
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
                        color: "#fff",
                      }}
                    >
                      ORDER CONFIRMED
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#fff",
                        marginTop: "8px",
                        marginBottom: "24px",
                      }}
                    >
                      Thank you for your order. See the details below.
                    </p>
                    <div className="checkout__detailFlex">
                      <div>
                        <p
                          style={{
                            fontSize: "16px",
                            color: "#fff",
                            marginBottom: "10px",
                          }}
                        >
                          Email
                        </p>
                        <span
                          style={{
                            fontSize: "14px",
                            color: "#ddd",
                            marginBottom: "10px",
                          }}
                        >
                          {editEmail || emailP || email}
                        </span>
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: "16px",
                            color: "#fff",
                            marginBottom: "10px",
                          }}
                        >
                          Phone Number
                        </p>
                        <span
                          style={{
                            fontSize: "14px",
                            color: "#ddd",
                            marginBottom: "10px",
                          }}
                        >
                          {form?.phone_number}
                        </span>
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: "16px",
                            color: "#fff",
                            marginBottom: "10px",
                          }}
                        >
                          Order Date
                        </p>
                        <span
                          style={{
                            fontSize: "14px",
                            color: "#ddd",
                            marginBottom: "10px",
                          }}
                        >
                          {payData &&
                            payData.timestamp.slice(0, 10).replace(/[-]/g, "/")}
                        </span>
                      </div>

                      <div>
                        <p
                          style={{
                            fontSize: "16px",
                            color: "#fff",
                          }}
                        >
                          Order No{" "}
                        </p>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            height: "35px",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "14px",
                              color: "#ddd",
                              marginTop: "20px",
                              marginBottom: "15px",
                              paddingRight: "5px",
                            }}
                          >
                            {payData && payData.data && payData.data.orderId}
                          </span>
                          <Icon
                            Name="CopyClip"
                            colour="transparent"
                            width="20px"
                            onClick={copy}
                            style={{marginLeft: 'auto'}}
                          />
                        </div>
                        {copied && <p className="copied">Copied</p>}
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="checkout__midGridCont">
                <div className="checkout__midWrap">
                  <div className="checkout__gridTop">
                    <p>SHIPPING &amp; DELIVERY</p>
                    {((!localStorage.user && count === 2) ||
                      (localStorage.user && count === 1)) && (
                      <span
                        onClick={() => {
                          setCount(count - 1);
                          setPayData(null);
                        }}
                      >
                        Edit
                      </span>
                    )}
                  </div>
                  {count === 1 && (
                    <div className="checkout__a">
                      {!localStorage.user && (
                        <div>
                          <div className="checkout__name-input">
                          <div className="checkout__formNo4">
                            <Input
                              name="first_name"
                              value={form?.first_name}
                              type="text"
                              labelClassName="contact__form-label"
                              className="contact__form-input"
                              outClassName="contact__form-out1"
                              placeholder="Firstname"
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="checkout__formNo4">
                            <Input
                              name="last_name"
                              value={form?.last_name}
                              type="text"
                              labelClassName="contact__form-label"
                              className="contact__form-input"
                              outClassName="contact__form-out1"
                              placeholder="Lastname"
                              onChange={handleChange}
                              required
                            />
                          </div>
                          </div>
                          <div className="checkout__formNo4">
                            <Input
                              name="phone_number"
                              value={form?.phone_number}
                              type="text"
                              labelClassName="contact__form-label"
                              className="contact__form-input"
                              outClassName="contact__form-out"
                              placeholder="Phone Number"
                              onChange={handleChange}
                              required
                            />

                            {error && !formValidate && (
                              <p
                                style={{
                                  color: "red",
                                  fontSize: "14px",
                                  marginTop: "-14px",
                                  marginBottom: "5px",
                                }}
                              >
                                Enter a valid phone number
                              </p>
                            )}
                          </div>

                          <div className="checkout__formNo4">
                            <Input
                              name="address"
                              value={form?.address}
                              type="text"
                              labelClassName="contact__form-label"
                              className="contact__form-input"
                              outClassName="contact__form-out"
                              placeholder="Address"
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div
                            className="checkout__formNo4 location-input"
                            ref={ref}
                          >
                            <Input
                              name="city"
                              value={selectedOption || form?.city}
                              type="text"
                              labelClassName="contact__form-label"
                              className="contact__form-input"
                              outClassName="contact__form-out"
                              placeholder="City"
                              onClick={() => setIsClicked(true)}
                            />
                            {isClicked && <ul className="delivery__location--options">
                                {options.map((option, i) => (
                                  <li onClick={() => {
                                    setDeliveryLocation(option);
                                    setIsClicked(false);
                                  }} key={i}>{option}</li>
                                ))}
                              </ul>}
                             {locationError && !isValidLocation && (
                              <p
                                style={{
                                  color: "red",
                                  fontSize: "14px",
                                  marginTop: "-14px",
                                  marginBottom: "5px",
                                }}
                              >
                                Sorry, We don’t deliver to this location
                              </p>
                            )}
                          </div>

                          <div
                            className="checkout__checkbox"
                            style={{
                              marginBottom: "15px",
                              marginLeft: "24px",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <input
                              type="checkbox"
                              id="address"
                              name="address"
                              value="address"
                              className="input__check"
                              style={{
                                marginRight: "10px",
                                background: "#DFC09A",
                              }}
                            />
                            <label
                              for="address"
                              style={{ fontSize: "16px", color: "#DFC09A" }}
                            >
                              {" "}
                              Use same address as billing address
                            </label>
                          </div>
                          <div className="checkout__btn">
                            <button
                              onClick={handleClick}
                              className="buttonload"
                            >
                              <i
                                className={
                                  info_loading
                                    ? "fa fa-spinner fa-spin"
                                    : !info_loading && payData
                                    ? "far fa-check-circle"
                                    : ""
                                }
                              ></i>
                              Continue
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {count === 0 && (
                    <div className="checkout__a">
                      {localStorage.user && (
                        <div>
                          <div className="checkout__name-input">
                            <div className="checkout__formNo4">
                            <Input
                              name="first_name"
                              // value={form?.first_name}
                              defaultValue={checkoutFirstName}
                              type="text"
                              labelClassName="contact__form-label"
                              className="contact__form-input"
                              outClassName="contact__form-out1"
                              placeholder="Firstname"
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="checkout__formNo4">
                            <Input
                              name="last_name"
                              // value={form?.last_name}
                              defaultValue={checkoutLastName}
                              type="text"
                              labelClassName="contact__form-label"
                              className="contact__form-input"
                              outClassName="contact__form-out1"
                              placeholder="Lastname"
                              onChange={handleChange}
                              required
                            />
                          </div>
                          </div>
                          <div className="checkout__formNo4">
                            <Input
                              name="phone_number"
                              value={form?.phone_number}
                              type="text"
                              labelClassName="contact__form-label"
                              className="contact__form-input"
                              outClassName="contact__form-out"
                              placeholder="Phone Number"
                              onChange={handleChange}
                              required
                            />
                            {error && !formValidate && (
                              <p
                                style={{
                                  color: "red",
                                  fontSize: "14px",
                                  marginTop: "-14px",
                                  marginBottom: "5px",
                                }}
                              >
                                Enter a valid phone number
                              </p>
                            )}
                          </div>
                          <div className="checkout__formNo4">
                            <Input
                              name="address"
                              value={form?.address}
                              type="text"
                              labelClassName="contact__form-label"
                              className="contact__form-input"
                              outClassName="contact__form-out"
                              placeholder="Address"
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div
                            className="checkout__formNo4 location-input"
                            ref={ref}
                          >
                            <Input
                              name="city"
                              value={selectedOption || form?.city}
                              type="text"
                              labelClassName="contact__form-label"
                              className="contact__form-input"
                              outClassName="contact__form-out"
                              placeholder="City"
                              onClick={() => setIsClicked(true)}
                            />
                            {isClicked && <ul className="delivery__location--options">
                                {options.map((option, i) => (
                                  <li onClick={() => {
                                    setDeliveryLocation(option);
                                    setIsClicked(false);
                                  }} key={i}>{option}</li>
                                ))}
                              </ul>}
                            {locationError && !isValidLocation && (
                              <p
                                style={{
                                  color: "red",
                                  fontSize: "14px",
                                  marginTop: "-14px",
                                  marginBottom: "5px",
                                }}
                              >
                                Sorry, We don’t deliver to this location
                              </p>
                            )}
                          </div>

                          <div
                            className="checkout__checkbox"
                            style={{
                              marginBottom: "15px",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <input
                              type="checkbox"
                              id="address"
                              name="address"
                              value="address"
                              className="input__check"
                              style={{
                                marginRight: "10px",
                                background: "#DFC09A",
                              }}
                            />
                            <label
                              for="address"
                              style={{ fontSize: "16px", color: "#DFC09A" }}
                            >
                              {" "}
                              Use same address as billing address
                            </label>
                          </div>
                          <div className="checkout__btn">
                            <button
                              onClick={handleClick}
                              className="buttonload"
                              style={{ cursor: "pointer"}}
                            >
                              {/* <i className="fa fa-spinner fa-spin"></i> */}
                              <i
                                className={
                                  info_loading
                                    ? "fa fa-spinner fa-spin"
                                    : !info_loading && payData
                                    ? "far fa-check-circle"
                                    : ""
                                }
                              ></i>
                              Continue
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {((localStorage.user && count === 1) ||
                    (localStorage.user && count === 2) ||
                    (!localStorage.user && count === 2) ||
                    (!localStorage.user && count === 3)) && (
                    <div className="checkout__detailsTop">
                      <p className="text_class">
                        {checkoutFirstName || form?.first_name}{" "}
                        {checkoutLastName || form?.last_name}
                      </p>
                      <p className="text_class">{form?.address},</p>
                      <p className="text_class">
                        {form?.city || selectedOption}, Lagos,
                      </p>
                      <p className="text_class">Nigeria</p>
                      <p className="text_class">{form?.phone_number}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form_d">
                <p
                  style={{
                    fontSize: "16px",
                    color: "#fff",
                  }}
                >
                  {(localStorage.user && count === 2) ||
                  (!localStorage.user && count === 3)
                    ? "PAYMENT DETAILS"
                    : "PAYMENT METHOD"}
                </p>
                {((localStorage.user && count === 1) ||
                  (!localStorage.user && count === 2)) && (
                  <div className="checkout__paymentContainer">
                    <p
                      style={{
                        paddingTop: "16px",
                      }}
                      className="text_class"
                    >
                      Your transactions are secure and encrypted.
                      <br /> Powered by paystack
                    </p>
                    <p
                      style={{
                        paddingTop: "16px",
                      }}
                      className="text_class"
                    >
                      Pay securely with:
                    </p>
                    <div className="checkout__pay">
                      <span className="checkout__pay--graph">
                        <img src={verve} alt="graph" />
                      </span>
                        <span className="checkout__pay--graph">
                        <img src={mastercard} alt="graph" />
                      </span>
                        <span className="checkout__pay--graph">
                        <img src={visa} alt="graph" />
                      </span>
                        <span className="checkout__pay--graph small">
                        <img src={paystack} alt="graph" />
                      </span>
                    </div>
                    <p
                      style={{
                        paddingTop: "10px",
                      }}
                      className="text_class"
                    >
                      Review your information and click the button below to make
                      payment
                    </p>
                    <PaystackButton
                      className="paystack_btn"
                      {...componentProps}
                    />
                  </div>
                )}
                {((localStorage.user && count === 2) ||
                  (!localStorage.user && count === 3)) && (
                  <div
                    style={{
                      marginTop: "10px",
                      display: "flex",
                      alignItems: "center",
                    }}
                    className="checkout__finalPay"
                  >
                    <img
                      src={verve}
                      alt="graph"
                      height="35.67px"
                      width="54.7px"
                    />
                    <p
                      style={{
                        marginLeft: "24px",
                        fontSize: "14px",
                        color: "#ddd",
                      }}
                    >
                      ****1234
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="checkout__RightCont">
              <div className="checkout__orderTop">
                <div className="checkout__orderContainer">
                  <p>ORDER SUMMARY</p>
                  <div className="checkout__orderCont">
                    {cart &&
                      cart.map((c) => (
                        <Mealdetail
                          Image={c.image}
                          text1={c.menuItem}
                          id={c.id}
                          text2={c.description.slice(0, 40)}
                          icon={c.quantity > 1 ? "MinusWhite" : "MinusGrey"}
                          number={c.quantity}
                          icon2="PlusWhite"
                          price={c.price}
                          icon3="Trash"
                        />
                      ))}
                  </div>
                  <div className={`checkout__card transparent`}>
                    <p style={{ color: "#fff", fontSize: "14px" }}>
                      Delivery to {form?.city || selectedOption}
                    </p>
                    <div className="checkout__cardFlex">
                      <p
                        style={{
                          color: "#fff",
                          fontSize: "14px",
                          marginRight: "3px",
                        }}
                      >
                        &#8358;
                      </p>
                      <p style={{ color: "#fff", fontSize: "14px" }}>
                        {deliveryPrice}
                      </p>
                    </div>
                  </div>
                  <div className={`checkout__card grey`}>
                    <p style={{ color: "#fff", fontSize: "14px" }}>Sub total</p>
                    <div className="checkout__cardFlex">
                      <p
                        style={{
                          color: "#fff",
                          fontSize: "14px",
                          marginRight: "3px",
                        }}
                      >
                        &#8358;
                      </p>
                      <p>{total}</p>
                    </div>
                  </div>
                  <div className={`checkout__card dark`}>
                    <p style={{ color: "#DFC09A", fontSize: "14px" }}>TOTAL</p>
                    <div className="checkout__cardFlex">
                      <p
                        style={{
                          color: "#DFC09A",
                          fontSize: "14px",
                          marginRight: "3px",
                        }}
                      >
                        &#8358;
                      </p>
                      <p style={{ color: "#DFC09A", fontSize: "14px" }}>
                        {total + deliveryPrice}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="checkout__orderBottom"
                style={{ border: "1px solid #DFC09A", background: "#DFC09A" }}
              >
                <div
                  style={{
                    width: "90%",
                    margin: "10px auto",
                  }}
                >
                  <Icon Name="UtensilsBlack" colour="transparent" />
                  <p className="estimate">ESTIMATED ORDER DELIVERY</p>
                  <p className="processing">
                    Processing your order would usually take 60-90 mins. Kindly
                    reach out to us on Whats App at +234-808-123-4567 for
                    progress on your order.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CheckoutContainer>
  );
};

const CheckoutContainer = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&family=Space+Grotesk:wght@300&display=swap");
  position: relative;
  width: 100%;
  font-family: "Space Grotesk", sans-serif;
  margin-bottom: 10rem;
  .checkout {
  &__detailFlex {
    display: flex;
    flex-direction: column;
    gap: 17px;
    @media (min-width: 1024px) {
      flex-direction: row;
      justify-content: space-between;
    }
  }
    &__name-input {
      .checkout__formNo4 {
        width: 100%;
      }
      @media (min-width: 1024px){
        display: flex;
        gap: 16px;
        width: 375px;
      }
    }
    &__container {
      width: 100%;
      display: flex;
      flex-direction: column;
      background-color: #333;
    }
    &__form {}
    &__formNo4 {
      display: flex;
      flex-direction: column;
      @media (min-width: 1024px) {
        width: 375px;
      }
    }
    &__formNo {
      border: 5px solid grey;
    }
    &__div {
      padding: 16px 14px 16px;
      @media (min-width: 1024px) {
        padding: 0px 40px;
      }
    }
    &__header {
      display: flex;
      align-items: center;
      margin-bottom: 24px;
      @media (min-width: 1024px) {
        width: 750px;
      }
      &-navback {
        flex-grow: 1;
      }
    }
    &__flex {
      display: flex;
      align-items: center;
      background-color: transparent;
      border: 0;
      cursor: pointer;
    }
    &__flex > p {
      padding-left: 20px;
      font-size: 16px;
      color: #fff;
      font-family: 'Space Grotesk';
    }
    &__right {
      text-align: center;
    }
    &__right > p {
      font-size: 16px;
      padding-bottom: 10px;
      color: #fff;
    }
    &__right > span {
      font-size: 12px;
      color: #ddd;
    }
    &__gridCont {
      width: 100%;
      @media (min-width: 1024px) {
        display: flex;
        gap: 24px;
      }
    }
    &__LeftCont {
      @media (min-width: 1024px) {
        width: 668px;
        display: flex;
        flex-direction: column;
        gap: 24px;
      }
    }
    &__gridTopCont {
      border-radius: 0px;
      background: #4d4d4d;
      padding: 24px;
      color: #fff;
    }
  
    &__gridTop {
      display: flex;
      align-items: center;
      margin-bottom: 24px;
      justify-content: space-between;

      @media (max-width: 768px) {
        // margin-right: 4rem;
      }
    }
    &__gridTop1 {
      .contact__form-out1{
        width: 100%;
        @media (min-width: 1024px) {
          width: 375px;
        }
      }
      .unsigned-button {
        height: 48px;
        width: 156px;
        cursor: pointer;
        &:disabled {
          pointer-events: none;
        }
      }
    }
    &__gridTop1 > p {
      font-family: "Space Grotesk", sans-serif;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: 0em;
      text-align: left;
      color: #fff;
      margin-bottom: 2rem;
    }
    &__gridTop > p {
      font-family: "Space Grotesk", sans-serif;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: 0em;
      text-align: left;
      color: #fff;
    }
    &__gridTop > span {
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 19px;
      letter-spacing: 0em;
      text-align: right;
      font-family: "Manrope", sans-serif;
      color: rgba(223, 192, 154, 1);
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
    &__RightCont {
      @media (min-width: 1024px) {
        width: 374px;
      }
    }
    &__orderTop {
      border: 1px solid #4d4d4d;
    }
    &__orderContainer {
      width: 100%;
      padding: 23.08px;

    }
    &__orderCont {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding-bottom: 8px;
    }
    &__orderContainer > p {
      margin-bottom: 1.5rem;
      font-family: Space Grotesk;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: 0em;
      text-align: left;
      color: #fff;
    }
    &__orderBottom {
      margin-top: 24px;
    }
    &__midGridCont {
      padding: 24px;
      background: #4d4d4d;
    }
    &__midWrap {
      width: 100%;
    }
    &__midFlex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    &__midFlex > p {
      font-size: 17px;
      padding: 20px 0;
      color: #fff;
    }
    &__midFlex > span {
      font-size: 17px;
      padding: 20px 0;
      color: #dfc09a;
    }
    &__btn {
      height: 40px;
    }

    &__formGrid {
      grid-gap: 1rem;
      height: 48px;
    }
    &__image {
      object-fit: cover;
      height: 15px;
      width: 15px;
      margin-right: 5px;
    }
    &__card {
      display: flex;
      height: 44px;
      /* width: 325px; */
      border-radius: 0px;
      border: 1px solid grey;
      margin: 0 auto;
      justify-content: space-between;
      padding-left: 15px;
      padding-right: 15px;
      align-items: center;
      margin-bottom: 10px;
    }
    &__cardFlex {
      display: flex;
      align-items: center;
    }
    &__cardFlex > p {
      font-size: 14px;
    }

    &__pay--graph {
      display: inline-block;
      width: 54.7px;
      height: 35.67px;
      margin-top: 8px;
      overflow: hidden;
      img {
        height: 100%;
        width: 100%;
        object-fit: fill;
      }
      &.small {
        width: 36px;
      }
    }
  }
  .menu {
    &__width {
    }
    &__midDetail {
      margin-left: 15px;
    }
    &__midDet1 {
      height: 36px;
      width: 128px;
    }
    &__midDet2 {
      height: 36px;
      width: 207px;
    }
    &__midDet1 > p {
      font-family: "Space Grotesk", sans-serif;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 18px;
      letter-spacing: 0em;
      text-align: left;
    }
    &__midDet2 > p {
      font-family: "Space Grotesk";
      font-size: 14px;
      font-style: normal;
      line-height: 18px;
      letter-spacing: 0em;
      text-align: left;
      color: #999;
      margin-top: 15px;
    }
    &__rightDetail {
      display: flex;
      margin-right: 15px;
      width: 80px;
      height: 50px;
      align-items: center;
    }
    &__rightDetail > p {
      text-align: center;
      font-size: 12px;
    }
    &__addMinFlex {
      display: flex;
      justify-content: space-around;
      width: 60px;
      align-items: center;
    }
    &__addMinFlex > p {
      font-size: 14px;
    }
  }
  .check {
    width: 4rem;
    height: 4rem;
    border: 2px solid #dfc09a;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: #ddd;
  }

  img {
    width: 54.7px;
    height: 35.67px;
    border-radius: 0px;
    object-fit: fill;
  }
  .transparent {
    background: transparent;
  }
  .grey {
    background: #4d4d4d;
    color: #fff;
  }
  .dark {
    background: #000000;
    color: #fff;
  }
  .custom-select {
    height: 100%;
  }
  .form_d {
    background: #4d4d4d;
    display: flex;
    flex-direction: column;
    padding: 24px;
  }
  .paystack_btn {
    background: #000;
    margin-top: 24px;
    height: 40px;
    width: 156px;
    padding: 8px;
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: center;
    color: #fff;
    text-transform: uppercase;
    border: 0;
    outline: none;
    cursor: pointer;
    &:hover {
      color: #dfc09a;
    }
  }
  a {
    color: #dfc09a;
  }
  .estimate {
    font-family: Space Grotesk;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
    margin-top: 1rem;
  }
  .processing {
    font-family: Rubik;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: left;
    margin-top: 1rem;
    color: #4d4d4d;
  }
  .copied {
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: left;
    color: #dfc09a;
  }
  .button-bg {
    &:hover {
      .button-text {
        color: #dfc09a;
      }
    }
  }
  .buttonload {
    background-color: #000000;
    border: none;
    color: white;
    min-height: 48px;
    width: 100%;
    cursor: pointer;
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: center;
    position: relative;
    &:hover {
      color: #dfc09a;
    }
    @media (min-width: 1024px) {
      width: 156px;
    }
  }
  .button {
    background-color: #000000;
    border: none;
    color: white;
    height: 48px;
    width: 100%;
    cursor: pointer;
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: center;
    margin: auto 0;
    &:hover {
      color: #dfc09a;
    }

    @media screen and (max-width: 768px) {
      padding: 3px;
    }
  }
  /* Add a right margin to each icon */
  .fa,
  .far {
    position: absolute;
    left: 9px;
    transform: translateY(0%, 50%);
  }
  .text_class {
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 300;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: left;
    color: #b3b3b3;
  }

  .edit__input {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    column-gap: 16px;

    .contact__form-out1 {
      width: 100%;
      @media (min-width: 1024px) {
        width: 70%;
      }
    }

    @media (min-width: 1024px) {
      flex-direction: row;
      align-items: flex-start;
      .button {
        width: 30%;
        margin-top: 1.5px;
      }
    }
  }

/* Style delivery location options */
  .location-input {
    position: relative;
  }
  .delivery__location--options {
      margin: 0;
      padding: 0;
      list-style-type: none;
      min-width: 100%;
      background-color: #FFFFFF;
      box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05);
      position: absolute;
      top: 50px;
      z-index: 1;

      li {
        height: 40px;
        display: flex;
        align-items: center;
        padding: 0 24px;
        cursor: pointer;
        font-size: 14px;
      }
      @media (min-width: 768px) {
        min-width: 343px;
      }
  }

  .edit__input {
    padding-left: 24px;
    display: grid;
    grid-template-columns: 70% 30%;
    width: 700px;

    @media (max-width: 768px) {
      width: 45rem;
      grid-template-columns: 58% 42%;
    }
  }
`;

export default Checkout;
