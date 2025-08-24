import React from 'react';
import styled from 'styled-components';
// import Icon from '../components/icon'
import Sidebar from 'components/sidebar';
import Input from '../components/input';
import Button from '../components/button';
import colours from '../lib/colours';

function Signup() {
  return (
    <>
      <Sidebar />
      <SignupContainer>
        <div className="signup">
          <form className="signup__form">
            <div className="signup__form-intro">
              <p className="signup__form-intro--text1">Create your account</p>
              <p className="signup__form-intro--text2">
                Enter your email address to get started.
              </p>
            </div>

            <div className="signup__form-input1">
              <Input
                label="Email address"
                name="email"
                type="email"
                labelClassName="contact__form-label"
                className="contact__form-input"
                outClassName="contact__form-out"
             // value={state.firstName}
             // onChange={(e) => onChangeInput(e, state, setState)}
                width="44.6rem"
                placeholder="email address"
             // error={state.validationErrors.lastName}
                required
              />
            </div>

            <div className="signup__form-btn">
              <Button
                text="CONTINUE"
                textClassName="tertiary-text"
                backgroundColour={colours.primarygold600}
                iconColour={colours.primarygold100}
                width="13.7rem"
              />
            </div>
          </form>
          <div className="signup__or">
            <p className="signup__or-text">
              <span className="signup__or-line">OR</span>
            </p>
          </div>
          <div className="signup__google">
            <Button
              text="Continue with Google"
              textClassName="tertiary-text "
              className="tertiary"
              innerClassName="google"
              backgroundColour={colours.primarygold100}
              iconColour={colours.primarygold100}
              icon="RArrow"
              icon2="Google"
              width="44.6rem"
            />
          </div>
        </div>
      </SignupContainer>
    </>
  );
}

export default Signup;

const SignupContainer = styled.div`
  background-color: #fcf9f5;
  .signup {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(9, 1fr);
    grid-row-gap: 2.4rem;
    grid-column-gap: 2.4rem;
    height: 80rem;
    margin-left: 4rem;
    margin-right: 4rem;
    &__form {
      grid-column: 5/9;
      grid-row: 2/15;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-column-gap: 2.4rem;
      grid-template-rows: repeat(13, 1fr);
      grid-row-gap: 2.4rem;

      &-intro {
        grid-column: 1/5;
        grid-row: 1/3;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        &--text1 {
          font-family: 'Space Grotesk', sans-serif;
          font-style: normal;
          font-weight: 300;
          font-size: 4rem;
          line-height: 4.8rem;
          color: #000000;
        }

        &--text2 {
          font-family: 'Space Grotesk', sans-serif;
          font-style: normal;
          font-weight: normal;
          font-size: 1.6rem;
          line-height: 2.8rem;
          color: #000000;
        }
      }

      &-input1 {
        grid-column: 1/5;
        grid-row: 3/5;
        margin-top: 1rem;
      }
    }

    &__or {
      grid-column: 5/9;
      grid-row: 6/7;
      &-text {
        width: 100%;
        text-align: center;
        border-bottom: 1px solid #c4c4c4;
        font-family: 'Space Grotesk', sans-serif;
        font-style: normal;
        font-weight: normal;
        line-height: 0.1em;
        font-size: 1.6rem;
        margin: 10px 0 20px;
      }

      &-line {
        background-color: #fcf9f5;
        padding: 0 10px;
      }
    }

    &__google {
      grid-column: 5/9;
      grid-row: 7/8;
    }
  }
`;
