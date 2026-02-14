import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import JobListView from "./jobListView";
import CVUploadPage from "./pages/cvUpload";
import LeaderboardPage from "./components/LeaderBoradPage";
import JobPage from "./pages/jobListPage";
import JobListApplicantPage from "./components/jobListApplicant";
// import JobPage from "./pages/JobListPage";


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobListApplicantPage/>} />
        <Route path="/job" element={<JobPage/>}/>
        <Route path="/apply/:id" element={<CVUploadPage />} />
      <Route path="/leaderboard" element={<LeaderboardPage/>}/>
      
      </Routes>
    </Router>
  );
}

export default App;

