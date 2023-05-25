import express from 'express';
const router = express.Router();
import AuthController from '../controllers/authController.js';

router.post('/sendOTP', AuthController.sendOTP);
router.post('/verifyOTP', AuthController.verifyOTP);

export default router;