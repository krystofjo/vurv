import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  const state = props.state;
  const fill = props.fill;

  return (
    <button
      className={`${classes.button} ${classes[state]} ${classes[fill]} ${props.className}`}
      style={props.style}
      type={props.type || "button"}
      onClick={props.onClick}
    >
        {props.children}
    </button>
  );
};

export default Button;
