import React, { useContext, useState, useEffect, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { QuizContext } from "../../helpers/Context";
import { useQuery, gql } from "@apollo/client";
import Stations from "./Stations";
import Button from "../UI/Button";
import classes from "./Quiz.module.css";

export default function GetReady() {
  const { id, players } = useParams();

  const [playersReady, setPlayersReady] = useState({counter: 0});

  useEffect(() => {
    if (playersReady.counter == players) {
      startQuiz();
    }
  }, [playersReady]);

  const { color, data, questions, setCurrQuestion, gameState, setGameState, setScore, playersNum } = useContext(QuizContext);

  const startQuiz = () => {
    setScore({
      title: "score",
      player_1: 0,
      player_2: 0,
      player_3: 0,
      player_4: 0,
      player_5: 0,
    });
    setGameState("questionState");
    setCurrQuestion({
      rank: 0,
      type: questions[0].type
    })

  };

  const onPlayerConfirm = () => {
    setPlayersReady(prevState =>({
      ...prevState,
      counter: prevState.counter + 1
    }))
  }

  return (
    <Fragment>
      <div className={classes.header} style={{color: color}}>
        <div className={classes.title}>
          <div className={classes.tag}>
            <h5>{`Počet hráčů: ${playersNum}`}</h5>
          </div>
          <h2>Připravte se na místa</h2>
        </div>
      </div>
      <div className={classes.main}>
      </div>
      <div className={classes.panel}>
        <Stations playersNum={playersNum} playersReady={onPlayerConfirm}/>
      </div>
    </Fragment>
  );
}
