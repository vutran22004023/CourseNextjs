import express from 'express';
import UserCourseController from '../controllers/user_course.controller.js';

const router = express.Router();

router.post('/start-course', UserCourseController.startUserCourse);
router.post('/update-progress', UserCourseController.updateProgress);

export default router;
