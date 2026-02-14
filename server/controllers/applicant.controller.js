import Applicant from '../models/Applicant.model.js';

export const createApplicant = async (req, res) => {
    try {
        const applicant = new Applicant(req.body);
        const savedApplicant = await applicant.save();
        res.status(201).json(savedApplicant);
    } catch (error) {
        
        res.status(400).json({ message: error.message });
    }
}

export const getApplicants = async (req, res) => {
    try {
        // Fetch only applicants that do NOT have a 'score' field
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