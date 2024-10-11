import express from 'express';
import getAnalyticCourse from '../controllers/analytic.controller.js';
import { AuthMiddleware, passportMiddleware } from '../middlewares/index.js';
const router = express.Router();

router.get('/', AuthMiddleware.authAdmin, getAnalyticCourse.getAnalyticCourse);

export default router;