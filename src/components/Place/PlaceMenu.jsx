import React, { useState } from 'react'
import MenuButton from '../UI/MenuButton'
import classes from './PlaceMenu.module.css'

export default function PlaceMenu(props) {

  const displayed = props.displayed;
  const color = props.color || "#000000";
  const lightened = color.concat(22);

  return (
      <div className={classes.container}>
        <div className={classes.menubutton}>
          <MenuButton direction='column' color={displayed=="main" ? 'white' : color} lightened={displayed=='main' ? color : lightened} type="picture" onClick={() => props.onClick("main")}>
            Úvod
          </MenuButton>
        </div>
        <div className={classes.menubutton}>
          <MenuButton direction='column' color={displayed=="more" ? 'white' : color} lightened={displayed=='more' ? color : lightened} type="book" onClick={() => props.onClick("more")}>
            Číst více
          </MenuButton>
        </div>
        <div className={classes.menubutton}>
          <MenuButton direction='column' color={displayed=="facts" ? 'white' : color} lightened={displayed=='facts' ? color : lightened} type="bulb" onClick={() => props.onClick("facts")}>
            Věděli jste?
          </MenuButton>
        </div>
        <div className={classes.menubutton}>
          <MenuButton direction='column' color={displayed=="quiz" ? 'white' : color} lightened={displayed=='quiz' ? color : lightened} type="question" onClick={() => props.onClick("quiz")}>
            Quiz
          </MenuButton>
        </div>
      </div>
  )
}
