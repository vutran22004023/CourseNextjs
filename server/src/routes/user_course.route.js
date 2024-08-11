import express from 'express';
import UserCourseController from '../controllers/user_course.controller.js';
<<<<<<< HEAD
import { passportMiddleware } from '../middlewares/index.js';

const router = express.Router();

router.post('/start-course', passportMiddleware, UserCourseController.startUserCourse);
router.post('/update-progress', passportMiddleware, UserCourseController.updateProgress);
router.get('/course-progress', passportMiddleware, UserCourseController.getCourseProgress);
=======

const router = express.Router();

router.post('/start-course', UserCourseController.startUserCourse);
router.post('/update-progress', UserCourseController.updateProgress);
>>>>>>> master

export default router;
