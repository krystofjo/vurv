import React, { Fragment } from "react";
import classes from './BubbleTail.module.css'

export default function BubbleTail(props) {
  const color = props.color || "black";
  const width = props.width || "30px";
  const height = props.height || "30px";

  return (
    <div className={`${props.className} ${classes.tailContainer}`}>
      <svg
      className={classes.tail}
        width={width}
        height={height}
        viewBox="0 0 35 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.5 30L0.179492 5.52035e-07L34.8205 3.58045e-06L17.5 30Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
