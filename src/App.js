import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import MapPage from "./pages/MapPage";
import TestPage from "./pages/TestPage"
import PlacePage from "./pages/PlacePage";
import Quiz from "./pages/Quiz";


//apollo client
const client = new ApolloClient({
  // uri: "http://localhost:1337/graphql",
  uri: "https://vurv-app.onrender.com/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <div className="App">
          <Routes>
            {/* <Route exact path="/" element={<TestPage />} /> */}
            <Route exact path="/" element={<MapPage />} />
            <Route exact path="/place/:id" element={<PlacePage />} />
            <Route exact path="/place/:id/:players" element={<Quiz />} />
            <Route exact path="/quiz/:" element={<Quiz playerNum={5}/>} />
          </Routes>
        </div>
      </ApolloProvider>
    </Router>
  );
}

export default App;
