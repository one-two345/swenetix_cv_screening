import React from "react";

interface Applicant {
  id: string;
  name: string;
  jobTitle: string;
  score: number; // e.g., CV screening score
  appliedAt: string; // date string
}

const demoApplicants: Applicant[] = [
  {
    id: "1",
    name: "Alice Johnson",
    jobTitle: "Frontend Developer",
    score: 92,
    appliedAt: "2026-02-10",
  },
  {
    id: "2",
    name: "Bob Smith",
    jobTitle: "Backend Developer",
    score: 88,
    appliedAt: "2026-02-11",
  },
  {
    id: "3",
    name: "Charlie Brown",
    jobTitle: "AI Engineer",
    score: 95,
    appliedAt: "2026-02-12",
  },
  {
    id: "4",
    name: "Dana White",
    jobTitle: "Frontend Developer",
    score: 85,
    appliedAt: "2026-02-13",
  },
];

const LeaderboardPage: React.FC = () => {
  // Sort applicants by score descending
  const sortedApplicants = [...demoApplicants].sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-400">Applicant Leaderboard</h1>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-gray-700">Rank</th>
                <th className="px-6 py-3 text-gray-700">Name</th>
                <th className="px-6 py-3 text-gray-700">Job</th>
                <th className="px-6 py-3 text-gray-700">Score</th>
                <th className="px-6 py-3 text-gray-700">Applied On</th>
              </tr>
            </thead>
            <tbody>
              {sortedApplicants.map((applicant, index) => (
                <tr
                  key={applicant.id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-blue-50 cursor-pointer`}
                >
                  <td className="px-6 py-3 font-semibold">{index + 1}</td>
                  <td className="px-6 py-3">{applicant.name}</td>
                  <td className="px-6 py-3">{applicant.jobTitle}</td>
                  <td className="px-6 py-3 font-medium text-blue-500">{applicant.score}</td>
                  <td className="px-6 py-3">{applicant.appliedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
