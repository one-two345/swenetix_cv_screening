import mongoose from 'mongoose';

const JDSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Job title is required"],
        trim: true,
        minlength: [3, "Title must be at least 3 characters"],
        maxlength: [100, "Title cannot exceed 100 characters"]
    },

    description: {
        type: String,
        required: [true, "Job description is required"],
        trim: true,
        minlength: [20, "Description must be at least 20 characters"],
        maxlength: [5000, "Description cannot exceed 5000 characters"]
    },

    location: {
        type: String,
        required: [true, "Location is required"],
        trim: true,
        minlength: [2, "Location must be at least 2 characters"],
        maxlength: [100, "Location cannot exceed 100 characters"]
    },

    employmentType: {
        type: String,
        required: [true, "Employment type is required"],
        enum: {
            values: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'],
            message: "Employment type must be one of: Full-time, Part-time, Contract, Internship, Remote"
        }
    },

    timestamp: {
        type: Date,
        default: Date.now,
        immutable: true
    }
});


// 🔥 Optional: prevent duplicate job posts with same title + location
JDSchema.index({ title: 1, location: 1 }, { unique: true });

// 🔥 Index for search performance
JDSchema.index({ title: 'text', description: 'text' });

export default mongoose.model('JD', JDSchema);
