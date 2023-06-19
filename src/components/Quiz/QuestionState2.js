import React, { useState, useContext, useEffect, Fragment } from 'react'
import { QuizContext } from '../../helpers/Context'
import Button from '../UI/Button';
import Stations from './Stations'
import classes from './Quiz.module.css';
import Card from '../UI/Card';

export default function QuestionState() {


  const { color, questions, score, setScore, setGameState, answers, setAnswers, setAnswerCorrectness, currQuestion, setCurrQuestion, playersNum } = useContext(QuizContext)
  const [optionChosen, setOptionChosen] = useState({
    answered: 0,
    player_1: "",
    player_2: "",
    player_3: "",
    player_4: "",
    player_5: "",
  })

  let pic_url = ''

  if(currQuestion.type == 'picture') {
    pic_url = questions[currQuestion.rank].picture.data.attributes.url;
    console.log(pic_url);
  }


  const setPlayerOptionHandler = (player, option) => {
    setOptionChosen(prevState => ({
      ...prevState,
      answered: prevState.answered + 1, 
      [player]: option
    }))
  }

  useEffect(() => {
    console.log("answered", optionChosen.answered, "players", playersNum)
    if (optionChosen.answered == playersNum) {
      evaluateQuestion();
      answerRecap();
    }
  }, [optionChosen]);

  const evaluateQuestion = () => {
    let currAnswers = [];
    let currAnswerCorrectness = [];
    for (let i = 0; i < playersNum; i++) {
      const playerRank = i+1;
      const player = 'player_'+playerRank.toString();
      
      console.log(questions[currQuestion.rank].answer, optionChosen[player])
      currAnswers.push(optionChosen[player]);

      if(questions[currQuestion.rank].answer == optionChosen[player]) {
        
        currAnswerCorrectness.push(true);
        setScore(prevState => ({
          ...prevState,
          [player]: prevState[player]+1
        }))
      } else {
        currAnswerCorrectness.push(false);
      }
    }
    setAnswers(prevState =>({
      ...prevState,
      [currQuestion.rank]: currAnswers
    }))
    setAnswerCorrectness(prevState =>({
      ...prevState,
      [currQuestion.rank]: currAnswerCorrectness
    }))
  }

  const answerRecap = () => {
      setGameState('answerRecap')    
  }

  return (
    <Fragment>
      <div className={classes.header} style={{color: color}}>
        <div className={classes.title}>
          <div className={classes.tag}>
            <h5>Otázka {currQuestion.rank+1}/{questions.length}</h5>
          </div>
          <h2>{questions[currQuestion.rank].question}</h2>
        </div>
      </div>
      <div className={`${classes.main}`}>
        {currQuestion.type === 'ABC' &&
          <div className={classes.card} style={{color: color}}>
            <div className={classes.option}>{`A) ${questions[currQuestion.rank].option_A}`}</div>
            <div className={classes.option}>{`B) ${questions[currQuestion.rank].option_B}`}</div>
            <div className={classes.option}>{`C) ${questions[currQuestion.rank].option_C}`}</div>
          </div>
        }
        {currQuestion.type === 'numeric' &&
          <div className={classes.card} style={{color: color}}>
            <h2>?</h2>
          </div>
        }
        {(currQuestion.type === 'picture' && pic_url!='') &&
          <div className={classes.card}>
            <img className={classes.questionImage} src={pic_url}></img>
          </div>
        }
      </div>
      <br/>
      <div className={classes.panel}>
        <Stations playersNum={playersNum} setPlayerOption={setPlayerOptionHandler}/>
      </div>
    </Fragment>
  )
}
