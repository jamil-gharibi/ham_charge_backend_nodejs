import express from 'express';
import AuthController from '../controllers/authController.js';
import { verifyTokenMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// همه‌ی روت‌های مربوط به /auth اینجا تعریف میشن
router.get('/send-otp-code', AuthController.sendOtpCode);
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/forgot-password', AuthController.forgotPassword);
router.get('/check', verifyTokenMiddleware, AuthController.checkAuth);

export default router;
