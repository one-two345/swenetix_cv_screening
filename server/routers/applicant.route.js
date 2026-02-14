import express from 'express';
import { createApplicant, getApplicants } from '../controllers/applicant.controller.js';

const router = express.Router();

// POST /applicants - Create a new applicant
router.post('/', createApplicant);
router.get('/', getApplicants);

export default router;