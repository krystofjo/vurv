import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from './Button';
import Icon from './Icon';
import IconButton from './IconButton';
import classes from './BackToMapButton.module.css';

export default function QuitButton(props) {
  const navigate = useNavigate();

  const color = props.color;
  const lighten = color.concat('33')

  return (
    <Fragment>
      <Button onClick={props.onClick} style={{backgroundColor: lighten}}>
        <div className={classes.row}>
          {/* <Icon size={'2vw'} color={props.color} type={"cross"}></Icon> */}
          <div style={{color: props.color}}>
            <h5>
              Ukončit Quiz
            </h5>
          </div>
        </div>
    </Button>
    </Fragment>
  )
}
