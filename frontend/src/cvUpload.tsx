import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


const CVUploadPage: React.FC = () => {
  const { id: jobId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    setMessage("");

    try {
      // Create form data
      const formData = new FormData();
      formData.append("cv", file);
      formData.append("jobId", jobId!);

      // Example: send to backend API
      const response = await fetch("/api/upload-cv", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setMessage("CV uploaded successfully!");
        setFile(null);
      } else {
        setMessage("Upload failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      setMessage("An error occurred.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-gray-500 hover:text-gray-700"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Upload CV for Job {jobId}
        </h1>

        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isUploading}
            className={`w-full py-2 rounded-lg text-white font-semibold transition ${
              isUploading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isUploading ? "Uploading..." : "Upload CV"}
          </button>
        </form>

        {message && <p className="mt-4 text-gray-700">{message}</p>}
      </div>
    </div>
  );
};

export default CVUploadPage;
