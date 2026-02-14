import mongoose from 'mongoose';    

const ApplicantSchema = new mongoose.Schema({
    cv: {
        type: File,
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
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JD',   
        required: true
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