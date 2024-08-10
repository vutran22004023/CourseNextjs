import express from 'express';
import Login_registerController from '../controllers/auth.controller.js';
import { AuthMiddleware } from '../middlewares/index.js';

const router = express.Router();

router.post('/login-in', Login_registerController.loginIn);
router.post('/login-in/google', Login_registerController.loginInGoogle);
router.post('/register', Login_registerController.Register);
router.post('/login-out', Login_registerController.logout);
router.post('/forgot-password', Login_registerController.forgotPassword);
router.post('/reset-password', AuthMiddleware.verifyResetToken, Login_registerController.resetPassword);
router.post('/authenticate-user', AuthMiddleware.verifyResetToken, Login_registerController.authenticateUser);
router.post('/refresh-token', AuthMiddleware.refreshAccessToken);
router.get('/get-token', (req, res) => {
  const token = req.cookies.access_Token || null;
  if (token) {
    res.status(200).json({ token });
  } else {
    res.status(404).json({ message: 'Token not found' });
  }
});
router.get('/get-refreshtoken', (req, res) => {
  const token = req.cookies.refresh_Token || null;
  if (token) {
    res.status(200).json({ token });
  } else {
    res.status(404).json({ message: 'Token not found' });
  }
});

export default router;
