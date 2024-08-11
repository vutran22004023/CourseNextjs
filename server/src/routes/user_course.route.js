import express from 'express';
import UserCourseController from '../controllers/user_course.controller.js';
import { passportMiddleware } from '../middlewares/index.js';

const router = express.Router();

router.post('/start-course', AuthMiddleware.authUser, UserCourseController.startUserCourse);
router.post('/update-progress', AuthMiddleware.authUser, UserCourseController.updateProgress);
router.get('/course-progress', AuthMiddleware.authUser, UserCourseController.getCourseProgress);

export default router;
