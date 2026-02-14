import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'Applicant', required: true },
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  cvData: { type: Buffer, required: true },
  cvContentType: { type: String, required: true },

  status: {
    type: String,
    enum: ['PROCESSING','SHORTLISTED', 'REJECTED'],
    default: 'SUBMITTED',
  },
}, { timestamps: true });

export default mongoose.model('Application', ApplicationSchema);
