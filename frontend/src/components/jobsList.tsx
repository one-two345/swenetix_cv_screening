import React from "react";
import { useNavigate } from "react-router-dom";

export interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  employmentType: "Full-time" | "Part-time" | "Contract" | "Internship";
}

interface JobListProps {
  jobs: Job[];
}

const JobList: React.FC<JobListProps> = ({ jobs }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <div
          key={job.id}
          onClick={() => navigate(`/jobs/${job.id}`)}
          className="cursor-pointer border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition bg-white"
        >
          <h2 className="text-xl font-semibold text-black">{job.title}</h2>
          <p className="text-gray-600 mt-1">{job.description}</p>
          <p className="text-gray-500 text-sm mt-1">
            {job.location} • {job.employmentType}
          </p>
        </div>
      ))}
    </div>
  );
};

export default JobList;

