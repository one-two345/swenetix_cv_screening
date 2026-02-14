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
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/api/applicants', applicantRoutes); // Adjust the path as needed
app.use('/api/jds', jdRoutes); // Adjust the path as needed

// Start server
app.listen(PORT, () => {
    connectDB(); // Connect to MongoDB when the server starts
    // createTest({ name: 'Sample Test', score: 95 }) // Example of creating a test entry
    //     .then(test => console.log('Test created:', test))
    //     .catch(err => console.error('Error creating test:', err));
    // console.log(`Server is running on port ${PORT}`);
}); 
