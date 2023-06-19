import React, { useState, useContext, Fragment, useEffect } from 'react'
import { QuizContext } from '../../helpers/Context';
import Button from '../UI/Button';
import classes from './Quiz.module.css';
import flipclasses from './FlipCard.module.css';
import Stations from './Stations';

export default function AnswerRecap() {
  const { color, questions, score, setScore, answers, answerCorrectness, setGameState, playersNum, currQuestion, setCurrQuestion } = useContext(QuizContext)
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [explanation, setExplanation] = useState("");
  const [correctShown, setCorrectShown] = useState(false);

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
      <div className={`${classes.main}`}>
        <Fragment>
          <div className={classes.card}>
            <h5 style={{color: color}}>Správná odpověď:</h5>
            <div className={classes.option} style={{color: color}}>{correctAnswer}</div>
            <p>{explanation}</p>
          </div>
            {(currQuestion.rank != questions.length - 1) &&
              <Button style={{backgroundColor: color, color: 'white'}} onClick={nextQuestion}>
                <h5>
                  Další Otázka
                </h5>
              </Button>
            }
            {(currQuestion.rank == questions.length - 1) &&
              <Button style={{backgroundColor: color, color: 'white'}} onClick={finishQuiz}>
                <h5>
                  Finish Quiz
                </h5>
              </Button>
            }
        </Fragment>
      </div>
      <div className={classes.panel}>
        <Stations playersNum={playersNum} isAnswersCorrect={isAnswersCorrect} correctShown={correctShown}/>
      </div>
    </Fragment>
  )
}
