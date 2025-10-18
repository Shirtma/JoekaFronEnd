import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../components/input";
import { useUserContext } from "../context/user_context";
import { onChangeInput } from "../util/helpers";
import { validateLogin } from "../util/formValidationRules";
import { LOGIN_ERROR, LOGIN_LOAD, LOGIN_SUCCESS } from "../action";
import Icon from "../components/icon";

const rootUrl = `${process.env.REACT_APP_API_URL}`;

function Signin() {
  const { isLoading, loginErrors, dispatch } = useUserContext();
  const [view, setView] = useState(false);
  const navigate = useNavigate();
  const [state, setState] = useState({
    username: "",
    password: "",
    loginError: "",
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
          method: "post",
          url: `${rootUrl}/auth/login`,
          data: values,
        });
        dispatch({ type: LOGIN_SUCCESS, payload: response.data });

        if (response.data.status === "OK") {
          navigate("/restaurant");
          window.location.reload();
        }
      } catch (error) {
        dispatch({
          type: LOGIN_ERROR,
          payload:
            error.response?.data?.message || "Login failed. Please try again.",
        });
      }
    } else {
      setState((prev) => ({ ...prev, validationErrors: errors }));
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
            type={Boolean(view) ? "text" : "password"}
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
              Name={Boolean(view) ? "Eye" : "EyeClosed"}
              height="16px"
              width="16px"
              onClick={() => setView(!view)}
              className="toggle-visibility"
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
            Don't have an account with us?{" "}
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
  font-family: "Montserrat", sans-serif;
  background-color: #fafafa;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;

  .signin__form {
    background: white;
    border-radius: 12px;
    padding: 3rem;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    width: 100%;
    max-width: 400px;

    @media (max-width: 768px) {
      padding: 2rem;
    }

    &-intro {
      text-align: center;
      margin-bottom: 3rem;

      &--text1 {
        font-family: "Space Grotesk", sans-serif;
        font-size: 2.8rem;
        font-weight: 600;
        color: #333;
        margin-bottom: 1rem;
        line-height: 1.2;

        @media (max-width: 768px) {
          font-size: 2.4rem;
        }
      }
    }

    &-input1,
    &-input2 {
      margin-bottom: 2rem;
    }

    .contact__form-out {
      input {
        width: 100%;
        padding: 1.2rem;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        font-size: 1.4rem;
        transition: all 0.3s ease;

        &:focus {
          outline: none;
          border-color: #d4af37;
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
        }

        &::placeholder {
          color: #999;
        }
      }

      label {
        font-weight: 600;
        font-size: 1.4rem;
        color: #333;
        margin-bottom: 0.8rem;
        display: block;
      }
    }

    .error__div {
      margin-bottom: 1.5rem;
      padding: 1rem;
      background-color: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
      border-radius: 8px;

      p {
        margin: 0;
        font-size: 1.4rem;
      }
    }
  }

  .signin_cont {
    margin-bottom: 2rem;

    .submit-btn {
      width: 100%;
      padding: 1.5rem;
      background: #0a0a0a;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1.6rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      min-height: 48px;

      &:hover:not(:disabled) {
        background: #000;
        transform: translateY(-1px);
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
      }

      .fa-spinner {
        font-size: 1.4rem;
      }
    }
  }

  .signin__link {
    text-align: center;

    &-text {
      font-size: 1.4rem;
      color: #666;
      margin: 0;
    }

    .signup__link {
      color: #d4af37;
      text-decoration: none;
      font-weight: 600;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .toggle-visibility {
    cursor: pointer;
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #666;

    &:hover {
      color: #333;
    }
  }
`;
