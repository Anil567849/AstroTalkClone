import express from 'express';
const router = express.Router();
import AuthController from '../../controllers/astrologer/authController.js';

router.post('/sendOTP', AuthController.sendOTP);
router.post('/verifyOTP', AuthController.verifyOTP);

export default router;