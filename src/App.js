import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MapPage from "./pages/MapPage";
import TestPage from "./pages/TestPage"
import PlacePage from "./pages/PlacePage";
import Quiz from "./pages/Quiz";


//apollo client


function App() {
  return (
    <Router>
        <div className="App">
          <Routes>
            {/* <Route exact path="/" element={<TestPage />} /> */}
            <Route exact path="/" element={<MapPage />} />
            <Route exact path="/place/:id" element={<PlacePage />} />
            <Route exact path="/place/:id/:players" element={<Quiz />} />
            <Route exact path="/quiz/:" element={<Quiz playerNum={5}/>} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;
