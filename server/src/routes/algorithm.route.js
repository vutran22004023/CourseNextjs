import express from 'express';
import AlgorithmController from '../controllers/algorithm.controller.js'
const router = express.Router();

router.post('/new-algorithm', AlgorithmController.generateAlgorithms);

export default router;