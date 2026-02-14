import express from 'express';
import { createJD, getAllJDs } from '../controllers/jd.controller.js';

const router = express.Router();


// POST /jd - Create a new JD
router.post('/', createJD);

router.get('/', getAllJDs);

export default router;