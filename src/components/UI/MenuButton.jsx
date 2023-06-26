import React from 'react'
import Button from './Button';
import Icon from './Icon.jsx';
import classes from "./MenuButton.module.css"

export default function MenuButton(props) {

  let color = props.color  
  let lightened = props.lightened

  if(props.selected=='true') {
  color = '#FFFFFF'
  lightened = props.color
  }

  return (
      <button className={classes.button} onClick={props.onClick} style={{backgroundColor: lightened}}>
          <Icon size={'50%'} color={color || 'black'} type={props.type}></Icon>
          <div className={classes.textContainer}>
            <h5 style={{color: color}}>
              {props.children}
            </h5>
          </div>
      </button>
  )
}
