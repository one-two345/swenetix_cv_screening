import mongoose from 'mongoose';

const ResultSchema = new mongoose.Schema({
  application: { type: mongoose.Schema.Types.ObjectId, ref: 'Application', required: true },
  aiSummary: { type: String }, 
  skills: { type: [String], default: [] }, 
  experienceYears: { type: Number }, 
  educationLevel: { type: String },
  score: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model('Result', ResultSchema);
