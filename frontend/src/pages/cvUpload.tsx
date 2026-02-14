import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface CVFormData {
  fullName: string;
  email: string;
  cvFile: File | null;
}

const CVUploadPage: React.FC = () => {
  const { id: jobId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CVFormData>({
    fullName: "",
    email: "",
    cvFile: null,
  });

  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");

  // Update any field dynamically
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === "cvFile" && files) {
      setFormData((prev) => ({ ...prev, cvFile: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.cvFile) return;

    setIsUploading(true);
    setMessage("");

    try {
      const fd = new FormData();
      fd.append("cv", formData.cvFile);
      fd.append("jobId", jobId!);
      fd.append("fullName", formData.fullName);
      fd.append("email", formData.email);

      const response = await fetch("/api/upload-cv", {
        method: "POST",
        body: fd,
      });

      if (response.ok) {
        setMessage("CV uploaded successfully!");
        setFormData({ fullName: "", email: "", cvFile: null });
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
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="John Doe"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="john@example.com"
              required
            />
          </div>

          {/* CV File */}
          <div>
            <label className="block text-gray-700 mb-1">CV (PDF, DOC, DOCX)</label>
            <input
              type="file"
              name="cvFile"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
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
