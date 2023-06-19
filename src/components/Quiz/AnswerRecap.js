import React, { useState, useContext, Fragment, useEffect } from 'react'
import { QuizContext } from '../../helpers/Context';
import Button from '../UI/Button';
import classes from './Quiz.module.css';
import Stations from './Stations';

export default function AnswerRecap() {
  const { color, questions, score, setScore, answers, answerCorrectness, setGameState, playersNum, currQuestion, setCurrQuestion } = useContext(QuizContext)
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [explanation, setExplanation] = useState("");
  const [correctShown, setCorrectShown] = useState(false);
  const [isTurning, setIsTurning] = useState(true);

  const nextQuestion = ()=>{
    setCurrQuestion(prevState => ({
      rank: prevState.rank+1,
      type: questions[prevState.rank+1].type
      })
    )
    setGameState("questionState")
  }

  useEffect(()=>{setCorrect()})

  const setCorrect = () => {
    switch (questions[currQuestion.rank].answer) {
      case "A":
        setCorrectAnswer(questions[currQuestion.rank].option_A)
        break;
      case "B":
        setCorrectAnswer(questions[currQuestion.rank].option_B)
        break;
      case "C":
        setCorrectAnswer(questions[currQuestion.rank].option_C)
        break;
      default:
        setCorrectAnswer(questions[currQuestion.rank].answer)
        break;
    }
    setExplanation(questions[currQuestion.rank].explanation)
    setCorrectShown(true);
  }

  const finishQuiz = () => {
    setGameState('endScreen')
  }

  setTimeout(() => {
    // showCorrect()
    stopTurning();
  }, '500');

  const stopTurning = ()=> {
    setIsTurning(false);
  }

  const isAnswersCorrect = answerCorrectness[currQuestion.rank]

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
      <div className={`${classes.main} ${isTurning && classes.showing}`}>
        {/* {correctShown && 
        } */}
        <Fragment>
          <div className={classes.card}>
            <h5 style={{color: color}}>Správná odpověď:</h5>
            <h2 style={{color: color}}>{correctAnswer}</h2>
            <p>{explanation}</p>
          </div>
            {(currQuestion.rank != questions.length - 1) &&
              <Button onClick={nextQuestion}>Další Otázka</Button>
            }
            {(currQuestion.rank == questions.length - 1) &&
              <Button onClick={finishQuiz}>Finish Quiz</Button>
            }
        </Fragment>
        {/* {!correctShown && 
          <div>Loading</div>
        } */}
      </div>
      <div className={classes.panel}>
        <Stations playersNum={playersNum} isAnswersCorrect={isAnswersCorrect} correctShown={correctShown}/>
      </div>
    </Fragment>
  )
}
