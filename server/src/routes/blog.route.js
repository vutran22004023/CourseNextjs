import express from 'express';
import BlogController from '../controllers/blog.controller.js';
import { passportMiddleware } from '../middlewares/index.js';

const router = express.Router();

router.get('/all-posts', BlogController.index);
router.get('/detail-post/:slug', BlogController.get);
router.post('/create-post', passportMiddleware, BlogController.add);
router.put('/update-post/:id', passportMiddleware, BlogController.update);
router.delete('/delete-post/:id', passportMiddleware, BlogController.delete);

export default router;
