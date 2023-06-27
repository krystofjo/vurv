import React, {useState} from 'react'
import Button from '../../UI/Button'
import classes from '../PlayerStation.module.css'

export default function Numeric(props) {
  const [numInput, setNumInput] = useState('');
  const [inputValid, setInputValid] = useState(false);

  const color = props.color;
  const lightened = color.concat(75);

  const playerId = props.playerId;

  let numericKeypad = [];

  const onNumInputChange = (e) => {
    setNumInput(() => (
      e.target.value))
    if(e.target.value == "") {
      setInputValid(false)
    } else {
      setInputValid(true)
    }
  }

  const keypadInputHandler = (input) => {
    setNumInput(prevState => (
      prevState + input))
    setInputValid(true)
  }

  const deleteHandler = () => {
    setNumInput('')
    setInputValid(false)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if(inputValid) {
      props.setPlayerOption(`player_${playerId}`, parseInt(numInput));
      props.setIsSubmitted(true);
    }
  }

  for (let i = 0; i < 10; i++) {
    let num = i;
    const numClass = "num"+num.toString();
    numericKeypad.push(
      <div key={i} className={`${classes.numkey} ${classes[numClass]}`}>
        <button className={`${classes.button} ${classes.numButton} ${classes.text}`} state='secondary' fill="fill" onClick={()=> keypadInputHandler(i)}>
          <h6>
            {i}
          </h6>
        </button>
      </div>
  )}


  return (
    <div className={classes.num}>
      <input className={classes.field} style={{backgroundColor: lightened}} type='number' value={numInput} onChange={onNumInputChange}></input>
      <div className={classes.numkeypad}>
        {numericKeypad}
        {console.log(props.inputValid)}
        <button className={`${classes.button} ${classes.numButton}`} style={{backgroundColor: inputValid && '#df4759', color: inputValid ? 'white':'lightgrey'}} onClick={deleteHandler}>
          <h6>
            ×
          </h6>
        </button>
        <button className={`${classes.button} ${classes.numButton}`} style={{backgroundColor: inputValid && color, color: inputValid ? 'white':'lightgrey'}} type='submit' onClick={onSubmitHandler}>
          <h6>
            OK
          </h6>
        </button>
      </div>
    </div>
  )
}
