import React, { useState, useEffect, useContext, Fragment } from 'react'
import Abc from './StationContent/Abc'
import Numeric from './StationContent/Numeric'
import Picture from './StationContent/Picture'
import { QuizContext } from '../../helpers/Context'
import Button from '../UI/Button'
import classes from "./PlayerStation.module.css"
import { root_url } from '../../helpers/root'
import Card from '../UI/Card'

export default function PlayerStation(props) {
  const { data, score, setScore, gameState, setGameState, playersNum, currQuestion } = useContext(QuizContext)

  const playerId = props.playerId
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const char_url = root_url.concat(data.quiz.data.attributes.characters.data[playerId-1].attributes.url);
  const char_anim_url = root_url.concat(data.quiz.data.attributes.characters_anim.data[playerId-1].attributes.url);

  const img_url = char_url;
  const anim_url = char_anim_url;

  const onConfirm = () => {
    setIsReady(true)
    props.playerReady(true)
  }

  useEffect(() => {
    setIsSubmitted(false)
  }, [currQuestion]);

  return (
    <Fragment>
    <div className={classes.station}>
      <div className={classes.character}>
        {(gameState==="answerRecap" && props.correctShown && props.isAnswerCorrect) ?
          <img src={anim_url} width='100%'></img>
          :
          <img src={img_url} width='100%'></img>
        }
      </div>
      <div className={classes.ui}>
        <div className={classes.title}>
          <h5 style={{color: props.color}}>{`Hráč ${playerId}`}</h5>
        </div>
          {(!isReady && gameState==="getReady") &&
          <div className={classes.confirmContainer}>
            <button className={`${classes.button} ${classes.confirm}`} style={{backgroundColor: props.color, color: 'white'}} type='submit' onClick={onConfirm}>
              <h6>
                Potvrdit
              </h6>
            </button>
          </div>
          }
          {(!isSubmitted && gameState==="questionState") &&
            <Fragment>
              { currQuestion.type === "ABC" && <Abc color={props.color} playerId={playerId} setIsSubmitted={setIsSubmitted} setPlayerOption={props.setPlayerOption}/> }
              { currQuestion.type === "num" && <Numeric color={props.color} playerId={playerId} setIsSubmitted={setIsSubmitted} setPlayerOption={props.setPlayerOption}/> }
              { currQuestion.type === "pic" && <Picture color={props.color} playerId={playerId} setIsSubmitted={setIsSubmitted} setPlayerOption={props.setPlayerOption}/> }
            </Fragment>
          }
        </div>
    </div>
    </Fragment>
  )
}
