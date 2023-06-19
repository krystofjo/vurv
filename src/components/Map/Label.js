import React, { Fragment } from "react";
import BubbleTail from "../UI/BubbleTail";
import classes from "./Label.module.css";

const Label = (props) => {
  const state = props.state;
  const fill = props.fill;

  return (
    <div className={classes.label}>
      <div>
        <button
          className={`${classes.button} ${classes[state]} ${classes[fill]} ${props.className}`}
          style={props.style}
          type={props.type || "button"}
          onClick={props.onClick}
        >
          {props.children}
        </button>
      </div>
      <BubbleTail width="1.5vw" height="1.5vh" color="white"/>
    </div>
  );
};

export default Label;
