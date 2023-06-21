import React, { useState, useEffect, useContext, Fragment } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import GetReady from '../components/Quiz/GetReady'
import QuestionState from '../components/Quiz/QuestionState'
import QuestionState2 from '../components/Quiz/QuestionState2'
import AnswerRecap from '../components/Quiz/AnswerRecap';
import AnswerRecap2 from '../components/Quiz/AnswerRecap2';
import EndScreen from '../components/Quiz/EndScreen'
import QuitQuizButton from '../components/QuitQuizButton'
import BackToMapButton from '../components/QuitQuizButton'
import { QuizContext } from '../helpers/Context'
import Button from '../components/UI/Button';
import { Questions } from '../helpers/QuestionBank';
import classes from '../components/Quiz/Quiz.module.css'
import { useQuery, gql } from "@apollo/client";
import Stations from '../components/Quiz/Stations';
import QuitButton from '../components/UI/QuitButton';

export default function Quiz(props) {
  const { id, players } = useParams();
  const navigate = useNavigate();

  const primary_colors = [
    "#AA6671",
    "#B8B792",
    "#24B15D",
    "#8CA931",
    "#67C1CE",
    "#998A5F",
    "#E38800",
  ]
  const secondary_colors = [
    "#AA6671",
    "#B8B792",
    "#24B15D",
    "#8CA931",
    "#67C1CE",
    "#998A5F",
    "#E38800",
  ]

  const color = primary_colors[id-1];
  const lighten = color.concat('33')

  const [gameState, setGameState] = useState("getReady")
  const [score, setScore] = useState(0)
  const [playersNum, setPlayersNum] = useState(players)
  const [currQuestion, setCurrQuestion] = useState('');
  const [answers, setAnswers] = useState('')
  const [answerCorrectness, setAnswerCorrectness] = useState('')

  const data = props.data;
  const place = data.places.data.find(place => place.id===id);
  const ats = place.attributes;

  let abc_questions = ats.abc_questions.data;
  let num_questions = ats.num_questions.data;
  let pic_questions = ats.pic_questions.data;

  const illus_quiz_url = ats.illus_quiz.data.attributes.url;

  const questions = []

  for (let i = 0; i < abc_questions.length; i++) {
    questions.push(abc_questions[i].attributes)
  }
  for (let i = 0; i < num_questions.length; i++) {
    questions.push(num_questions[i].attributes)
  }
  for (let i = 0; i < num_questions.length; i++) {
    questions.push(pic_questions[i].attributes)
  }

  const backToPlaceHandler = () => {
    navigate(`/place/${id}`)
  }

  return (
    <QuizContext.Provider value={{color, data, questions, gameState, setGameState, answers, setAnswers, answerCorrectness, setAnswerCorrectness, score, setScore, playersNum, currQuestion, setCurrQuestion}}>
      <div className={classes.layout} style={{backgroundColor: color.concat('33')}}>
        <div className={classes.left}>
          <img className={classes.cornerIllus} src={illus_quiz_url}></img>
        </div>
        <div className={classes.right}>
          <div className={classes.btn}>
            <QuitButton color={color} onClick={backToPlaceHandler}/>
          </div>
        </div>
        {gameState === "getReady" && <GetReady/>}
        {/* {gameState === "questionState" && <QuestionState/>} */}
        {gameState === "questionState" && <QuestionState2/>}
        {/* {gameState === "answerRecap" && <AnswerRecap/>} */}
        {gameState === "answerRecap" && <AnswerRecap2/>}
        {gameState === "endScreen" && <EndScreen/>}
      </div>
    </QuizContext.Provider>
  )
}
