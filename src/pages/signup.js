import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/input";

function Signup() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    isLoading: false,
    error: "",
    validationErrors: {},
  });

  const handleInputChange = (e) => {
    const { value } = e.target;
    setState((prev) => ({
      ...prev,
      email: value,
      error: "",
      validationErrors: {},
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!state.email.trim()) {
      setState((prev) => ({
        ...prev,
        validationErrors: { email: "Email is required" },
      }));
      return;
    }
    if (!emailRegex.test(state.email)) {
      setState((prev) => ({
        ...prev,
        validationErrors: { email: "Please enter a valid email address" },
      }));
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: "" }));

    // Proceed to detailed signup page
    navigate("/register/details", { state: { email: state.email } });
  };

  const handleGoogleSignup = () => {
    // Implement Google OAuth signup
    window.location.href = `${process.env.REACT_APP_API_URL || ""}/auth/google`;
  };

  return (
    <SignupContainer>
      <div className="signup">
        <form className="signup__form" onSubmit={handleSubmit}>
          <div className="signup__form-intro">
            <p className="signup__form-intro--text1">Create your account</p>
            <p className="signup__form-intro--text2">
              Enter your email address to get started.
            </p>
          </div>

          {state.error && (
            <div className="error__div">
              <p>{state.error}</p>
            </div>
          )}

          <div className="signup__form-input1">
            <Input
              label="Email address"
              name="email"
              type="email"
              labelClassName="contact__form-label"
              className="contact__form-input"
              outClassName="contact__form-out"
              value={state.email}
              onChange={handleInputChange}
              placeholder="Enter your email address"
              error={state.validationErrors.email}
              required
            />
          </div>

          <div className="signup__form-btn">
            <button
              type="submit"
              className="submit-btn"
              disabled={state.isLoading}
            >
              {state.isLoading ? (
                <>
                  <i className="fa fa-spinner fa-spin"></i>
                  CHECKING...
                </>
              ) : (
                "CONTINUE"
              )}
            </button>
          </div>
        </form>

        <div className="signup__or">
          <p className="signup__or-text">
            <span className="signup__or-line">OR</span>
          </p>
        </div>

        <div className="signup__google">
          <button
            type="button"
            className="google-btn"
            onClick={handleGoogleSignup}
            disabled={state.isLoading}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>
        </div>

        <div className="signup__link">
          <p className="signup__link-text">
            Already have an account?{" "}
            <Link to="/signin" className="signin__link">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </SignupContainer>
  );
}

export default Signup;

const SignupContainer = styled.div`
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
    max-width: 450px;

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

    &__or {
      margin: 2rem 0;

      &-text {
        text-align: center;
        border-bottom: 1px solid #e0e0e0;
        line-height: 0.1em;
        margin: 0;
        font-size: 1.4rem;
        color: #666;
      }

      &-line {
        background: white;
        padding: 0 20px;
      }
    }

    &__google {
      margin-bottom: 2rem;

      .google-btn {
        width: 100%;
        padding: 1.2rem;
        background: white;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        font-size: 1.4rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        color: #333;

        &:hover:not(:disabled) {
          border-color: #d0d0d0;
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        svg {
          width: 20px;
          height: 20px;
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

      .signin__link {
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
