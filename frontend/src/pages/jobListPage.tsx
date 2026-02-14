import React, { useState } from "react";
import type { Job } from "../components/jobsList";
import JobForm from "../components/jobForm";
import JobList from "../components/jobsList";


const demoJobsInitial: Job[] = [
  { id: "1", title: "Frontend Developer", description: "Build user interfaces using React and TailwindCSS.", location: "Remote", employmentType: "Full-time" },
  { id: "2", title: "Backend Developer", description: "Develop APIs using Node.js and Express.", location: "Addis Ababa", employmentType: "Full-time" },
  { id: "3", title: "AI Engineer", description: "Work on AI-powered CV scoring and NLP models.", location: "Remote", employmentType: "Contract" },
];

const JobPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>(demoJobsInitial);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveJob = (newJob: Job) => {
    setJobs([newJob, ...jobs]);
    setIsModalOpen(false);
  };

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

        <JobList jobs={jobs} />
      </div>

      {isModalOpen && (
        <JobForm
          onSave={handleSaveJob}
          onClose={() => setIsModalOpen(false)}
          nextId={(jobs.length + 1).toString()}
        />
      )}
    </div>
  );
};

export default JobPage;
