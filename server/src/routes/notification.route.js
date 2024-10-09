import express from 'express';
import NotificationController from '../controllers/notification.controller.js';
import { AuthMiddleware } from '../middlewares/index.js';

const router = express.Router();

router.post('/', AuthMiddleware.authAdmin, NotificationController.send);
router.delete('/', AuthMiddleware.authAdmin, NotificationController.deleteAll);
router.delete('/:id', AuthMiddleware.authAdmin, NotificationController.delete);
router.get('/dashboard', NotificationController.index);
router.get('/modal', NotificationController.get);

export default router;
