import React from 'react'
import PlayerStation from './PlayerStation'
import classes from './Stations.module.css'

export default function Stations(props) {

  const playersNum = props.playersNum;
  const isAnswersCorrect = props.isAnswersCorrect || [];

  const colors = [
    '#AA6671',
    '#24B15D',
    '#998A5F',
    '#E38800',
    '#B8B792',
  ]

  let playerStations = [];
  for (let i = 0; i < playersNum; i++) {
    playerStations.push(
      <PlayerStation key={i} playerId={i+1} color={colors[i]} setPlayerOption={props.setPlayerOption} playerReady={props.playersReady} isAnswerCorrect={isAnswersCorrect[i]} correctShown={props.correctShown}/>
    );
  }

  return (
    <div className={classes.container}>
      {playerStations}
    </div>
  )
}
