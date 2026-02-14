import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import JobListView from "./jobListView";
import CVUploadPage from "./pages/cvUpload";
import LeaderboardPage from "./components/LeaderBoradPage";
import JobPage from "./pages/JobListPage";


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobPage/>} />
        <Route path="/jobs/:id" element={<CVUploadPage />} />
      <Route path="/leaderboard" element={<LeaderboardPage/>}/>
      
      </Routes>
    </Router>
  );
}

export default App;

