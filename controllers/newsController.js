import Account from '../models/Account.js';
import News from '../models/News.js';
import Recruiter from '../models/Recruiter.js';
import { createError } from '../utils/createError.js';
import { diff2Date } from '../utils/dateTime.js';

export const createNews = async (req, res, next) => {
	try {
		const curDate = new Date();
		const dlDate = new Date(req.body.submitDl);
		let recruiterId;
		try {
			const recruiter = await Recruiter.findOne({
				accountId: req.account.id,
			});
			if (recruiter) {
				recruiterId = recruiter._id;
			} else {
				next(createError(404, 'Recruiter is not found!'));
			}
		} catch (error) {
			next(error);
		}

		if (diff2Date(dlDate, curDate) < 0) {
			return next(createError(403, 'Submit deadline is not valid'));
		}

		const newNews = new News({
			recruiterId: recruiterId,
			title: req.body.title,
			field: req.body.field,
			description: req.body.description,
			required: req.body.requiredSkill,
			benefits: req.body.benefits,
			submitDl: new Date(req.body.submitDl),
			quantity: req.body.quantity,
		});

		await newNews.save();

		res.status(200).json({
			message: 'Create news successfully!',
			newNews,
		});
	} catch (error) {
		next(error);
	}
};

export const updateNews = async (req, res, next) => {
	try {
		if (req.body.submitDl) {
			const curDate = new Date();
			const dlDate = new Date(req.body.submitDl);
			if (diff2Date(dlDate, curDate) < 0) {
				return next(createError(403, 'Submit deadline is not valid'));
			}

			req.body.submitDl = new Date(req.body.submitDl);
		}

		const updatedNews = await News.findByIdAndUpdate(
			req.params.id,
			{ $set: req.body },
			{ new: true }
		);
		res.status(200).json({
			message: 'Updated news successfully!',
			updatedNews,
		});
	} catch (error) {
		next(error);
	}
};

export const getNewsById = async (req, res, next) => {
	try {
		const news = await News.findById(req.params.id)
			.populate('recruiterId')
			.exec();
		res.status(200).json(news);
	} catch (error) {
		next(error);
	}
};

export const getAllNews = async (req, res, next) => {
	try {
		const allNews = await News.find().populate('recruiterId').exec();
		res.status(200).json(allNews);
	} catch (error) {
		next(error);
	}
};

export const getNewsByRecruiter = async (req, res, next) => {
	try {
		const recruiter = await Recruiter.findById(req.params.id);
		if (!recruiter) {
			return next(createError(404, 'Recruiter is not found !'));
		}
		const newses = await News.find({ recruiterId: req.params.id });
		res.status(200).json({ recruiter, newses });
	} catch (error) {
		next(error);
	}
};

export const getNewsSubmitDl = async (req, res, next) => {
	try {
		const date = new Date().toISOString();
		const newses = await News.find({ submitDl: { $gte: date } });
		res.status(200).json(newses);
	} catch (error) {
		next(error);
	}
};

export const deleteNews = async (req, res, next) => {
	try {
		const news = await News.findById(req.params.id);
		if (!news) {
			return next(createError(404, 'Recruit news is not found !'));
		}

		const loggedRecruiter = await Recruiter.findOne({
			accountId: req.account.id,
		});

		const recruiterId = loggedRecruiter._id;
		// console.log(loggedRecruiter);
		if (news.recruiterId.toString() !== recruiterId.toString()) {
			return next(createError(401, 'You are not allowed !'));
		}
		await news.delete();
		res.status(200).json({ message: 'Delete new is successfully' });
	} catch (error) {
		next(error);
	}
};
