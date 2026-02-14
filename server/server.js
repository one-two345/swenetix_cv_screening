import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.config.js'; 
import  applicantRoutes from './routers/applicant.route.js';
import jdRoutes from './routers/jd.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());



// Routes
app.use('/api/applicants', applicantRoutes); 
app.use('/api/jds', jdRoutes); 

// Start server
app.listen(PORT, () => {
    connectDB();
}); 
