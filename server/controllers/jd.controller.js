import JD from '../models/JD.model.js';
export const createJD = async (req, res) => {
    try {
        const jdData = req.body;
        const newJD = new JD(jdData);
        const savedJD = await newJD.save();
        res.status(201).json(savedJD);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const getAllJDs = async (req, res) => {
    try {
        const jds = await JD.find();
        res.status(200).json(jds);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}