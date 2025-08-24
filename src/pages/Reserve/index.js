import React, { useEffect } from "react";
import Radio from "../../components/radio";
import styled from "styled-components";
import Icon from "../../components/icon";
import Input from "../../components/input";
import { useState } from "react";

import axios from "axios";
import { useUserContext } from "../../context/user_context";
import Button from "../../components/button";
import colours from "../../lib/colours";
import { onChangeInput } from "../../util/helpers";
import { validateReserve } from "../../util/formValidationRules";
import { zIndexes } from "util/constants";
import DatePicker from "react-date-picker";
import { useHistory } from "react-router-dom";
import { useProductsContext } from "../../context/products_context";

const rootUrl = `${process.env.REACT_APP_API_URL}`;

const Reserve = () => {
  const history = useHistory();
  const { isAuthenticated } = useUserContext();
  const { setReserveData } = useProductsContext();
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [day, setDay] = useState("");
  const [arrivalTime, setArrivalTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [maxGuest, setMaxGuest] = useState(null);
  const [active, setActive] = useState(null);
  const [max, setMax] = useState([]);
  const [state, setState] = useState({
    firstName:
      "" || (localStorage.user && JSON.parse(localStorage.user).firstName),
    lastName:
      "" || (localStorage.user && JSON.parse(localStorage.user).lastName),
    email: "" || (localStorage.user && JSON.parse(localStorage.user).email),
    phoneNumber: "",
    arrival: "",
    guests: "",
    message: "",
    reserveError: "",
    validationErrors: {},
    isLoading: false,
  });

  // {new Date(start).toDateString()}

  useEffect(() => {
    if (selectedDay) {
      setDay(new Date(selectedDay).toDateString());
    }
  }, [selectedDay]);

  // eslint-disable-next-line
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  useEffect(() => {
    if (selectedDay) {
      console.log("selectedDay", selectedDay);
    }
  }, [selectedDay]);

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
    setLoading(true);
    event.preventDefault();
    let values = {
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      phoneNumber: state.phoneNumber,
      arrival: arrivalTime,
      guests: maxGuest || max[0],
      message: state.message,
      date: day,
      room: room ? room : "",
    };

    console.log("values=>", { ...values });
    let errors = validateReserve(values);
    setState((prevState) => ({
      ...prevState,
      validationErrors: {
        ...prevState.validationErrors,
        ...errors,
      },
      isLoading: Object.keys(errors).length ? false : true,
    }));

    if (!Object.keys(errors).length) {
      setLoading(true);
      const response = await axios({
        method: "post",
        url: `${rootUrl}/menu/spaces`,
        data: values,
      }).catch((err) => {
        setLoading(false);
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
        setLoading(false);
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
    setSelectedDay(new Date());
  }

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
            <Radio
              label="The Courtyard"
              name="courtyard"
              value={room === "The Courtyard"}
              onChange={handleCourtYardChange}
              className={active === "The Courtyard" ? "active" : ""}
              required
            />

            <Radio
              label="The Living Room"
              name="livingroom"
              value={room === "The Living Room"}
              onChange={handleLivingRoomChange}
              className={active === "The Living Room" ? "active" : ""}
              required
            />
            <Radio
              label="The Booth"
              name="booth"
              value={room === "The Booth"}
              onChange={handleBoothChange}
              className={active === "The Booth" ? "active" : ""}
              required
            />

            <Radio
              label="The Dining Room"
              name="dining"
              value={room === "The Dining Room"}
              onChange={handleDiningChange}
              className={active === "The Dining Room" ? "active" : ""}
              required
            />

            <Radio
              label="The Parlour"
              name="parlour"
              value={room === "The Parlour"}
              onChange={handleParlourChange}
              className={active === "The Parlour" ? "active" : ""}
              required
            />

            <Radio
              label="The Study"
              name="study"
              value={room === "The Study"}
              onChange={handleStudyChange}
              className={active === "The Study" ? "active" : ""}
              required
            />

            <Radio
              label="The White Room"
              name="whiteroom"
              value={room === "The White Room"}
              onChange={handleWhiteChange}
              className={active === "The White Room" ? "active" : ""}
              required
            />
            <Radio
              label="The Balcony"
              name="balcony"
              value={room === "The Balcony"}
              onChange={handleBalconyChange}
              className={active === "The Balcony" ? "active" : ""}
              required
            />
          </div>

          <div className="reserve__form-info">
            <span className="reserve__form-info--icon">
              <div>
                <Icon
                  Name="Info"
                  colour="transparent"
                  height="16"
                  width="16px"
                />
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
              <InputContainer className="contact__form-out">
                <label
                  className={`input__label contact__form-label  `}
                  htmlFor="date"
                >
                  Select a Date
                </label>
                <DatePicker
                  value={selectedDay}
                  onChange={setSelectedDay}
                  minDate={new Date()}
                  wrapperClassName="responsive-date-picker"
                  shouldHighlightWeekends
                />

                {state.validationErrors.date && (
                  <p className="error__input-text">
                    {state.validationErrors.date}
                  </p>
                )}
              </InputContainer>
            </div>
            <div className="select__input contact__form-input4">
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

            <div className="contact__form-input4 mt-2">
              <textarea
                id="message"
                name="message"
                className="place"
                placeholder="Additional Information"
                onChange={(e) => onChangeInput(e, state, setState)}
                value={state.message}
              />
            </div>
          </div>

          {!isAuthenticated && (
            <div className="reserve__form-contact">
              <h4 className="reserve__form-contact--head">CONTACT DETAILS</h4>
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
              className="submit-btn"
              onClick={reserve}
              disabled={loading}
              text={loading ? "LOADING..." : "SUBMIT"}
              textClassName={loading ? "" : "tertiary-text"}
              backgroundColour={
                hover ? colours.primarygold700 : colours.primarygold600
              }
              iconColour={colours.primarygold100}
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
    margin: 70px 0px 120px;
    padding: 0 16px;
    @media (min-width: 768px) {
      width: 70%;
      margin: 70px auto 120px;
      padding: 0;
    }
    @media (min-width: 1024px) {
      width: 438px;
      margin: 70px auto 120px;
    }

    &__form {
      &-intro {
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        &--text1 {
          font-family: "Space Grotesk", sans-serif;
          font-style: normal;
          font-weight: normal;
          font-size: 4rem;
          line-height: 4.8rem;
          color: #000000;
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
          margin: 24px 0px 16px;
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
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        row-gap: 16px;
        column-gap: 16px;
        margin-top: 1rem;
      }

      &-info {
        display: flex;
        margin: 24px 0 40px;

        &--icon {
          padding: 1rem 1rem 0 0;
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
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-family: "Montserrat", sans-serif;
        position: relative;
        .responsive-date-picker {
          font-family: Space Grotesk;
          font-weight: 400;
          font-size: 16px;
          line-height: 20px;
          width: 100%;
          position: relative;
          margin-bottom: 0;
          padding: 0;
          height: 70px;
          input {
            width: 100%;
            padding: 8px;
          }
        }
        .calender-icon {
          position: absolute;
          transform: translate(-24px, 30px);
          z-index: ${zIndexes.lay};
        }
      }

      &-contact {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

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
          column-gap: 16px;
          row-gap: 16px;
          width: 100%;
        }
        input {
          width: 100%;
        }
      }

      &-btn {
        cursor: pointer;
        .submit-btn {
          height: 47px;
        }
      }
    }
    .contact__form-out {
      width: 100%;
      margin-bottom: 16px;
    }
  }

  .place {
    width: 100%;
    background-color: #ffffff;
    padding: 8px;
    height: 10.4rem;
    display: inline-block;
    border: 1px solid #cccccc;
    box-sizing: border-box;
    outline: none;
    font-size: 1.6rem;
    line-height: 2.1rem;
    margin-bottom: 2.4rem;
    font-family: "Montserrat", sans-serif;
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

  .details {
    position: relative;
    height: 48px;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .details[open] {
    z-index: 1;
  }

  .summary {
    height: 48px;
    padding: 8px;
    cursor: pointer;
    border: 1px solid #cccccc;
    background-color: #fff;
    list-style: none;
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
    width: 1rem;
    height: 1rem;
    margin-right: 8px;
    border-bottom: 2px solid currentColor;
    border-left: 2px solid currentColor;
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
    list-style: none;
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
      padding: 8px;
      margin-top: 2px;
      margin-bottom: 1.6rem;
      display: inline-block;
      background: #ffffff;
      font-family: "Montserrat", sans-serif;
      border: 1px solid #cccccc;
      box-sizing: border-box;
      outline: none;
      font-size: 1.6rem;
      line-height: 2.1rem;
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
