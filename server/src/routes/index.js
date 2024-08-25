import express from 'express';
import Login_RegisterRouter from './login_register.route.js';
import UserRouter from './user.route.js';
import CourseRouter from './course.route.js';
import PayMentRouter from './payment.router.js';
import UserCourseRouter from './user_course.route.js';
import BlogRouter from './blog.route.js';
import MessageRouter from './message.route.js'
import AlgorithmRouter from './algorithm.route.js'
const router = express.Router();

router.use('/', Login_RegisterRouter);
router.use('/user', UserRouter);
router.use('/course', CourseRouter);
router.use('/pay', PayMentRouter);
router.use('/user-course', UserCourseRouter);
router.use('/blog', BlogRouter);
router.use('/message', MessageRouter);
router.use('/algorithm', AlgorithmRouter);
export default router;
