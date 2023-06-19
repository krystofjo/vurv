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

const QUESTIONS = gql`
  query GetQuestions($id: ID!) {
    place(id: $id) {
      data {
        id
        attributes {
          illus_quiz {
            data {
              id
              attributes {
                url
              }
            }
          }
          abc_questions {
            data {
              id
              attributes {
                question,
                option_A,
                option_B,
                option_C,
                answer,
                type,
                explanation
              }
            }
          }
          pic_questions {
            data {
              id
              attributes {
                question,
                option_A,
                option_B,
                option_C,
                answer,
                type,
                explanation,
                picture {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
          num_questions {
            data {
              id
              attributes {
                question,
                answer,
                type,
                explanation
              }
            }
          }
        }
      }
    }
    quiz {
      data {
        id
        attributes {
          getReady {
            data {
              id
              attributes {
                url
              }
            }
          }
          characters {
            data {
              attributes {
                url
              }
            }
          }
          characters_anim {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

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

  const { loading, error, data } = useQuery(QUESTIONS, {
    variables: { id: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  let abc_questions = data.place.data.attributes.abc_questions.data;
  let num_questions = data.place.data.attributes.num_questions.data;
  let pic_questions = data.place.data.attributes.pic_questions.data;


  // const root_url = 'http://localhost:1337'
  const ilus_quiz_url = data.place.data.attributes.illus_quiz.data.attributes.url;

 // // let pic_url = data.place.data.attributes.pic_questions.data[0].attributes.picture.data.attributes.url;
 // // const ready_url = data.quiz.data.attributes.getReady.data.attributes.url
 // // const char_url = data.quiz.data.attributes.characters.data[0].attributes.url

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
          <img className={classes.cornerIllus} src={ilus_quiz_url}></img>
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
