import express from 'express';
import { createApplicant, getApplicantsNoScore } from '../controllers/applicant.controller.js';
import { getTopApplicantsByJob } from '../controllers/applicantController.js';


const router = express.Router();

// POST /applicants - Create a new applicant
router.post('/', createApplicant);
router.get('/', getApplicantsNoScore);
router.get('/top/:jobId', getTopApplicantsByJob);



export default router;