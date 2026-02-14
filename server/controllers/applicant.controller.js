import Applicant from '../models/Applicant.model.js';
import mongoose from 'mongoose';
import { extractTextFromFile, extractTextFromURL } from '../utils/extractText.js';
import { aiScore } from '../utils/aiScore.js';
import JD from '../models/JD.model.js';




export const createApplicant = async (req, res) => {
    try {
        // Handle CV path
        let cvPathOrURL;
        if (req.file) cvPathOrURL = req.file.path;
        else if (req.body.cv) cvPathOrURL = req.body.cv;
        else return res.status(400).json({ message: "CV is required" });

        // Validate Job
        const job = await JD.findById(req.body.job);
        if (!job) return res.status(400).json({ message: "Job does not exist" });

        // Extract CV text
        let cvText;
        if (cvPathOrURL.startsWith('http')) cvText = await extractTextFromURL(cvPathOrURL);
        else cvText = await extractTextFromFile(cvPathOrURL);

        // AI scoring
        const score = await aiScore(cvText, job.description);

        // Save applicant
        const applicantData = {
            ...req.body,
            cv: cvPathOrURL,
            score
        };

        const applicant = new Applicant(applicantData);
        const savedApplicant = await applicant.save();

        res.status(201).json(savedApplicant);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


export const getApplicantsNoScore = async (req, res) => {
    try {
        const applicants = await Applicant.find({
                                                $or: [
                                                    { score: { $exists: false } },
                                                    { score: { $not: { $type: "number" } } }
                                                ]
                                                });

        const applicantsWithId = applicants.map(applicant => ({
            ...applicant.toObject(),
            id: applicant._id
        }));
        res.json(applicantsWithId);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}


//  export const getTopApplicantsByJob = async (req, res) => {
//     const { jobId } = req.params;
//     const min = parseInt(req.query.min) || 20;
//     const max = parseInt(req.query.max) || 50;

//     try {
//         const applicants = await Applicant.find({ jobId })
//             .sort({ score: -1 })
//             .skip(min - 1)
//             .limit(max - min + 1);

//         res.json(applicants);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Server error' });
//     }
// }
export const getTopApplicantsByJob = async (req, res) => {
    try {
        const { jobId } = req.params;

        // Validate Job ID
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({ message: "Invalid Job ID" });
        }

        const applicants = await Applicant.find({ job: jobId })
            .sort({ score: -1 })   // highest score first
            .limit(20)             // top 20
            .populate('job');      // include job details

        res.status(200).json(applicants);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
