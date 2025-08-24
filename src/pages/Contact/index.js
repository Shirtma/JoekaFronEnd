import React from 'react';
import styled from 'styled-components';
import Input from '../../components/input';
import Button from '../../components/button';
import colours from '../../lib/colours';

// import googlemap from "../../images/googlemapplaceholder.jpg";
import GoogleMap from '../../components/googlemap';

const location = {
  address: '4 A.J. Marinho Drive, Victoria Island, Lagos',
  lat: 6.4275400321274825,
  lng: 3.4320566412903393,
};

function Contact() {

  return (
    <ContactContainer>
      <section className="contact">
        <form className="contact__form">
          <p className="contact__form-intro">Contact us</p>

            <div className="contact__form-input1">
              <Input
                label="Firstname"
                name="firstname"
                type="text"
                labelClassName="contact__form-label"
                className="contact__form-input"
                outClassName="contact__form-out"
                // value={state.firstName}
                // onChange={(e) => onChangeInput(e, state, setState)}
                placeholder="Firstname"
                // error={state.validationErrors.lastName}
                required
              />
            </div>

            <div className="contact__form-input2">
              <Input
                label="Email"
                name="email"
                type="email"
                labelClassName="contact__form-label"
                className="contact__form-input"
                outClassName="contact__form-out"
                // value={state.lastName}
                // onChange={(e) => onChangeInput(e, state, setState)}
                placeholder="Email"
                // error={state.validationErrors.lastName}
                required
              />
            </div>
            <div className="contact__form-input3">
              <Input
                label="Type of Enquiry"
                name="enquiry"
                type="text"
                labelClassName="contact__form-label"
                className="contact__form-input"
                outClassName="contact__form-out"
                // value={state.lastName}
                // onChange={(e) => onChangeInput(e, state, setState)}
                placeholder="Type of enquiry"
                // error={state.validationErrors.lastName}
                required
              />
            </div>

            <div className="contact__form-input4 ">
              <textarea
                id="message"
                name="message"
                className="place"
                placeholder="Message"
                // onChange={handleChange}
                // value={values.bio || ''}
                // style={{

                // }}
              />
            </div>

            <div className="contact__form-btn">
              <Button
                text="SUBMIT"
                textClassName="tertiary-text"
                backgroundColour={colours.primarygold600}
                iconColour={colours.primarygold100}
              />
            </div>
          </form>

        <section className="contact__address">
          <h4 className='heading'>Pay us a visit</h4>

          <div>
            <h5 className='sub-heading'>Address</h5>
            <p>4 A.J. Marinho Drive, Victoria Island, Lagos</p>
          </div>

            <div>
              <h5 className='sub-heading'>For Reservations</h5>
              <a href='tel:+2349082919773'>0908-291-9773</a>
              <a href='mailto:bookings@thehouseng.com'>bookings@thehouseng.com</a>
            </div>

            <div>
              <h5 className='sub-heading'>Takeaway/ Delivery Orders:</h5>
              <a href='tel:+2347086789169'>0708-678-9169</a>
              <a href='mailto:takeout@thehouseng.com'>takeout@thehouseng.com</a>
          </div>
        </section>

        <section className="contact__map">
          <GoogleMap location={location} zoomLevel={17} />
        </section>
        </section>
    </ContactContainer>
  );
}

const ContactContainer = styled.div`
  background-color: #fcf9f5;

  .contact {
    margin: 40px 0 120px;
    display: flex;
    flex-direction: column;
    column-gap: 16px;
    row-gap: 16px;

    @media (min-width: 768px) {
      width: 50%;
      margin: 40px auto 120px;
    }

    @media (min-width: 1024px) {
      width: 100%;
      padding: 40px;
      display: grid;
      grid-template: repeat(2, auto) / repeat(12, 1fr);
      gap: 50px;
    }

    @media (min-width: 1280px) {
      grid-template: repeat(1, auto) / repeat(12, 1fr);
      gap: 100px;
    }

    &__form {
      padding: 16px;
      &-intro {
        font-family: "Space Grotesk", sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 4rem;
        line-height: 4.8rem;
        color: #000000;
        margin-bottom: 16px;
      }

      input, textarea {
        width: 100%;
        padding: 8px;
      }

      &-btn {
        height: 47px;
        .Button {
          height: 100%;
        }
        @media (min-width: 1280px) {
          width: 153px;
        }
      }
      @media (min-width: 1024px) {
        padding: 0;
        grid-column: 1 / 6;
      }
      @media (min-width: 1280px) {
        padding: 0;
        grid-column: 1 / 5;
      }
    }

    &__address {
      padding: 16px;
      display: flex;
      flex-direction: column;
      row-gap: 40px;

      .heading {
        font-family: "Space Grotesk", sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 4rem;
        line-height: 4.8rem;
        color: #000000;
        @media (min-width: 1280px) {
          margin-bottom: 40px;
        }
      }
      .sub-heading {
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 300;
        font-size: 20px;
        line-height: 32px;
        color: #000000;
      }

      p {
          font-family: "Montserrat", sans-serif;
          font-style: normal;
          font-weight: 300;
          font-size: 16px;
          line-height: 24px;
          color: #333333;
      }
      a {
        font-family: 'Red Hat Display';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: #000000;
        display: block;
      }
        @media (min-width: 1024px) {
        padding: 0;
        grid-column: 6 / -1;
      }
      @media (min-width: 1280px) {
        padding: 0;
        grid-column: 5 / 9;
        row-gap: 16px;
      }
    }

    &__map {
      height: 462px;
      &-img {
        width: 100%;
        height: 100%;
      }
        @media (min-width: 1024px) {
        padding: 0;
        grid-column: 5 / 9;
        grid-row: 2 / 3;
      }
      @media (min-width: 1280px) {
        grid-row: 1 / 2;
        grid-column: 9 / -1;
      }
    }
  }

  .place {
    background-color: #ffffff;
    height: 10.4rem;
    display: inline-block;
    background: #ffffff;
    font-family: "Montserrat", sans-serif;
    border: 1px solid #cccccc;
    box-sizing: border-box;
    outline: none;
    font-size: 1.6rem;
    line-height: 2.1rem;
    margin-bottom: 2.4rem;
  }
  .place::-webkit-input-placeholder {
    font-family: "Montserrat", sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 1.6rem;
    line-height: 2rem;
    color: #B3B3B3;
  }

  .place:-moz-placeholder {
    font-family: "Montserrat", sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 1.6rem;
    line-height: 2rem;
    color: #B3B3B3;
  }

  .place::-moz-placeholder {
    font-family: "Montserrat", sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 1.6rem;
    line-height: 2rem;
    color: #B3B3B3;
  }

  .place:-ms-input-placeholder {
    font-family: "Montserrat", sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 1.6rem;
    line-height: 2rem;
    color: #B3B3B3;
  }

  .place::placeholder {
    font-family: "Montserrat", sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 1.6rem;
    line-height: 2rem;
    color: #B3B3B3;
  }

  .img {
    max-width: 100%;
    height: auto;
  }
`;

export default Contact;
