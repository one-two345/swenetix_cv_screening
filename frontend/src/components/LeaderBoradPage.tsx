import React from "react";
import { useGetApplicantsQuery } from "../api/applicantApi";
// import { useGetApplicantsQuery } from "../services/applicantApi";

const LeaderboardPage: React.FC = () => {
  // Fetch applicants using RTK Query
  const { data: applicants, isLoading, isError } = useGetApplicantsQuery();

  if (isLoading) return <p className="p-8">Loading applicants...</p>;
  if (isError) return <p className="p-8 text-red-500">Error fetching applicants.</p>;

  // Sort applicants by score descending
  const sortedApplicants = [...(applicants || [])].sort((a, b) => b.score - a.score);

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
                <th className="px-6 py-3 text-gray-700">email</th>
                <th className="px-6 py-3 text-gray-700">Score</th>
                <th className="px-6 py-3 text-gray-700">Applied On</th>
              </tr>
            </thead>
            <tbody>
              {sortedApplicants.map((applicant, index) => (
                <tr
                  key={applicant.id}
                  className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-blue-50 cursor-pointer`}
                >
                  <td className="px-6 py-3 font-semibold">{index + 1}</td>
                  <td className="px-6 py-3">{applicant.fullName}</td>
                  <td className="px-6 py-3">{applicant.email}</td>
                  <td className="px-6 py-3 font-medium text-blue-500">{applicant.score}</td>
                  <td className="px-6 py-3">{new Date(applicant.timestamp).toLocaleDateString()}</td>
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
