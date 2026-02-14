import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Job {
  id: string;
  title: string;
  description: string;
}

const demoJobsInitial: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    description: "Build user interfaces using React and TailwindCSS.",
  },
  {
    id: "2",
    title: "Backend Developer",
    description: "Develop APIs using Node.js and Express.",
  },
  {
    id: "3",
    title: "AI Engineer",
    description: "Work on AI-powered CV scoring and NLP models.",
  },
];

const JobListView: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>(demoJobsInitial);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob: Job = {
      id: (jobs.length + 1).toString(),
      title,
      description,
    };
    setJobs([newJob, ...jobs]);
    setTitle("");
    setDescription("");
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

        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              onClick={() => navigate(`/jobs/${job.id}`)}
              className="cursor-pointer border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition bg-white"
            >
              <h2 className="text-xl font-semibold text-black">{job.title}</h2>
              <p className="text-gray-600 mt-2">{job.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal / Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-lg relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Job</h2>
            <form className="space-y-4" onSubmit={handleAddJob}>
              <div>
                <label className="block text-gray-700 mb-1" htmlFor="title">
                  Job Name
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1" htmlFor="description">
                  Job Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                  rows={4}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition"
              >
                Save Job
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobListView;
