import React, {Fragment, useContext} from 'react'
import { AppContext, QuizContext } from '../../helpers/Context'
import Button from '../UI/Button'
import { useNavigate } from "react-router-dom";
import classes from '../../pages/Quiz.module.css';
import { root_url } from '../../helpers/root';

export default function EndScreen() {

  // const navigate = useNavigate();

  const {setAppState} = useContext(AppContext)
  const {color, data, score, setScore, setGameState} = useContext(QuizContext)

  const restartQuiz = () => {
    setScore(0);
    setGameState("getReady")
  }

  const quitQuiz = () => {
    // navigate("/")
    setAppState('place')

  }

  const data_anims = data.quiz.data.attributes.characters_anim.data
  let anims = []

  for (let i = 0; i < data_anims.length; i++) {
    const char_anim_url = data_anims[i].attributes.url
    const anim_url = root_url.concat(char_anim_url);
    anims.push(<img key={i} src={anim_url} width='20%'></img>)
  }

  return (
    <Fragment>
      <div className={classes.header} style={{color: color}}>
        <div className={classes.title}>
          <h1>Gratulace!</h1>
        </div>
      </div>
      <div className={classes.main}>
        {/* <h3>Hráč 1: {score.player_1}</h3>
        <h3>Hráč 2: {score.player_2}</h3>
        <h3>Hráč 3: {score.player_3}</h3>
        <h3>Hráč 4: {score.player_4}</h3>
        <h3>Hráč 5: {score.player_5}</h3> */}
        <div className={classes.final}>
        {anims}
        </div>
        <h3>Gratulace! Naučili jste se něco nového.</h3>
        <Button style={{backgroundColor: color, color: 'white'}} onClick={quitQuiz}>
          <h5>
            Ukončit Quiz
          </h5>
        </Button>
      </div>
    </Fragment>
  )
}
