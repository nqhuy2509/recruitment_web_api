import express from 'express';
import {
	createUser,
	getUser,
	updateUser,
} from '../controllers/userController.js';
import {
	verifyAccount,
	verifyToken,
	verifyUser,
} from '../middlewares/verify.js';

const router = express.Router();

router.post('/', verifyToken, verifyUser, createUser);
router.put('/', verifyToken, verifyAccount, verifyUser, updateUser);
router.get('/:id', verifyToken, verifyAccount, getUser);

export default router;
