import PropTypes from 'prop-types';
import styled from 'styled-components';

function Input({
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
  defaultValue,
  backgroundColor,
  onKeyUp,
  onClick,
  outClassName,
  disabled,
  ...props
}) {
  return (
    <InputContainer className={outClassName}>
      {label && (
        <label className={`input__label ${labelClassName}  `} htmlFor={name}>
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        onClick={onClick}
        value={value}
        defaultValue={defaultValue}
        onKeyUp={onKeyUp}
        className={`input__test ${className}  ${error && 'error__input'}`}
        style={{ width, backgroundColor }}
        disabled={disabled}
      />
      {children}
      {error && <p className="error__input-text">{error}</p>}
    </InputContainer>
  );
}

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
      width: 100%;
    }
    &__test {
      padding: 0 8px;
      height: 48px;
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
      width: 100%;
    }
  }

  .input__test::-webkit-input-placeholder {
    /* WebKit, Blink, Edge */
    font-family: "Montserrat", sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 1.6rem;
    line-height: 2rem;
    color: #B3B3B3;
  }
  .input__test:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    font-family: "Montserrat", sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 1.6rem;
    line-height: 2rem;
    color:  #B3B3B3;
    opacity: 1;
  }
  .input__test::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    font-family: "Montserrat", sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 1.6rem;
    line-height: 2rem;
    color:  #B3B3B3;
    opacity: 1;
  }
  .input__test:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    font-family: "Montserrat", sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 1.6rem;
    line-height: 2rem;
    color:  #B3B3B3;
  }
  .input__test::-ms-input-placeholder {
    /* Microsoft Edge */
    font-family: "Montserrat", sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 1.6rem;
    line-height: 2rem;
    color:  #B3B3B3;
  }

  .input__test::placeholder {
    /* Most modern browsers support this now. */
    font-family: "Montserrat", sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 1.6rem;
    line-height: 2rem;
    color: #B3B3B3;
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
  .toggle-visibility {
    position: absolute;
    transform: translate(-30px, 16px);
  }
`;

Input.defaultProps = {
  type: 'text',
  className: '',
  error: '',
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'number', 'password', 'email', 'file']),
  className: PropTypes.string,
  value: PropTypes.any,
  // onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default Input;
