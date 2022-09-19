import express from 'express';
import { createUser, updateUser } from '../controllers/userController.js';
import {
	verifyAccount,
	verifyToken,
	verifyUser,
} from '../middlewares/verify.js';

const router = express.Router();

router.post('/', verifyToken, verifyUser, createUser);
router.put('/:id', verifyToken, verifyAccount, verifyUser, updateUser);

export default router;
