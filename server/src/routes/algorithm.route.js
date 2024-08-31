import express from 'express';
import AlgorithmController from '../controllers/algorithm.controller.js';
const router = express.Router();

router.get('/new-algorithm', AlgorithmController.generateAlgorithms);
router.post('/check-algorithm', AlgorithmController.checkAlgorithms);

export default router;
