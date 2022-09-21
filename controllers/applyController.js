import Apply from '../models/Apply.js';
import News from '../models/News.js';
import Recruiter from '../models/Recruiter.js';
import User from '../models/User.js';
import { createError } from '../utils/createError.js';

export const createNewApply = async (req, res, next) => {
	try {
		const accountId = req.account.id;
		const user = await User.findOne({ accountId });
		const userId = user._id;
		const newsId = req.body.newsId;
		const isExist = await Apply.find({ userId, newsId });
		if (isExist.length !== 0) {
			return next(createError(401, 'You are applyed for this job'));
		}
		const newApply = new Apply({
			newsId,
			userId,
			intro: req.body.intro,
		});
		try {
			await newApply.save();
			res.status(200).json({
				message: 'Create new apply is successfully !',
				newApply,
			});
		} catch (error) {
			next(error);
		}
	} catch (error) {
		next(error);
	}
};

export const updateStatusApply = async (req, res, next) => {
	try {
		const accountId = req.account.id;
		const recruiter = await Recruiter.findOne({ accountId });
		const recruiterId = recruiter._id;

		const apply = await Apply.findById(req.params.id);
		const newsApplyed = await News.findById(apply.newsId);

		const recruiterPosted = newsApplyed.recruiterId;

		const isAllow = recruiterId.toString() === recruiterPosted.toString();

		if (!isAllow) {
			return next(
				createError(401, 'You are not allowed to update status')
			);
		}

		const updatedApply = await Apply.findByIdAndUpdate(
			req.params.id,
			{ $set: { status: req.body.status } },
			{ new: true }
		);

		res.status(200).json({
			message: 'Update apply successfully !',
			updatedApply,
		});
	} catch (error) {
		next(error);
	}
};

export const getAllApplyForUser = async (req, res, next) => {
	try {
		const userInfo = await User.findOne({ accountId: req.account.id });
		const userId = userInfo._id;

		const applies = await Apply.find({ userId })
			.populate({ path: 'newsId', populate: { path: 'recruiterId' } })
			.exec();

		res.status(200).json(applies);
	} catch (error) {
		next(error);
	}
};

export const getApplyByIdForUser = async (req, res, next) => {
	try {
		const userInfo = await User.findOne({ accountId: req.account.id });
		const userId = userInfo._id;

		const apply = await Apply.findById(req.params.id).populate({
			path: 'newsId',
			populate: { path: 'recruiterId' },
		});

		if (!apply) {
			return next(createError(404, 'Not Found this apply '));
		}

		if (apply.userId.toString() !== userId.toString()) {
			return next(createError(401, 'You are not apply to this job'));
		}

		res.status(200).json(apply);
	} catch (error) {
		next(error);
	}
};

export const getAllApplyForNews = async (req, res, next) => {
	const newsId = req.params.id;
	const news = await News.findById(newsId);

	if (!news) {
		next(createError(404, 'News is not found!'));
	}

	const accountId = req.account.id;
	const recruiter = await Recruiter.findOne({ accountId });
	const recruiterId = recruiter._id;

	if (news.recruiterId.toString() !== recruiterId.toString()) {
		next(createError(401, 'You are not allowed!'));
	}

	const applies = await Apply.find({ newsId }).populate('userId');

	res.status(200).json(applies);
};
