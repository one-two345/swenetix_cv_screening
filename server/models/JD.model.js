import mongoose from 'mongoose';    

const JDSchema = new mongoose.Schema({
    cv: {
        type: File,
        required: true,
        
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    timestamp: true
});

export default mongoose.model('JD', JDSchema);

export const createApplicant = async (applicantData) => {
    const Applicant = mongoose.model('Applicant');
    const applicant = new Applicant(applicantData);
    return await applicant.save();
};