import mongoose from 'mongoose';

const ApplicantSchema = new mongoose.Schema({
    cv: {
        type: String,
        required: [true, "CV file is required"],
        trim: true
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"]
    },

    age: {
        type: Number,
        required: [true, "Age is required"],
        min: [18, "Minimum age is 18"],
        max: [65, "Maximum age is 65"]
    },

    score: {
        type: Number,
        min: [0, "Score cannot be negative"],
        max: [100, "Score cannot exceed 100"]
    },

    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JD',
        required: [true, "Job reference is required"]
    },

    timestamp: {
        type: Date,
        default: Date.now
    }
});


ApplicantSchema.index({ email: 1, job: 1 }, { unique: true });

ApplicantSchema.index({ job: 1, score: -1 });

export default mongoose.model('Applicant', ApplicantSchema);
