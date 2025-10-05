import React from "react";
import styled from "styled-components";

function Radio({
  name,
  type,
  placeholder,
  onChange,
  className,
  labelClassName,
  value,
  error,
  children,
  label,
  width,
  backgroundColor,
  onKeyUp,
  onClick,
  outClassName,
  disabled,
  ...props
}) {
  return (
    <RadioContainer>
      <label className={`radio-control ${className}`}>
        <input type="radio" name={name} checked={value} onChange={onChange} />
        {label}
      </label>
    </RadioContainer>
  );
}

const RadioContainer = styled.div`
  .radio {
    &-control {
      width: fit-content;
      padding: 1.2rem;
      font-family: "Montserrat", sans-serif;
      font-style: normal;
      font-weight: 300;
      font-size: 14px;
      line-height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #fcf9f5;
      cursor: pointer;

      &:hover {
        background: rgba(223, 192, 154, 0.25);
        border: 1px solid #fcf9f5;
      }
    }
  }

  input[type="radio"] {
    /* Add if not using autoprefixer */
    -webkit-appearance: none;
    /* Remove most all native input styles */
    appearance: none;
    /* For iOS < 15 */
    background-color: var(--form-background);
    /* Not removed via appearance */
    margin: 0;
    /* Add if not using autoprefixer */
    -webkit-appearance: none;
    appearance: none;
    /* For iOS < 15 to remove gradient background */
    background-color: #fff;
    /* Not removed via appearance */
    margin: 0;
  }

  .active {
    transition: all 0.5s ease-in-out;
    background: #fcf9f5;
    border: 1px solid #fcf9f5;
    pointer-events: none;
  }
`;
export default Radio;
