import mongoose from 'mongoose';    

const ApplicantSchema = new mongoose.Schema({
    cv: {
        type: String,
        required: true,
        
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    score: {
        type: Number,
        required: false
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Applicant', ApplicantSchema);

export const createApplicant = async (applicantData) => {
    const Applicant = mongoose.model('Applicant');
    const applicant = new Applicant(applicantData);
    return await applicant.save();
};