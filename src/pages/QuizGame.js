import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import QuitQuizButton from "../components/QuitQuizButton";

export default function QuizGame() {
  const { players } = useParams();

  let displayPlayers = [];

  const root_url = "http://localhost:1337";


  // hook that keep track how many players have clicked ready
  const [playerReady, setplayerReady] = useState([]);

  // Array to set color
  const [color, setColor] = useState(["", "", "", "", ""]);

  // Define color that will be displayed on click
  const readyColor = "rgb(215, 255, 130)";

  // Add buttons based on number of players, on click add their number to array that is used to check if everyone are ready
  for (let i = 0; i < players; i++) {
    displayPlayers.push(
      <button
        key={i}
        onClick={() => {
          setplayerReady([...playerReady, i + 1]);
          setColor(
            color.map((color, index) => (index === i ? readyColor : color))
          );
        }}
        style={{ backgroundColor: color[i] }}
      >
        Player {i + 1}
      </button>
    );
  }

  const navigate = useNavigate();

  // Affter everyone click ready redirect to quiz
  useEffect(() => {
    displayPlayers = [...new Set(playerReady)];

    if (displayPlayers.length == players) {
      navigate("/");
    }
  }, [playerReady]);

  return (
    <div>
      <QuitQuizButton/>
      <div>QuizGame {players} Players</div>
      {/* <img src={`${root_url}${img_url}`}></img> */}
      <div>Postavte se na místa a potvrďte, že jste připraveni</div>
      <div>{displayPlayers}</div>
    </div>
  );
}
