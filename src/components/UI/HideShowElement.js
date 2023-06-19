import React, { Fragment } from "react";
import Icon from "./Icon";
import classes from  "./HideShowElement.module.css"

export default function HideShowElement(props) {
  const type = props.type || "show";
  return (
    <Fragment>
      {type == "show" && (
        <div className={classes.container}>
          <Icon type="eye-open" color={props.color}></Icon>
          <h6 style={{color: props.color}}>Zobrazit</h6>
        </div>
      )}
      {type == "hide" && (
        <div className={classes.container}>
          <Icon type="eye-closed" color={props.color}></Icon>
          <h6 style={{color: props.color}}>Skrýt</h6>
        </div>
      )}
    </Fragment>
  );
}
