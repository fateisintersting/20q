import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import Question from "./components/Question";
import Challange from "./components/Challange";
import Game from "./components/Game";
import Solve from "./pages/game/Solve";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}>
        <Route index element={<Game />} />
        <Route path="question" element={<Question />} />
        <Route path="challenge" element={<Challange />} />
        <Route path="/challenge/:id" element={<Solve />} />
        <Route path="/dasboard" element={<Dashboard/>}/>
        </Route>
        
      </Routes>
    </Router>
  );
};

export default App;
