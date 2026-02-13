import express from 'express';
const router = express.Router();
import { registerUser, loginUser, getMe, updateUser } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateUser);

export default router;
