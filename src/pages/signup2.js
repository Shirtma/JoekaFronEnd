import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Input from '../components/input';
import { onChangeInput } from '../util/helpers';
import { validateSignUp } from '../util/formValidationRules';
import Icon from 'components/icon';

const rootUrl = `${process.env.REACT_APP_API_URL}`;

function Signup2() {
  const history = useHistory();
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    signUpError: '',
    validationErrors: {},
    isLoading: false,
  });

  const [viewPassword, setViewPassword] = useState(false);

  async function signUp(event) {
    event.preventDefault();
    const values = {
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      password: state.password,
      confirmPassword: state.confirmPassword,
      username: state.email,
    };
    const errors = validateSignUp(values);
    setState((prevState) => ({
      ...prevState,
      validationErrors: {
        ...prevState.validationErrors,
        ...errors,
      },
      isLoading: !Object.keys(errors).length,
    }));

    if (!Object.keys(errors).length) {
      const response = await axios({
        method: 'post',
        url: `${rootUrl}/auth/register`,
        data: values,
      }).catch((err) => {
        if (err.message.includes('422')) {
          setState((prevState) => ({
            ...prevState,
            validationErrors: {
              ...prevState.validationErrors,
              email: 'email already exists',
            },
            signUpError: 'email already exists',
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            signUpError: err.message,
          }));
        }
      });
      if (response) {
        if (response.status === 200) {
          goTo('/login');
        }
      } else {
        // toggleError(true, 'there is no user with that username')
      }
    }

    setState((prevState) => ({ ...prevState, isLoading: false }));
  }

  const goTo = (path) => history.push(path);

  return (
    <Signup2Container>
      <div className="signup">
        <form className="signup__form">
          <div className="signup__form-intro">
            <p className="signup__form-intro--text1">Create your account</p>
            <p className="signup__form-intro--text2">
              Provide your details below to complete you sign up
            </p>
          </div>

          <div className="signup__form-input1">
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
              placeholder="Lastname"
              error={state.validationErrors.lastName}
              required
            />
          </div>

          <div className="signup__form-input2">
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
          </div>

          <div className="signup__form-input3">
            <Input
              label="Create password"
              name="password"
              type={Boolean(viewPassword) ? 'text' : 'password'}
              labelClassName="contact__form-label"
              className="contact__form-input"
              outClassName="contact__form-out"
              value={state.password}
              onChange={(e) => onChangeInput(e, state, setState)}
              placeholder="Password"
              error={state.validationErrors.password}
              required
            >
              <Icon
                Name={ Boolean(viewPassword) ? 'Eye' : 'EyeClosed' }
                height='16px'
                width='16px'
                onClick={ () => setViewPassword(!viewPassword) }
                className='toggle-visibility'
              />
            </Input>
          </div>

          <div className="signup__form-input4">
            <Input
              label="Password"
              name="confirmPassword"
              type={Boolean(viewPassword) ? 'text' : 'password'}
              labelClassName="contact__form-label"
              className="contact__form-input"
              outClassName="contact__form-out"
              value={state.confirmPassword}
              onChange={(e) => onChangeInput(e, state, setState)}
              placeholder="Re-enter Password"
              error={state.validationErrors.confirmPassword}
              required
            >
              <Icon
                Name={ Boolean(viewPassword) ? 'Eye' : 'EyeClosed' }
                height='16px'
                width='16px'
                onClick={ () => setViewPassword(!viewPassword) }
                className='toggle-visibility'
            />
            </Input>
          </div>

          <div className="signup__form-btn">
            <button
            onClick={signUp}
            className="buttonload flex submit-btn"
            style={{ cursor: "pointer" }}
          >
            <i className={state.isLoading ? "fa fa-spinner fa-spin" : ""}></i>
            {state.isLoading ? 'Loading' : 'SUBMIT'}
          </button>
          </div>
        </form>
        <div className="signup__link">
          <p className="signup__link-text">
            Already have an account with us?
            {' '}
            {' '}

            <Link to="/login" className="signup__link-signin">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </Signup2Container>
  );
}

export default Signup2;

const Signup2Container = styled.div`
  background-color: #fcf9f5;
  padding: 57px 16px;

  .signup {
    display: flex;
    flex-direction: column;

      @media (min-width: 768px) {
        width: 50%;
        margin: 0 auto;
      }
      @media (min-width: 1024px) {
        width: 400px;
        margin-bottom: 144px;
      }

    &__form {

      &-intro {

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
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        column-gap: 16px;
        @media (min-width: 1024px) {
          display: flex;
          flex-direction: row;
          row-gap: 16px;
      }
      }

      &-btn {
        height: 47px;
        margin: 24px 0 40px;
        .submit-btn{
          height: 100%;
          width: 100%;
        }
      }
    }

    &__link {
      text-decoration: none;
      font-family: 'Space Grotesk', sans-serif;
      font-style: normal;
      font-weight: 500;
      font-size: 1.6rem;
      line-height: 2.8rem;
      color: #000000;
    }
  }

  a {
    text-decoration: none;
    text-decoration-line: underline;
    font-family: 'Space Grotesk', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 2.8rem;
    color: #000000;
  }
  .contact__form-out {
    margin-top: 16px;
    input {
      width: 100%;
    }
  }
  .buttonload {
    background-color: #DFC09A;
    border: none;
    color: #000000;
    min-height: 48px;
    width: 100%;
    cursor: pointer;
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    /* &:hover {
      color: #dfc09a;
    } */
    @media (min-width: 1024px) {
      width: 156px;
    }
  }
  
  /* Add a right margin to each icon */
  .fa,
  .far {
    position: absolute;
    left: 9px;
    transform: translateY(0%, 50%);
  }
`;
