import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "../UI/Button";
import Line from "../UI/Line";
import classes from "./PlaceQuiz.module.css";
import { concat } from "@apollo/client";

export default function PlaceQuiz(props) {
  const navigate = useNavigate();
  const color = props.color;
  const lighetened = color.concat("33");

  const [players, setPlayers] = useState("1");
  const [playersSelected, setPlayersSelected] = useState(true);

  console.log(playersSelected);

  let chooseNumOfPlayers = [];

  const playerNumberHandler = (num) => {
    setPlayers(num.toString());
    // setPlayersSelected(true);
  };

  const selectedStyle = {
    color: "white",
    backgroundColor: color,
  };

  const notSelectedStyle = {
    color: color,
    backgroundColor: lighetened,
  };

  const actionStyle = {
    color: "white",
    backgroundColor: color,
    padding: '20px',
  };

  for (let i = 0; i < 5; i++) {
    chooseNumOfPlayers.push(
      <Fragment key={i}>
        <Button
          key={i}
          name={`playersNumber`}
          onClick={() => playerNumberHandler(i + 1)}
          value={i + 1}
          style={players == i + 1 ? selectedStyle : notSelectedStyle}
        >
          <h3 className={classes.player}>{i + 1}</h3>
        </Button>
      </Fragment>
    );
  }

  const clickHandler = () => {
    navigate(players);
  };

  return (
    <div className={classes.container}>
      <Line />
      <div className={classes.selectionContainer}>
        <h4 style={{ color: color }}>Vyberte počet hráčů</h4>
        <div className={classes.players}>{chooseNumOfPlayers}</div>
        <div className={classes.buttonContainer}>
          <Button style={actionStyle} onClick={clickHandler}>
            <h5>Začít hrát</h5>
          </Button>
        </div>
      </div>
    </div>
  );
}
