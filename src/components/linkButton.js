import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Icon from './icon';

export default function LinkButton({
  endIcon,
  startIcon,
  startIconColor,
  endIconColor,
  startIconClassName,
  className,
  labelClassName,
  label,
  labelStyle,
  ...props
}) {
  return (
    <StyledLink className={`LinkButton ${className}`} {...props}>
      {startIcon &&
        <Icon
          Name={startIcon}
          height="24"
          width="24"
          className='LinkButton__startIcon'
          colour={endIconColor}
        />}
      <span
        className={`LinkButton__text ${labelClassName}`}
        style={labelStyle}
      >
        {label}
      </span>
      {endIcon && <Icon
        Name={endIcon}
        height="24"
        width="24"
        className='LinkButton__endIcon'
        colour={endIconColor}
      />}
    </StyledLink>
  )
}

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 48px;
  padding: 0px 16px !important;
  cursor: pointer;
  z-index: 15;
  background-color: #DFC09A;

  .LinkButton__text {
    font-weight: 400;
    font-family: "Montserrat", sans-serif;
    font-size: 14px;
    color: #000000;
    line-height: 17px;
  }

  .LinkButton__endIcon {
    margin-left: auto;
  }

  &.disabled {
    pointer-events: none;
  }
`