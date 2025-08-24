import React from "react";
import Radio from "../../components/radio";
import styled from "styled-components";
import Icon from "../../components/icon";
import Input from "../../components/input";
import { useState, useEffect } from "react";

import axios from "axios";
import { useUserContext } from "../../context/user_context";
import Button from "../../components/button";
import colours from "../../lib/colours";
import { onChangeInput } from "../../util/helpers";
import { validateReserve } from "../../util/formValidationRules";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// import "react-modern-calendar-datepicker/lib/DatePicker.css";
// import DatePicker, {
//   utils,
// } from "react-modern-calendar-datepicker";
import { useHistory } from "react-router-dom";
import { useProductsContext } from "../../context/products_context";

const rootUrl = `${process.env.REACT_APP_API_URL}`;

const Reserve = () => {
  const history = useHistory();
  const { isAuthenticated } = useUserContext();
  const { setReserveData } = useProductsContext();
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [arrivalTime, setArrivalTime] = useState(null);
  const [maxGuest, setMaxGuest] = useState(null);
  const [active, setActive] = useState(null);
  const [max, setMax] = useState([]);
  const [state, setState] = useState({
    firstName:
      "" || (localStorage.user && JSON.parse(localStorage.user).firstName),
    lastName:
      "" || (localStorage.user && JSON.parse(localStorage.user).lastName),
    email:
      "" || (localStorage.user && JSON.parse(localStorage.user).email),
    phoneNumber: "",
    arrival: "",
    guests: "",
    message: "",
    reserveError: "",
    validationErrors: {},
    isLoading: false,
  });


  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const time = [
    "12AM",
    "12:30AM",
    "1AM",
    "1:30AM",
    "2AM",
    "2:30AM",
    "3AM",
    "3:30AM",
    "4AM",
    "4:30AM",
    "5AM",
    "5:30AM",
    "6AM",
    "6:30AM",
    "7AM",
    "7:30AM",
    "8AM",
    "8:30AM",
    "9AM",
    "9:30AM",
    "10AM",
    "10:30AM",
    "11AM",
    "11:30AM",
    "12PM",
    "12:30PM",
    "1PM",
    "1:30PM",
    "2PM",
    "2:30PM",
    "3PM",
    "3:30PM",
    "4PM",
    "4:30PM",
    "5PM",
    "5:30PM",
    "6PM",
    "6:30PM",
    "7PM",
    "7:30PM",
    "8PM",
    "8:30PM",
    "9PM",
    "9:30PM",
    "10PM",
    "10:30PM",
    "11PM",
  ];

  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);
  const [maxOpen, setMaxOpen] = useState(false);

  const onOptionClicked = (value) => () => {
    setArrivalTime(value);
    setOpen(false);
    // console.log(selectedOption);
  };
  const onOptionClicked2 = (value) => () => {
    setMaxGuest(value);
    setMaxOpen(false);
    // console.log(selectedOption);
  };

  const renderCustomInput = ({ ref }) => (
    <InputContainer className="contact__form-out">
      <label className={`input__label contact__form-label  `} htmlFor="date">
        Select a Date
      </label>

      <input
        readOnly
        ref={ref} // necessary
        id="date"
        name="date"
        placeholder="Today"
        value={
          selectedDay
            ? ` ${selectedDay.day}/${selectedDay.month}/${selectedDay.year}`
            : ""
        }
        className={`input__test $contact__form-input  ${
          state.validationErrors.date && "error__input"
        }`}
        style={{ width: width >= 749 ? "44.6rem" : "34.3rem" }}
      />
      {state.validationErrors.date && (
        <p className="error__input-text">{state.validationErrors.date}</p>
      )}
    </InputContainer>
  );

  const [room, setRoom] = useState("");
  const [guest, setGuest] = useState("");

  const handleCourtYardChange = () => {
    setActive("The Courtyard");
    setRoom("The Courtyard");
    setGuest(
      "The minimum amount of guests allowed for this space is 1 person and the maximum 50 persons"
    );
    setMax([...Array(51).keys()].slice(1));
  };

  console.log(max);

  const handleLivingRoomChange = () => {
    setActive("The Living Room");
    setRoom("The Living Room");
    setGuest(
      "The minimum amount of guests allowed for this space is 1 person and the maximum  8 persons"
    );
    setMax([...Array(9).keys()].slice(1));
  };

  const handleBoothChange = () => {
    setActive("The Booth");
    setRoom("The Booth");
    setGuest(
      "The minimum amount of guests allowed for this space is 1 person and the maximum 15 persons"
    );
    setMax([...Array(16).keys()].slice(1));
  };

  const handleDiningChange = () => {
    setActive("The Dining Room");
    setRoom("The Dining Room");
    setGuest(
      "The minimum amount of guests allowed for this space is 2 persons and the maximum 20 persons"
    );
    setMax([...Array(21).keys()].slice(2));
  };

  const handleParlourChange = () => {
    setActive("The Parlour");
    setRoom("The Parlour");
    setGuest(
      "The minimum amount of guests allowed for this space is 1 person and the maximum 15 persons"
    );
    setMax([...Array(16).keys()].slice(1));
  };

  const handleStudyChange = () => {
    setActive("The Study");
    setRoom("The Study");
    setGuest(
      "The minimum amount of guests allowed for this space is 1 person and the maximum 12 persons"
    );
    setMax([...Array(13).keys()].slice(1));
  };

  const handleWhiteChange = () => {
    setActive("The White Room");
    setRoom("The White Room");
    setGuest(
      "The minimum amount of guests allowed for this space is 1 person and the maximum 40 persons"
    );
    setMax([...Array(41).keys()].slice(1));
  };

  const handleBalconyChange = () => {
    setActive("The Balcony");
    setRoom("The Balcony");
    setGuest(
      "The minimum amount of guests allowed for this space is 1 person and the maximum  8 persons"
    );
    setMax([...Array(9).keys()].slice(1));
  };

  console.log(active);

  async function reserve(event) {
    console.log(state);
    event.preventDefault();
    let values = {
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      phoneNumber: state.phoneNumber,
      arrival: arrivalTime,
      guests: maxGuest || max[0],
      message: state.message,
      date: new Date(selectedDay)
      ? new Date(selectedDay).toISOString().substring(0, 10)
      : "",
      room: room ? room : "",
    };
    console.log(values);
    let errors = validateReserve(values);
    console.log(errors);
    console.log(values);
    setState((prevState) => ({
      ...prevState,
      validationErrors: {
        ...prevState.validationErrors,
        ...errors,
      },
      isLoading: Object.keys(errors).length ? false : true,
    }));

    if (!Object.keys(errors).length) {
      const response = await axios({
        method: "post",
        url: `${rootUrl}/menu/spaces`,
        data: values,
      }).catch((err) => {
        setState((prevState) => ({
          ...prevState,
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          arrival: "",
          guests: "",
          message: "",
          reserveError: err.message,
        }));
      });
      if (response) {
        console.log(response.data);
        setReserveData(response.data);
        if (response.data.status === "OK") {
          history.push("/reservesuccess");
        }
      } else {
        // toggleError(true, 'there is no user with that username')
      }
    }
    setState((prevState) => ({
      ...prevState,
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      arrival: "",
      guests: "",
      message: "",
      reserveError: "",
      isLoading: false,
    }));
    setSelectedDay(null);

    // setState((prevState) => ({ ...prevState, isLoading:false }))
    console.log("gothere");
  }

  //     function createSelectItems() {
  //       let items = [];
  //       for (let i = 0; i <= 10; i++) {
  //            items.push(<option key={i} value={i}>{i}</option>);
  //            //here I will be creating my options dynamically based on
  //            //what props are currently passed to the parent component
  //       }
  //       return items;
  //   }

  //  function onDropdownSelected(e) {
  //      console.log("THE VAL", e.target.value);
  //      //here you will see the current selected value of the select input
  //  }

  return (
    <ReserveContainer hover={hover}>
      <div className="reserve">
        <form className="reserve__form">
          <div className="reserve__form-intro">
            <p className="reserve__form-intro--text1">Reserve a Space</p>
            <p className="reserve__form-intro--text2">
              Fill the details below to get your desired space reserved.
            </p>
            <p className="reserve__form-intro--text3">RESERVATION DETAILS</p>
            <p className="reserve__form-intro--text4">Select space</p>
          </div>

          <div className="reserve__form-radio">
            {width >= 749 ? (
              <div className="reserve__form-radio-1">
                <div className="reserve__form-input1">
                  <Radio
                    label="The Courtyard"
                    name="courtyard"
                    value={room === "The Courtyard"}
                    onChange={handleCourtYardChange}
                    className={active === "The Courtyard" ? "active" : ""}
                    required
                  />
                </div>

                <div className="contact__form-input3">
                  <Radio
                    label="The Living Room"
                    name="livingroom"
                    value={room === "The Living Room"}
                    onChange={handleLivingRoomChange}
                    className={active === "The Living Room" ? "active" : ""}
                    required
                  />
                </div>

                <div className="contact__form-input2">
                  <Radio
                    label="The Booth"
                    name="booth"
                    value={room === "The Booth"}
                    onChange={handleBoothChange}
                    className={active === "The Booth" ? "active" : ""}
                    required
                  />
                </div>
              </div>
            ) : (
              <div className="reserve__form-radio-1">
                <div className="reserve__form-input1">
                  <Radio
                    label="The Courtyard"
                    name="courtyard"
                    value={room === "The Courtyard"}
                    onChange={handleCourtYardChange}
                    className={active === "The Courtyard" ? "active" : ""}
                    required
                  />
                </div>

                <div className="contact__form-input3">
                  <Radio
                    label="The Living Room"
                    name="livingroom"
                    value={room === "The Living Room"}
                    onChange={handleLivingRoomChange}
                    className={active === "The Living Room" ? "active" : ""}
                    required
                  />
                </div>
              </div>
            )}

            {width >= 749 ? (
              <div className="reserve__form-radio-2">
                <div className="reserve__form-input1">
                  <Radio
                    label="The Dining Room"
                    name="dining"
                    value={room === "The Dining Room"}
                    onChange={handleDiningChange}
                    className={active === "The Dining Room" ? "active" : ""}
                    required
                  />
                </div>

                <div className="contact__form-input2">
                  <Radio
                    label="The Parlour"
                    name="parlour"
                    value={room === "The Parlour"}
                    onChange={handleParlourChange}
                    className={active === "The Parlour" ? "active" : ""}
                    required
                  />
                </div>
                <div className="contact__form-input3">
                  <Radio
                    label="The Study"
                    name="study"
                    value={room === "The Study"}
                    onChange={handleStudyChange}
                    className={active === "The Study" ? "active" : ""}
                    required
                  />
                </div>
              </div>
            ) : (
              <div className="reserve__form-radio-2">
                <div className="reserve__form-input1">
                  <Radio
                    label="The Booth"
                    name="booth"
                    value={room === "The Booth"}
                    onChange={handleBoothChange}
                    className={active === "The Booth" ? "active" : ""}
                    required
                  />
                </div>
                <div className="contact__form-input2">
                  <Radio
                    label="The Dining Room"
                    name="dining"
                    value={room === "The Dining Room"}
                    onChange={handleDiningChange}
                    className={active === "The Dining Room" ? "active" : ""}
                    required
                  />
                </div>
              </div>
            )}

            {width >= 749 ? (
              <div className="reserve__form-radio-3">
                <div className="reserve__form-input1">
                  <Radio
                    label="The White Room"
                    name="whiteroom"
                    value={room === "The White Room"}
                    onChange={handleWhiteChange}
                    className={active === "The White Room" ? "active" : ""}
                    required
                  />
                </div>

                <div className="contact__form-input2">
                  <Radio
                    label="The Balcony"
                    name="balcony"
                    value={room === "The Balcony"}
                    onChange={handleBalconyChange}
                    className={active === "The Balcony" ? "active" : ""}
                    required
                  />
                </div>
              </div>
            ) : (
              <div className="reserve__form-radio-3">
                <div className="reserve__form-input1">
                  <Radio
                    label="The Parlour"
                    name="parlour"
                    value={room === "The Parlour"}
                    onChange={handleParlourChange}
                    className={active === "The Parlour" ? "active" : ""}
                    required
                  />
                </div>

                <div className="contact__form-input2">
                  <Radio
                    label="The Study"
                    name="study"
                    value={room === "The Study"}
                    onChange={handleStudyChange}
                    className={active === "The Study" ? "active" : ""}
                    required
                  />
                </div>
              </div>
            )}

            {width < 749 ? (
              <div className="reserve__form-radio-4">
                <div className="reserve__form-input1">
                  <Radio
                    label="The White Room"
                    name="whiteroom"
                    value={room === "The White Room"}
                    onChange={handleWhiteChange}
                    className={active === "The White Room" ? "active" : ""}
                    required
                  />
                </div>

                <div className="contact__form-input2">
                  <Radio
                    label="The Balcony"
                    name="balcony"
                    value={room === "The Balcony"}
                    onChange={handleBalconyChange}
                    className={active === "The Balcony" ? "active" : ""}
                    required
                  />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="reserve__form-info">
            <span className="reserve__form-info--icon">
              <div>
                <Icon Name="Info" colour="transparent" />
              </div>
            </span>

            <div className="reserve__form-info--text">
              <p className="reserve__form-info--text-primary">
                For your information:
              </p>
              <p className="reserve__form-info--text-secondary">
                {guest !== "" ? guest : "Covid-19 practices are enforced"}
              </p>
            </div>
          </div>

          <div className="reserve__form-date">
            <div className="contact__form-input1">
              <p>Select a Date</p>
              <DatePicker
                selected={selectedDay}
                onChange={(date) => setSelectedDay(date)}
                className="date-details"
              />
              <Icon
                Name='CalendarBlank'
                height="16px"
                width="16px"
                className="calender-icon"
              />
            </div>
            <div className="select__input contact__form-input4 ">
              {/* <Input
                label="Time of arrival"
                name="arrival"
                type="text"
                labelClassName="contact__form-label"
                className="contact__form-input"
                outClassName="contact__form-out"
                value={state.arrival}
                onChange={(e) => onChangeInput(e, state, setState)}
                width={`${width >= 749 ? '44.6rem': '34.3rem'}`}
                placeholder="10:00 AM"
                error={state.validationErrors.arrival}
                required
              /> */}
              <p>Time of arrival</p>
              <details className="details">
                <summary onClick={() => setOpen(true)} className="summary">
                  {arrivalTime || "Time of arrival"}
                </summary>
                {open && (
                  <ul className="ul">
                    {time.map((t) => (
                      <li onClick={onOptionClicked(t)}>{t}</li>
                    ))}
                  </ul>
                )}
              </details>
            </div>

            <div className="select__input contact__form-input4 mt-2">
              {/* <Input
                label="Time of arrival"
                name="arrival"
                type="text"
                labelClassName="contact__form-label"
                className="contact__form-input"
                outClassName="contact__form-out"
                value={state.arrival}
                onChange={(e) => onChangeInput(e, state, setState)}
                width={`${width >= 749 ? '44.6rem': '34.3rem'}`}
                placeholder="10:00 AM"
                error={state.validationErrors.arrival}
                required
              /> */}
              <p>Number of guests</p>
              <details className="details">
                <summary onClick={() => setMaxOpen(true)} className="summary">
                  {maxGuest || max[0] || "Number of guests"}
                </summary>
                {maxOpen && max.length > 0 && (
                  <ul className="ul">
                    {max?.map((m) => (
                      <li onClick={onOptionClicked2(m)}>{m}</li>
                    ))}
                  </ul>
                )}
              </details>
            </div>
            {/* <div className="contact__form-input1 mt-2">
              <Input
                label="Number of guests"
                name="guests"
                type="text"
                labelClassName="contact__form-label"
                className="contact__form-input"
                outClassName="contact__form-out"
                value={state.guests}
                onChange={(e) => onChangeInput(e, state, setState)}
                width={`${width >= 749 ? "44.6rem" : "34.3rem"}`}
                placeholder="1"
                error={state.validationErrors.guests}
                required
              /> */}

            {/* <InputContainer className="contact__form-out"> */}

            {/* <label
                className={`input__label contact__form-label  `}
                htmlFor="guests"
              >
                Number of guests
              </label> */}
            {/*       
      <input
        id="guests"
        name="guests"
        onChange={onDropdownSelected}
        // placeholder="1"
        type="select"
      
        // value={value}
        // defaultValue={defaultValue}
        // onKeyUp={onKeyUp}
        className={`input__test $contact__form-input  ${state.validationErrors.date && "error__input"}`}
        style={{ width: "44.6rem"}}
        multiple
      > */}
            {/* {createSelectItems()} */}
            {/* </input> */}
            {/* {error && <p className="error__input-text">{error}</p>} */}
            {/* </InputContainer> */}

            {/* <InputContainer className="contact__form-out">
        <label className={`input__label contact__form-label  `} htmlFor="date">
          Select a Date
        </label>
      
      <input
      readOnly
      ref={ref} // necessary
        id="date"
        name="date"
        placeholder="Today"
        value={selectedDay ? ` ${selectedDay.day}/${selectedDay.month}/${selectedDay.year}` : ''}
        className={`input__test $contact__form-input  ${state.validationErrors.date && "error__input"}`}
        style={{ width: "44.6rem"}}
       
      />
       {state.validationErrors.date&& <p className="error__input-text">{state.validationErrors.date}</p>}
    </InputContainer> */}
            {/* </div> */}

            <div className="contact__form-input4 mt-2">
              <textarea
                id="message"
                name="message"
                className="place"
                placeholder="Additional Information"
                onChange={(e) => onChangeInput(e, state, setState)}
                value={state.message}
                // style={{

                // }}
              />
            </div>
          </div>

          {!isAuthenticated && (
            <div className="reserve__form-contact">
              <p className="reserve__form-contact--head">CONTACT DETAILS</p>
              <div className="reserve__form-contact-small">
                <Input
                  label="Firstname"
                  name="firstName"
                  type="text"
                  labelClassName="contact__form-label"
                  className="contact__form-input"
                  outClassName="contact__form-out"
                  value={state.firstName}
                  onChange={(e) => onChangeInput(e, state, setState)}
                  width={`${width >= 749 ? "20.7rem" : "16.3rem"}`}
                  placeholder="Firstname"
                  error={state.validationErrors.firstName}
                  required
                />

                <Input
                  label="Lastname"
                  name="lastName"
                  type="text"
                  labelClassName="contact__form-label"
                  className="contact__form-input"
                  outClassName="contact__form-out"
                  value={state.lastName}
                  onChange={(e) => onChangeInput(e, state, setState)}
                  width={`${width >= 749 ? "20.7rem" : "16.3rem"}`}
                  placeholder=" Lastname"
                  error={state.validationErrors.lastName}
                  required
                />
              </div>

              <Input
                label="Email address"
                name="email"
                type="email"
                labelClassName="contact__form-label"
                className="contact__form-input"
                outClassName="contact__form-out"
                value={state.email}
                onChange={(e) => onChangeInput(e, state, setState)}
                width={`${width >= 749 ? "44.6rem" : "34.3rem"}`}
                placeholder="Email address"
                error={state.validationErrors.email}
                required
              />
              <Input
                label="Phone number"
                name="phoneNumber"
                type="text"
                labelClassName="contact__form-label"
                className="contact__form-input"
                outClassName="contact__form-out"
                value={state.phoneNumber}
                onChange={(e) => onChangeInput(e, state, setState)}
                width={`${width >= 749 ? "44.6rem" : "34.3rem"}`}
                placeholder="Phone number"
                error={state.validationErrors.phoneNumber}
                required
              />
            </div>
          )}
          <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="reserve__form-btn"
          >
            <Button
              onClick={reserve}
              text="SUBMIT"
              textClassName="tertiary-text"
              backgroundColour={
                hover ? colours.primarygold700 : colours.primarygold600
              }
              iconColour={colours.primarygold100}
              width={`${width >= 749 ? "44.6rem" : "32.9rem"}`}
            />
          </div>
        </form>
      </div>
    </ReserveContainer>
  );
};

const ReserveContainer = styled.div`
  background-color: #fcf9f5;
  .reserve {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: 2.4rem;
    grid-template-rows: repeat(15, 1fr);
    grid-row-gap: 2.4rem;
    height: 146rem;
    margin-left: 4rem;
    margin-right: 4rem;

    @media only screen and (max-width: 749px) {
      margin-left: 1.6rem;
      margin-right: 1.6rem;
      // height: 98.4rem;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(18, 1fr);
    }

    @media only screen and (max-width: 450px) {
      margin-left: 1.6rem;
      margin-right: 1.6rem;
      // height: 98.4rem;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(18, 1fr);
    }

    &__form {
      grid-column: 5/9;
      grid-row: 2/15;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-column-gap: 2.4rem;
      grid-template-rows: repeat(13, 1fr);
      grid-row-gap: 2.4rem;

      @media only screen and (max-width: 749px) {
        grid-column: 1/5;
        grid-row: 2/19;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-column-gap: 2.4rem;
        grid-template-rows: repeat(16, 1fr);
        grid-row-gap: 2.4rem;
      }

      @media only screen and (max-width: 450px) {
        grid-column: 1/5;
        grid-row: 2/19;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-column-gap: 2.4rem;
        grid-template-rows: repeat(16, 1fr);
        grid-row-gap: 2.4rem;
      }

      &-intro {
        grid-column: 1/5;
        grid-row: 1/3;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-bottom: -3rem;

        @media only screen and (max-width: 749px) {
          grid-column: 1/5;
          grid-row: 1/3;
        }

        @media only screen and (max-width: 450px) {
          grid-column: 1/5;
          grid-row: 1/3;
          // display: grid;
        }

        &--text1 {
          font-family: "Space Grotesk", sans-serif;
          font-style: normal;
          font-weight: normal;
          font-size: 4rem;
          line-height: 4.8rem;
          color: #000000;

          @media only screen and (max-width: 749px) {
            width: 34.3rem;
            font-weight: 300;
            font-size: 40px;
            line-height: 48px;
          }

          @media only screen and (max-width: 450px) {
            width: 34.3rem;
            font-weight: 300;
            font-size: 40px;
            line-height: 48px;
          }
        }

        &--text2 {
          font-family: "Space Grotesk", sans-serif;
          font-style: normal;
          font-weight: normal;
          font-size: 1.6rem;
          line-height: 2.8rem;
          color: #000000;
        }

        &--text3 {
          font-family: "Space Grotesk", sans-serif;
          font-style: normal;
          font-weight: 600;
          font-size: 1.6rem;
          line-height: 3.2rem;
          color: #000000;
        }

        &--text4 {
          font-family: "Montserrat", sans-serif;
          font-style: normal;
          font-weight: 300;
          font-size: 1.4rem;
          line-height: 1.7rem;
          color: #000000;
        }
      }

      &-radio {
        grid-column: 1/4;
        grid-row: 3/6;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        width: 39rem;
        height: 16rem;
        margin-top: 1rem;

        @media only screen and (max-width: 749px) {
          grid-column: 1/5;
          grid-row: 3/9;
          width: 30rem;
          height: 21rem;
          flex-wrap: wrap;
          margin-top: 2.4rem;
        }

        @media only screen and (max-width: 450px) {
          grid-column: 1/5;
          grid-row: 3/9;
          width: 30rem;
          height: 21rem;
          flex-wrap: wrap;
          margin-top: 2.4rem;
        }

        &-1 {
          display: flex;
          justify-content: space-between;

          @media only screen and (max-width: 749px) {
            width: 30rem;
          }

          @media only screen and (max-width: 450px) {
            width: 30rem;
          }
        }

        &-2 {
          display: flex;
          justify-content: space-between;

          @media only screen and (max-width: 749px) {
            width: 28rem;
          }

          @media only screen and (max-width: 450px) {
            width: 28rem;
          }
        }

        &-3 {
          display: flex;
          justify-content: space-between;
          width: 27rem;

          @media only screen and (max-width: 749px) {
            width: 22.5rem;
          }

          @media only screen and (max-width: 450px) {
            width: 22.5rem;
          }
        }

        &-4 {
          display: flex;
          justify-content: space-between;
          @media only screen and (max-width: 749px) {
            width: 28rem;
          }

          @media only screen and (max-width: 450px) {
            width: 28rem;
          }
        }
      }

      &-info {
        grid-column: 1/5;
        grid-row: 5/6;
        /* margin-top: 6rem; */
        display: flex;

        @media only screen and (max-width: 749px) {
          grid-column: 1/5;
          grid-row: 6/7;
          margin-top: 2rem;
        }

        @media only screen and (max-width: 450px) {
          grid-column: 1/5;
          grid-row: 6/7;
          margin-top: 2rem;
        }

        &--icon {
          padding: 1rem 1rem 0 0.5rem;
        }
        &--text {
          &-primary {
            font-family: "Montserrat", sans-serif;
            font-style: normal;
            font-weight: 400;
            font-size: 2rem;
            line-height: 3.2rem;
            margin-bottom: 0.5rem;
            color: #000000;
          }

          &-secondary {
            font-family: "Montserrat", sans-serif;
            font-style: normal;
            font-weight: 300;
            font-size: 1.4rem;
            line-height: 1.7rem;

            color: #000000;
          }
        }
      }

      &-date {
        grid-column: 1/5;
        grid-row: 6/10;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        @media only screen and (max-width: 749px) {
          grid-column: 1/5;
          grid-row: 7/12;
          margin-top: 2.4rem;
        }

        @media only screen and (max-width: 450px) {
          grid-column: 1/5;
          grid-row: 7/12;
          margin-top: 2.4rem;
        }
      }

      &-contact {
        grid-row: 10/13;
        grid-column: 1/5;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        @media only screen and (max-width: 749px) {
          grid-column: 1/5;
          grid-row: 12/16;
          margin-top: 2.4rem;
        }

        @media only screen and (max-width: 450px) {
          grid-column: 1/5;
          grid-row: 12/16;
          // display: grid;
          margin-top: 2.4rem;
        }

        &--head {
          font-family: "Space Grotesk", sans-serif;
          font-style: normal;
          font-weight: 600;
          font-size: 1.6rem;
          line-height: 3.2rem;

          color: #000000;
        }

        &-small {
          display: flex;
          justify-content: space-between;
          width: 44.6rem;

          @media only screen and (max-width: 749px) {
            width: 34.3rem;
          }

          @media only screen and (max-width: 450px) {
            width: 34.3rem;
          }
        }
      }

      &-btn {
        grid-column: 1/5;

        @media only screen and (max-width: 749px) {
          grid-row: 16/18;
        }

        @media only screen and (max-width: 450px) {
          grid-row: 16/18;
        }

        grid-row: 13/14;
        cursor: pointer;
      }
    }
  }

  .place {
    width: 44.6rem;
    background-color: #ffffff;
    padding: 1rem 2rem;
    height: 10.4rem;
    display: inline-block;
    background: #ffffff;
    /* primaryGrey200 */

    border: 1px solid #cccccc;
    box-sizing: border-box;
    outline: none;
    font-size: 1.6rem;
    line-height: 2.1rem;
    margin-bottom: 2.4rem;

    @media only screen and (max-width: 749px) {
      width: 34.3rem;
    }

    @media only screen and (max-width: 450px) {
      width: 34.3rem;
    }
  }
  .place::-webkit-input-placeholder {
    font-family: "Montserrat", sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 1.6rem;
    line-height: 2rem;
    color: #4d4d4d;
  }

  .place:-moz-placeholder {
    font-family: "Montserrat", sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 1.6rem;
    line-height: 2rem;
    color: #4d4d4d;
  }

  .place::-moz-placeholder {
    font-family: "Montserrat", sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 1.6rem;
    line-height: 2rem;
    color: #4d4d4d;
  }

  .place:-ms-input-placeholder {
    font-family: "Montserrat", sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 1.6rem;
    line-height: 2rem;
    color: #4d4d4d;
  }

  .place::placeholder {
    font-family: "Montserrat", sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 1.6rem;
    line-height: 2rem;
    color: #4d4d4d;
  }

  .date-details {
    padding: 1rem 0rem 1rem 1.5rem;
    cursor: pointer;
    border: 1px solid #cccccc;
    background-color: #fff;
    list-style: none;
    height: 24px;
    width: 43.1rem;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    font-family: "Montserrat", sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 1.6rem;
    line-height: 2rem;
    color: #4d4d4d;

    @media only screen and (max-width: 749px) {
      width: 32.9rem;
    }
  }

  .details {
    position: relative;
    width: 44.6rem;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    flex-direction: column;

    @media only screen and (max-width: 749px) {
      width: 34.4rem;
    }
  }

  .details[open] {
    z-index: 1;
  }

  .summary {
    padding: 1rem 1.5rem;
    cursor: pointer;
    border: 1px solid #cccccc;
    background-color: #fff;
    list-style: none;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: "Montserrat", sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 1.6rem;
    line-height: 2rem;
    color: #4d4d4d;
  }

  .summary::-webkit-details-marker {
    display: none;
  }

  .details[open] .summary:before {
    content: "";
    display: block;
    width: 100vw;
    background: transparent;
    position: fixed;
    top: 0;
    left: 0;
  }

  .summary:after {
    content: "";
    display: inline-block;
    float: right;
    width: 1rem;
    height: 1rem;
    border-bottom: 1px solid currentColor;
    border-left: 1px solid currentColor;
    border-bottom-left-radius: 2px;
    transform: rotate(-45deg) translate(50%, 0%);
    transform-origin: center center;
    transition: transform ease-in-out 100ms;
    color: #000;
  }

  .summary:focus {
    outline: none;
  }

  .details[open] .summary:after {
    transform: rotate(-45deg) translate(50%, 0%);
    font-weight: 700;
  }

  .ul {
    width: 100%;
    background: #fff;
    position: absolute;
    top: calc(100% + 0.5rem);
    left: 0;
    padding: 1rem;
    margin: 0;
    box-sizing: border-box;
    border-radius: 5px;
    max-height: 200px;
    overflow-y: auto;
    border: 1px solid #cccccc;
  }

  .ul > li {
    margin: 0;
    padding: 1rem 0;
    font-family: "Montserrat", sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 1.4rem;
    line-height: 1.4rem;
    color: #000000;
    border-bottom: 1px solid #cccccc;

    &:hover {
      cursor: pointer;
    }
  }

  .ul > li:first-child {
    padding-top: 0;
  }

  .ul > li:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }

  .mt-2 {
    margin-top: 2rem;
  }

  .select__input > p {
    display: flex;
    justify-items: left;
    font-family: "Montserrat", sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 1.4rem;
    line-height: 1.4rem;
    color: #000000;
    padding-bottom: 0.6rem;
  }

  .tertiary-text {
    color: ${({ hover }) => (hover ? "#fff" : "#000")};
    font-weight: ${({ hover }) => (hover ? "bold" : "normal")};
  }
`;

const InputContainer = styled.div`
  .input {
    @media (max-width: 768px) {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      width: 30%;
      margin-right: auto;
    }
    &__label {
      display: flex;
      justify-items: left;
      font-family: "Montserrat", sans-serif;
      font-style: normal;
      font-weight: 300;
      font-size: 1.4rem;
      line-height: 1.4rem;

      color: #000000;
    }
    &__test {
      /* width: 31.2rem; */
      /* width: 100%; */
      padding: 1rem 2rem;
      margin-top: 2px;
      margin-bottom: 1.6rem;
      display: inline-block;
      background: #ffffff;
      /* primaryGrey200 */

      border: 1px solid #cccccc;
      box-sizing: border-box;
      outline: none;
      font-size: 1.6rem;
      line-height: 2.1rem;
    }
  }

  input {
    @media (max-width: 768px) {
      // width: 56rem;
    }
  }

  .input__test::-webkit-input-placeholder {
    /* WebKit, Blink, Edge */
    font-family: "Montserrat", sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 1.6rem;
    line-height: 2rem;
    color: #4d4d4d;
  }
  .input__test:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    font-family: "Montserrat", sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 1.6rem;
    line-height: 2rem;
    color: #4d4d4d;
    opacity: 1;
  }
  .input__test::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    font-family: "Montserrat", sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 1.6rem;
    line-height: 2rem;
    color: #4d4d4d;
    opacity: 1;
  }
  .input__test:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    font-family: "Montserrat", sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 1.6rem;
    line-height: 2rem;
    color: #4d4d4d;
  }
  .input__test::-ms-input-placeholder {
    /* Microsoft Edge */
    font-family: "Montserrat", sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 1.6rem;
    line-height: 2rem;
    color: #4d4d4d;
  }

  .input__test::placeholder {
    /* Most modern browsers support this now. */
    font-family: "Montserrat", sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 1.6rem;
    line-height: 2rem;
    color: #4d4d4d;
  }

  .error__input-text {
    margin-top: -1.3rem;
    font-family: "Montserrat", sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 1.2rem;
    line-height: 1.5rem;

    color: #ef4444;
    transition: all 0.3s;
    /* line-height: .5rem; */
  }

  .error__input {
    border: 2px solid #ef4444;
    box-sizing: border-box;
    border-radius: 4px;
    transition: all 0.3s;
  }
  .active {
    background: red;
    border: 1px solid #dfc09a;
  }
`;

export default Reserve;
