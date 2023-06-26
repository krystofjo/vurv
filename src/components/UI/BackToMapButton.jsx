import React, { useContext, Fragment } from 'react'
import { AppContext } from '../../helpers/Context';
import { useNavigate } from 'react-router-dom'
import Button from './Button';
import Icon from './Icon.jsx';
import IconButton from './IconButton';
import classes from './BackToMapButton.module.css';

export default function BackToMapButton(props) {
  // const navigate = useNavigate();
  const { setAppState } = useContext(AppContext);

  const color = props.color;
  const lighten = color.concat('33')



  const onClickHandler = () => {
    // navigate('/')
    setAppState('map')
  }

  return (
    <Fragment>
      <button className={classes.button} onClick={onClickHandler} style={{backgroundColor: lighten}}>
        <div className={classes.row}>
          <Icon size={'2.4vw'} color={props.color} type={props.type}></Icon>
          <div style={{color: props.color}}>
            <h5>
              Zpět na mapu
            </h5>
          </div>
        </div>
    </button>
    </Fragment>
  )
}
