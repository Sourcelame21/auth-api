// authRoutes : déclare POST /register, POST /login (publiques) et GET /users (protégée par verifyToken)

import express from 'express';
import { register, login, getUsers } from '../controllers/authController.js';
import verifyToken from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', verifyToken, getUsers);

export default router;
