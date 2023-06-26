import React from "react";
import { useState } from "react";
import HideShowIcon from "../UI/HideShowElement";
import classes from "./PlaceQA.module.css";
import Line from "../UI/Line";

export default function PlaceQA(props) {
  const [isVisible, setIsVisible] = useState([false, false, false]);
  const color = props.color || '#FFFFFF';

  const toggleVisibility = (num) => {
    switch (num) {
      case 0:
        setIsVisible((prevState) => {
          return [!prevState[0], false, false];
        });
        break;
      case 1:
        setIsVisible((prevState) => {
          return [false, !prevState[1], false];
        });
        break;
      case 2:
        setIsVisible((prevState) => {
          return [false, false, !prevState[2]];
        });
        break;

      default:
        setIsVisible([false, false, false]);
        break;
    }
  };

  const elements = [];
  for (let i = 0; i < props.questions.length; i++) {
    if (props.questions[i] != null) {
      elements.push({
        q: props.questions[i],
        a: props.answers[i],
      });
    }
  }

  return (
    <div className={classes.block}>
      {elements.map((element, index) => (
        <div key={index}>
          {index!=0 && <Line color={color}/>}
          <div className={classes.bar} onClick={() => toggleVisibility(index)}>
            <div className={classes.offset}></div>
            <h4 className={classes.question}>{element.q}</h4>
            <div className={classes.offset}>
              {isVisible[index] ? (
                <HideShowIcon color={color} type="hide" />
              ) : (
                <HideShowIcon color={color} type="show" />
              )}
            </div>
          </div>
          <div className={classes.ansContainer}>
          {isVisible[index] ? <p className={classes.answer}>{element.a}</p> : <div></div>}
          </div>
        </div>
      ))}
    </div>
  );
}
