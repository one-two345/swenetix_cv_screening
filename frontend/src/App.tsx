import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobListView from "./jobListView";
import CVUploadPage from "./cvUpload";
import LeaderboardPage from "./LeaderBoradPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobListView />} />
        <Route path="/jobs/:id" element={<CVUploadPage />} />
      <Route path="/leaderboard" element={<LeaderboardPage/>}/>
      
      </Routes>
    </Router>
  );
}

export default App;

