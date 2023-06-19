import React, {Fragment, useState, useContext} from 'react'
import classes from '../PlayerStation.module.css';
import { QuizContext } from '../../../helpers/Context';

export default function Picture(props) {

  const { questions, currQuestion } = useContext(QuizContext)
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

  const options = questions[currQuestion.rank]
  console.log(options)

  return (
    <Fragment>
      <div className={classes.pic}>
        <button className={`${classes.button} ${classes.picButton}`} style={{backgroundColor: selectedOpt=='A' ? lightened:'white', color: selectedOpt=='A' ? 'black':'black'}} onClick={()=>{optChangedHandler('A')}}><h6>{options.option_A}</h6></button>
        <button className={`${classes.button} ${classes.picButton}`} style={{backgroundColor: selectedOpt=='B' ? lightened:'white', color: selectedOpt=='B' ? 'black':'black'}} onClick={()=>{optChangedHandler('B')}}><h6>{options.option_B}</h6></button>
        <button className={`${classes.button} ${classes.picButton}`} style={{backgroundColor: selectedOpt=='C' ? lightened:'white', color: selectedOpt=='C' ? 'black':'black'}} onClick={()=>{optChangedHandler('C')}}><h6>{options.option_C}</h6></button>
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
