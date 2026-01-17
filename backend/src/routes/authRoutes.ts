import express from 'express';
import { login, logout, verifyToken, register } from '../controllers/authController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.post('/login', login);
router.post('/logout', protect, logout);
router.get('/verify', protect, verifyToken);
router.post('/register', register); // Remove or protect this in production

export default router;
