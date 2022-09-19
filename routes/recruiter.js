import express from 'express';
import {
	createRecruiter,
	getAllRecruiters,
	getRecuiter,
	updateRecruiter,
} from '../controllers/recruiterController.js';
import {
	verifyAccount,
	verifyAdmin,
	verifyRecruiter,
	verifyToken,
} from '../middlewares/verify.js';

const router = express.Router();

router.post('/', verifyToken, verifyRecruiter, createRecruiter);
router.put(
	'/:id',
	verifyToken,
	verifyAccount,
	verifyRecruiter,
	updateRecruiter
);
router.get('/', getAllRecruiters);
router.get('/:id', getRecuiter);

export default router;
