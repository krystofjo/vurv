import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import MapPage from "./pages/MapPage";
import PlacePage from "./pages/PlacePage";
import Quiz from "./pages/Quiz";
import { AppContext } from './helpers/Context'
import LoadingPage from "./pages/LoadingPage";

const DATA = gql`
query GetData {
  places {
    data {
      id
      attributes{
        title
        perex
        about
        fact_1Q
        fact_1A
        fact_2Q
        fact_2A
        fact_3Q
        fact_3A
        hex_color
        quiz_intro
        map_position_top
        map_position_left
        show
        abc_questions{
          data {
            id
            attributes{
						  question
              option_A
              option_B
              option_C
              answer
              type
              explanation
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
               explanation,
               tolerance
              }
            }
          }
        pic_questions {
            data {
              id
              attributes {
                question
                option_A
                option_B
                option_C
                answer
                type
                explanation
                picture_question {
                  data {
                    id
                    attributes {
                      url
                    }
                  }
                }
              }
            }
        }
        illus_main {
            data {
              id
              attributes {
                url
              }
            }
          }
          illus_left {
            data {
              id
              attributes {
                url
              }
            }
          }
          illus_right {
            data {
              id
              attributes {
                url
              }
            }
          }
          illus_quiz {
            data {
              id
              attributes {
                url
              }
            }
          }
      }
    }
  }
  general {
      data {
        id
        attributes {
          url
          map {
            data {
              id
              attributes {
                formats
                url
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
          get_ready {
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

function App() {

  const [appState, setAppState] = useState('map')
  const [placeId, setPlaceId] = useState('2')
  const [playersNum, setPlayersNum] = useState('1')

  const { loading, error, data } = useQuery(DATA)

  if (loading) return <LoadingPage/>;
  if (error) return <p>Error</p>;

  return (
    // <Router>
    <AppContext.Provider value={{appState, setAppState, placeId, setPlaceId, playersNum, setPlayersNum}}>
      {appState === 'map' && <MapPage data={data}/>}
      {appState === 'place' && <PlacePage data={data} id={placeId}/>}
      {appState === 'quiz' && <Quiz data={data} players={playersNum}/>}
    </AppContext.Provider>
    // </Router>
    // <Router>
    //     <div className="App">
    //       <Routes>
    //         <Route exact path="" element={<MapPage data={data}/>} />
    //         <Route exact path="/place/:id" element={<PlacePage data={data}/>} />
    //         <Route exact path="/place/:id/:players" element={<Quiz data={data}/>} />
    //         <Route exact path="/quiz/:" element={<Quiz playerNum={5} data={data}/>} />
    //       </Routes>
    //     </div>
    // </Router>
  );
}

export default App;
