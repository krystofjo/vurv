import React, {Fragment, useState} from 'react'
import classes from '../PlayerStation.module.css';

export default function Abc(props) {

  const [inputValid, setInputValid] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState('');

  const color = props.color
  const lightened = color.concat(75);

  const playerId = props.playerId;

  const optChangedHandler = (option) => {
    setSelectedOpt(option);
    setInputValid(true)
  }

  const onSubmitHandler = (event) => {
    console.log(event)
    event.preventDefault();
    if(inputValid) {
      props.setPlayerOption(`player_${playerId}`,selectedOpt);
      props.setIsSubmitted(true);
    }
  }

  return (
    <Fragment>
      <div className={classes.abc}>
        <button className={`${classes.button} ${classes.abcButton}`} style={{backgroundColor: selectedOpt=='A' ? lightened:'white', color: selectedOpt=='A' ? 'black':'black'}} onClick={()=>{optChangedHandler('A')}}><h4>A</h4></button>
        <button className={`${classes.button} ${classes.abcButton}`} style={{backgroundColor: selectedOpt=='B' ? lightened:'white', color: selectedOpt=='B' ? 'black':'black'}} onClick={()=>{optChangedHandler('B')}}><h4>B</h4></button>
        <button className={`${classes.button} ${classes.abcButton}`} style={{backgroundColor: selectedOpt=='C' ? lightened:'white', color: selectedOpt=='C' ? 'black':'black'}} onClick={()=>{optChangedHandler('C')}}><h4>C</h4></button>
      </div>
      <div className={classes.confirmContainer}>
        <button className={`${classes.button} ${classes.confirm}`} style={{backgroundColor: inputValid && color, color: 'white'}} type='submit' state={inputValid ? 'primary':'disabled'} onClick={onSubmitHandler}>
          <h6>
            Potvrdit
          </h6>
        </button>
      </div>
    </Fragment>
  )
}
