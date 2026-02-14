import express from "express";
import fileUpload from "express-fileupload";
import * as pdfParse from "pdf-parse";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Applicant from "./model/Applicant.model.js";
import Application from "./model/Application.model.js";
import Job from "./model/Job.model.js";
import Result from "./model/Result.model.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(fileUpload());

mongoose.connect(process.env.MONGO_URI, {
  dbName: process.env.MONGO_DB || "hr_system",
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function callGeminiFlash(prompt) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });

  const result = await model.generateContent(prompt);
  const response = await result.response;

  return response.text();
}


app.post("/jobs", async (req, res) => {
  try {
    const { title, description, location, employmentType } = req.body;
    if (!title || !description)
      return res.status(400).json({ error: "Missing title or description" });

    const job = await Job.create({ title, description, location, employmentType });
    res.json({ status: "success", jobId: job._id, job });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post("/apply/:jobId", async (req, res) => {
  try {
    const { jobId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(jobId))
      return res.status(400).json({ error: "Invalid jobId" });

    if (!req.files?.file)
      return res.status(400).json({ error: "No file uploaded" });

    const job = await Job.findById(jobId);
    if (!job)
      return res.status(404).json({ error: "Job not found" });

    const file = req.files.file;
    const pdfData = await pdfParse(file.data);
    const text = pdfData.text || "";

    const prompt = `
You are a resume analysis agent.

If text is not a resume/CV, return:
{"message": "Not a resume/ Invalid Input"}

If it is a resume, extract JSON:

{
  "full_name": "",
  "email": "",
  "phone": "",
  "skills": [],
  "experience_years": 0.0,
  "last_job_title": "",
  "ATS_score": "",
  "filename": "${file.name}"
}

Text:
"""${text}"""

Respond ONLY in JSON.
    `;

    const aiOutput = await callGeminiFlash(prompt);

    let parsed;
    try {
      const cleaned = aiOutput
        .replace(/```json\s*/g, "")
        .replace(/```/g, "");
      parsed = JSON.parse(cleaned.trim());
    } catch {
      return res.status(500).json({ error: "AI parse error", raw: aiOutput });
    }

    if (parsed.message)
      return res.status(400).json(parsed);


    let applicant = await Applicant.findOne({ email: parsed.email });
    if (!applicant) {
      applicant = await Applicant.create({
        fullName: parsed.full_name,
        email: parsed.email,
      });
    }

 
    const application = await Application.create({
      applicant: applicant._id,
      job: job._id,
      cvData: file.data,
      cvContentType: file.mimetype,
    });

  
    const skillsCount = parsed.skills.length;
    const experienceScore = Math.min(parsed.experience_years / 10, 1);
    const score = Math.round((skillsCount * 0.6 + experienceScore * 0.4) * 100);

    await Result.create({
      application: application._id,
      aiSummary: text,
      skills: parsed.skills,
      experienceYears: parsed.experience_years,
      score,
    });

    res.json({
      status: "success",
      applicationId: application._id,
      score,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get("/dashboard/leaderboard/:jobId", async (req, res) => {
  try {
    const { jobId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(jobId))
      return res.status(400).json({ error: "Invalid jobId" });

    const results = await Result.find()
      .populate({
        path: "application",
        match: { job: jobId },
        populate: { path: "applicant", select: "fullName email" },
      })
      .sort({ score: -1 });

    const leaderboard = results
      .filter(r => r.application)
      .map(r => ({
        applicant: r.application.applicant,
        score: r.score,
        applicationId: r.application._id,
        appliedAt: r.application.createdAt,
      }));

    res.json(leaderboard);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get("/dashboard/filter/:jobId", async (req, res) => {
  try {
    const { jobId } = req.params;
    const { minScore, skill } = req.query;

    const query = {};
    if (minScore) query.score = { $gte: parseInt(minScore) };
    if (skill) query.skills = skill;

    const results = await Result.find(query)
      .populate({
        path: "application",
        match: { job: jobId },
        populate: { path: "applicant", select: "fullName email" },
      });

    const filtered = results
      .filter(r => r.application)
      .map(r => ({
        applicant: r.application.applicant,
        score: r.score,
        skills: r.skills,
        appliedAt: r.application.createdAt,
      }));

    res.json(filtered);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
