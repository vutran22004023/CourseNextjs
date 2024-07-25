import express from 'express';
import UserController from '../controllers/user.controller.js';
import { AuthMiddleware } from '../middlewares/index.js';

const router = express.Router();

router.get('/get-all-users', AuthMiddleware.authAdmin, UserController.getAllUsers);
router.get('/get-detail-user/:id', AuthMiddleware.authUser, UserController.getDetailUser);
router.put('/update-user/:id', AuthMiddleware.authUser, UserController.updateUser);
router.delete('/delete-user/:id', AuthMiddleware.authAdmin, UserController.deleteUser);
router.post('/delete-many-user', AuthMiddleware.authAdmin, UserController.deleteManyUser);
router.post('/create-user', AuthMiddleware.authAdmin, UserController.createUser);

export default router;
