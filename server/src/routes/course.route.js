import express from 'express';
import CourseController from '../controllers/course.controller.js';
import { AuthMiddleware, passportMiddleware, CacheMiddleware } from '../middlewares/index.js';

const router = express.Router();

router.get('/all-courses',CacheMiddleware.getCache, CourseController.index);
router.get('/detail-courses/not-login/:slug',CacheMiddleware.getCache, CourseController.get);
router.get('/detail-courses/:slug',passportMiddleware,CacheMiddleware.getCache, CourseController.get);
router.post('/create-courses', AuthMiddleware.authAdmin, CourseController.add);
router.put('/update-courses/:id', AuthMiddleware.authAdmin, CourseController.update);
router.delete('/delete-courses/:id', AuthMiddleware.authAdmin, CourseController.delete);

export default router;
