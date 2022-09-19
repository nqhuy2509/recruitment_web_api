import express from 'express';
import { login, registerAccount } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerAccount);
router.post('/login', login);

export default router;
