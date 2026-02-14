import React, { useState } from "react";
import JobForm from "../components/jobForm";
import JobListHRPage from "../components/jobsListHR";
// import JobList from "../components/jobsListHR";


const JobPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);



  return (
    <div className="min-h-screen bg-gray-100 text-black p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-400">Job Listings</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition"
          >
            Add Job
          </button>
        </div>

        {/* JobList now fetches data via RTK Query internally */}
        <JobListHRPage />
      </div>

      {isModalOpen && (
        <JobForm
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default JobPage;
