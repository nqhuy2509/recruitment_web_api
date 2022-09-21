import express from 'express';
import {
	createNewApply,
	getAllApplyForNews,
	getAllApplyForUser,
	getApplyByIdForUser,
	updateStatusApply,
} from '../controllers/applyController.js';
import {
	verifyAdmin,
	verifyRecruiter,
	verifyToken,
	verifyUser,
} from '../middlewares/verify.js';

const router = express.Router();

router.post('/', verifyToken, verifyUser, createNewApply);
router.put('/:id', verifyToken, verifyRecruiter, updateStatusApply);
router.get('/user/:id', verifyToken, verifyUser, getApplyByIdForUser);
router.get('/user/', verifyToken, verifyUser, getAllApplyForUser);

router.get('/news/:id', verifyToken, verifyRecruiter, getAllApplyForNews);

export default router;
