import React from "react"
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import AvailableElections from'./pages/availableElections/availableElections.component'
import CreateElection from './pages/createElection/createElection.component';
import Results from './pages/results/results.component';
import CastVote from './pages/vote/castVote.component';
import { Header } from './components/navigation/header.component'

function App() {

  return (
      <Router>
        <div className="App">
          
          <Header />

          <Routes>
            <Route path="/" element={<Navigate to="/available-elections" />} />
            <Route path="/available-elections" element={<AvailableElections />} />
            <Route path="/create-election" element={<CreateElection />} />
            <Route path="/results" element={<Results />} />
            <Route path="/cast-vote" element={<CastVote />} />
            
          </Routes>

        </div>
      </Router>
  );
}


export default App;
