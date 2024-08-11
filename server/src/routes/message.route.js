import express from 'express';
import MessageController from '../controllers/message.controller.js';
import { AuthMiddleware } from '../middlewares/index.js';

const router = express.Router();

router.post('/postMessage', AuthMiddleware.authUser, MessageController.postMessage);
router.get('/getMessages', AuthMiddleware.authUser, MessageController.getMessages);
router.put(
  '/updateMessage/:courseId/:chapterId/:videoId/:messageId',
  AuthMiddleware.authUser,
  MessageController.updateMessage
);
router.delete(
  '/deleteMessage/:courseId/:chapterId/:videoId/:messageId',
  AuthMiddleware.authUser,
  MessageController.deleteMessage
);
export default router;
