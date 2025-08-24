import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Input from '../components/input';
import { useUserContext } from '../context/user_context';
import { onChangeInput } from '../util/helpers';
import { validateLogin } from '../util/formValidationRules';
import { LOGIN_ERROR, LOGIN_LOAD, LOGIN_SUCCESS } from '../action';
import Icon from 'components/icon';

const rootUrl = `${process.env.REACT_APP_API_URL}`;

function Signin() {
  const { isLoading, loginErrors, dispatch } = useUserContext();
  const [view, setView] = useState(false);
  const history = useHistory();
  const [state, setState] = useState({
    username: '',
    password: '',
    loginError: '',
    validationErrors: {},
  });

  async function Login(event) {
    event.preventDefault();
    const values = {
      username: state.username,
      password: state.password,
    };
    const errors = validateLogin(values);

    if (!Object.keys(errors).length) {
      dispatch({ type: LOGIN_LOAD });
      try {
        const response = await axios({
          method: 'post',
          url: `${rootUrl}/auth/login`,
          data: values,
        });
        dispatch({ type: LOGIN_SUCCESS, payload: response.data });

        if (response.data.status === 'OK') {
          history.push('/restaurant');
          window.location.reload();
        }
      } catch (error) {
        dispatch({ type: LOGIN_ERROR });
      }
    }
  }
  return (
    <SigninContainer>
      <form className="signin__form">
        <div className="signin__form-intro">
          <p className="signin__form-intro--text1">Sign in to your account</p>
            {loginErrors && (
              <div className="error__div">
                <p>{loginErrors}</p>
              </div>
            )}
          </div>

          <div className="signin__form-input1">
            <Input
              label="Email address"
              name="username"
              type="email"
              labelClassName="contact__form-label"
              className="contact__form-input"
              outClassName="contact__form-out"
              value={state.username}
              onChange={(e) => onChangeInput(e, state, setState)}
              placeholder="Email address"
              error={state.validationErrors.username}
              required
            />
          </div>

          <div className="signin__form-input2">
            <Input
              label="Password"
              name="password"
              type={Boolean(view) ? 'text' : 'password'}
              labelClassName="contact__form-label"
              className="contact__form-input"
              outClassName="contact__form-out"
              value={state.firstName}
              onChange={(e) => onChangeInput(e, state, setState)}
              placeholder="Password"
              error={state.validationErrors.password}
              required
          >
            <Icon
              Name={ Boolean(view) ? 'Eye' : 'EyeClosed' }
              height='16px'
              width='16px'
              onClick={ () => setView(!view) }
              className='toggle-visibility'
            />
          </Input>
          </div>

          <div className="signin__form-btn signin_cont">
          <button
            onClick={Login}
            className="buttonload flex submit-btn"
            style={{ cursor: "pointer" }}
          >
            <i className={isLoading ? "fa fa-spinner fa-spin" : ""}></i>
            SIGN IN
          </button>
          </div>
          <div className="signin__link">
            <p className="signin__link-text">
              Don’t have an account with us?
              {' '}
              <Link to="/register" className="signup__link">
                Sign up here
              </Link>
            </p>
          </div>
        </form>
    </SigninContainer>
  );
}

export default Signin;

const SigninContainer = styled.div`
    background-color: #fcf9f5;
    padding: 57px 16px;

    .signin__form {
      @media (min-width: 768px) {
        width: 50%;
        margin: 0 auto;
      }
      @media (min-width: 1024px) {
        width: 400px;
        margin-bottom: 144px;
      }
      &-intro {
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        &--text1 {
          font-family: "Space Grotesk", sans-serif;
          font-style: normal;
          font-weight: 300;
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
      }

      &-btn {
        margin-top: -2rem;
        cursor: pointer;

        &:hover {
          color: #fff;
        }
      }
    }

    .signin__link {
      text-decoration: none;
      font-family: "Space Grotesk", sans-serif;
      font-style: normal;
      font-weight: 300;
      font-size: 1.6rem;
      line-height: 2.8rem;
      margin-top: 2rem;
      color: #000000;

      .signup__link {
        font-weight: 500;
      }
    }

  .flex {
    display: flex;
    justify-content: space-between;
  }

  .tertiary-text {
    padding-right: 10px;
  }

  .signin_cont {
    margin-top: 24px;
    height: 47px;
    display: flex;
    align-items: center;
    .submit-btn{
      height: 100%;
      width: 100%;
    }
    &:hover {
      .tertiary-text {
        color: #fff;
      }
    }
    @media (min-width: 1024px) {
      width: 153px;
    }
  }

  img {
    height: 40px;
    width: 40px;
    background: none;
    border: 0;
  }

  .error__div {
    margin-top: 1rem;
  }

  .error__div > p {
    font-family: Space Grotesk;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px;
    letter-spacing: 0em;
    text-align: left;
    color: #dc2626;
  }

  a {
    text-decoration: none;
    text-decoration-line: underline;
    font-family: "Space Grotesk", sans-serif;
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
