import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Input from "../components/input";
import { onChangeInput } from "../util/helpers";
import { validateSignUp } from "../util/formValidationRules";
import Icon from "../components/icon";

const rootUrl = `${process.env.REACT_APP_API_URL}`;

function Signup2() {
  const navigate = useNavigate();
  const location = useLocation();
  const emailFromPrevStep = location.state?.email || "";

  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: emailFromPrevStep,
    username: emailFromPrevStep,
    password: "",
    confirmPassword: "",
    signUpError: "",
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
        method: "post",
        url: `${rootUrl}/auth/register`,
        data: values,
      }).catch((err) => {
        if (err.message.includes("422")) {
          setState((prevState) => ({
            ...prevState,
            validationErrors: {
              ...prevState.validationErrors,
              email: "email already exists",
            },
            signUpError: "email already exists",
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
            signUpError: err.message,
          }));
        }
      });
      if (response) {
        if (response.status === 200) {
          navigate("/signin");
        }
      }
    }

    setState((prevState) => ({ ...prevState, isLoading: false }));
  }

  return (
    <Signup2Container>
      <div className="signup">
        <form className="signup__form">
          <div className="signup__form-intro">
            <p className="signup__form-intro--text1">Create your account</p>
            <p className="signup__form-intro--text2">
              Provide your details below to complete your sign up
            </p>
          </div>

          {state.signUpError && (
            <div className="error__div">
              <p>{state.signUpError}</p>
            </div>
          )}

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
              type={Boolean(viewPassword) ? "text" : "password"}
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
                Name={Boolean(viewPassword) ? "Eye" : "EyeClosed"}
                height="16px"
                width="16px"
                onClick={() => setViewPassword(!viewPassword)}
                className="toggle-visibility"
              />
            </Input>
          </div>

          <div className="signup__form-input4">
            <Input
              label="Password"
              name="confirmPassword"
              type={Boolean(viewPassword) ? "text" : "password"}
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
                Name={Boolean(viewPassword) ? "Eye" : "EyeClosed"}
                height="16px"
                width="16px"
                onClick={() => setViewPassword(!viewPassword)}
                className="toggle-visibility"
              />
            </Input>
          </div>

          <div className="signup__form-btn">
            <button
              onClick={signUp}
              className="submit-btn"
              type="button"
              disabled={state.isLoading}
            >
              {state.isLoading ? (
                <>
                  <i className="fa fa-spinner fa-spin"></i>
                  CREATING ACCOUNT...
                </>
              ) : (
                "CREATE ACCOUNT"
              )}
            </button>
          </div>
        </form>
        <div className="signup__link">
          <p className="signup__link-text">
            Already have an account with us?{" "}
            <Link to="/signin" className="signup__link-signin">
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
  font-family: "Montserrat", sans-serif;
  background-color: #fafafa;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;

  .signup {
    background: white;
    border-radius: 12px;
    padding: 3rem;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    width: 100%;
    max-width: 500px;

    @media (max-width: 768px) {
      padding: 2rem;
    }

    &__form {
      margin-bottom: 2rem;

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

        &--text2 {
          font-size: 1.4rem;
          color: #666;
          line-height: 1.5;
          margin: 0;
        }
      }

      &-input1 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin-bottom: 2rem;

        @media (max-width: 768px) {
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
      }

      &-input2,
      &-input3,
      &-input4 {
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

      &-btn {
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
    }

    &__link {
      text-align: center;

      &-text {
        font-size: 1.4rem;
        color: #666;
        margin: 0;
      }

      &-signin {
        color: #d4af37;
        text-decoration: none;
        font-weight: 600;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;
