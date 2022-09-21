import express from 'express';
import {
	deleteAccount,
	getAccount,
	getAccountRecruiter,
	getAllAccount,
	getAllAccountRecuiter,
} from '../controllers/accountController.js';
import {
	verifyAccount,
	verifyAdmin,
	verifyRecruiter,
	verifyToken,
	verifyUser,
} from '../middlewares/verify.js';

const router = express.Router();

router.get(
	'/recruiters/:id',
	verifyToken,
	verifyRecruiter,
	getAccountRecruiter
);

router.get('/recruiters', verifyToken, verifyAdmin, getAllAccountRecuiter);

router.get('/users/:id', verifyToken, verifyUser)

router.get('/:id', verifyToken, verifyAccount, getAccount);
router.get('/', verifyToken, verifyAdmin, getAllAccount);
router.delete('/:id', verifyToken, verifyAdmin, deleteAccount);

export default router;
