import React from 'react'
import Button from './Button';
import Icon from './Icon.jsx';
import classes from "./IconButton.module.css"

export default function IconButton(props) {
  const direction = props.direction || 'row';
  const width = props.width;

  const color = props.color || "#000000"
  const lightened = color.concat('33');

  return (
    <Button onClick={props.onClick} style={{backgroundColor: lightened}}>
      <div className={`${classes[direction]}`}>
        <Icon color={color} type={props.type}></Icon>
        <div style={{color: color}}>
        {props.children}
        </div>
      </div>
    </Button>
  )
}
