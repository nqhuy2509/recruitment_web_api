import express from 'express';
import {
	createNews,
	deleteNews,
	getAllNews,
	getNewsById,
	getNewsByRecruiter,
	getNewsSubmitDl,
	updateNews,
} from '../controllers/newsController.js';
import { verifyRecruiter, verifyToken } from '../middlewares/verify.js';

const router = express.Router();

router.post('/', verifyToken, verifyRecruiter, createNews);
router.put('/:id', verifyToken, verifyRecruiter, updateNews);
router.delete('/:id', verifyToken, verifyRecruiter, deleteNews);

// Get news by recruiter
router.get('/recruiter/:id', getNewsByRecruiter);

// Get news by submitdate
router.get('/date', getNewsSubmitDl);

// Get news by id
router.get('/:id', getNewsById);

// Get all news
router.get('/', getAllNews);

export default router;
