import React from "react";
import classes from "./Line.module.css";

export default function Line(props) {
  const color = props.color || 'grey'
  const lighetened = color.concat('33');
  
  return (
    <div className={classes.container}>
      <div className={`${classes.line}`} style={{backgroundColor:lighetened}}></div>
    </div>
  );
}
