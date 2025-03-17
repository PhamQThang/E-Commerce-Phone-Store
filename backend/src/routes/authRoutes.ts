import express from 'express';
import { registerUser, loginUser, logoutUser, checkAdminAccess } from '../controllers/authController';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/admin/protected', checkAdminAccess);
export default router;