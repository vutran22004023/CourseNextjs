import express from 'express';
import UserCourseController from '../controllers/user_course.controller.js';
import { AuthMiddleware } from '../middlewares/index.js';

const router = express.Router();

router.post('/start-course', AuthMiddleware.authUser, UserCourseController.startUserCourse);
router.post('/update-progress', AuthMiddleware.authUser, UserCourseController.updateProgress);
router.get('/course-progress', AuthMiddleware.authUser, UserCourseController.getCourseProgress);
router.put('/update-note', AuthMiddleware.authUser, UserCourseController.updateNote);
router.post('/create-note', AuthMiddleware.authUser, UserCourseController.createNote);
router.post('/all-note', AuthMiddleware.authUser, UserCourseController.getAllNotes);

export default router;
