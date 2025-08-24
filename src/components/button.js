// import React, { useEffect } from "react";
import Icon from "./icon";

export default function Button({
  icon = "",
  icon2 = "",
  iconRight = "",
  iconColour = "",
  iconRightColour = "",
  backgroundColour = "",
  iconStrokeColour = "",
  iconRightStrokeColour = "",
  text = "",
  width = "",
  onClick = () => {},
  onMouseOver = () => {},
  onMouseLeave = () => {},
  className = "",
  textClassName = "",
  innerClassName = "",
  style = {},
  disabled,
}) {
  return (
    <div
      className={`${className} ${text ? "Button" : "SmallButton"} ${
        disabled ? "not-active-btn" : ""
      }`}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      style={{
        background: backgroundColour,
        width,
        ...{ ...style },
      }}
    >
      {icon ? (
        <div className={innerClassName}>
          {icon2 && (
            <Icon
              Name={icon2}
              colour={iconColour}
              stroke={iconStrokeColour || iconColour}
              className={`ButtonIcon ${text && "ButtonIcon-with-text"}`}
            />
          )}

          {text && (
            <h4
              className={` ${textClassName} ButtonTitle ButtonIcon ${
                icon && "ButtonTitle-with-icon"
              } `}
            >
              {disabled && (
                <i
                  className={disabled ? "fa fa-spinner fa-spin" : ""}
                  style={{ margin: "1rem" }}
                ></i>
              )}
              {text}
            </h4>
          )}

          {icon && (
            <Icon
              Name={icon}
              colour={iconColour}
              stroke={iconStrokeColour || iconColour}
              className={`ButtonIcon ${text && "ButtonIcon-with-text"}`}
            />
          )}
        </div>
      ) : (
        <h4
          className={` ${textClassName} ButtonTitle ButtonIcon ${
            icon && "ButtonTitle-with-icon"
          }`}
        >
          {disabled && (
            <i
              className={disabled ? "fa fa-spinner fa-spin" : ""}
              style={{ margin: "1rem" }}
            ></i>
          )}
          {text}
        </h4>
      )}

      {iconRight && (
        <Icon
          Name={iconRight}
          colour={iconRightColour}
          stroke={iconRightStrokeColour || iconRightColour}
          className="ButtonIcon"
          style={{ marginLeft: "1rem" }}
        />
      )}
    </div>
  );
}
