import React from "react";

import { useGetJobsQuery } from "../api/jobApi";
import type { Job } from "../types";


const JobListHRPage: React.FC = () => {


  // Fetch jobs from backend via RTK Query
  const { data: jobs, isLoading, isError, error } = useGetJobsQuery();

  if (isLoading) {
    return <p className="text-center mt-6 text-gray-500">Loading jobs...</p>;
  }

  if (isError) {
    return (
      <p className="text-center mt-6 text-red-500">
        {error instanceof Error ? error.message : "Failed to load jobs"}
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-400">Job Listings</h1>

        <div className="space-y-4">
          {jobs?.map((job: Job) => (
            <div
              key={job.id}
           
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
      </div>
    </div>
  );
};

export default JobListHRPage;
