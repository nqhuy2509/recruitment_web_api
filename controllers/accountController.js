import Account from '../models/Account.js';
import Recruiter from '../models/Recruiter.js';
import User from '../models/User.js';
import { ROLE } from '../utils/constant.js';
import { createError } from '../utils/createError.js';

export const getAllAccount = async (req, res, next) => {
	try {
		const accounts = await Account.find({});
		return res.status(200).json(accounts);
	} catch (error) {
		next(error);
	}
};

export const getAccount = async (req, res, next) => {
	try {
		const account = await Account.findById(req.params.id);
		return res.status(200).json(account);
	} catch (error) {
		next(error);
	}
};

export const deleteAccount = async (req, res, next) => {
	try {
		const account = await Account.findById(req.params.id);
		if (account) {
			if (account.role === ROLE.RECRUITER) {
				await Recruiter.findOneAndDelete({ accountId: req.params.id });
			}
			if (account.role === ROLE.USER) {
				await User.findOneAndDelete({ accountId: req.params.id });
			}
			await account.delete();
			res.status(200).json('Delete account successfully !');
		} else {
			next(createError(403, 'User not found!'));
		}
	} catch (error) {
		next(error);
	}
};

// GET all account recuiter
export const getAllAccountRecuiter = async (req, res, next) => {
	try {
		const recruiterAccounts = await Recruiter.find({})
			.populate('accountId')
			.exec();

		res.status(200).json(recruiterAccounts);
	} catch (error) {
		next(error);
	}
};

// Get account recruiter
export const getAccountRecruiter = async (req, res, next) => {
	try {
		const recruiterAccount = await Recruiter.find({
			accountId: req.params.id,
		})
			.populate('accountId')
			.exec();
		res.status(200).json(recruiterAccount);
	} catch (error) {
		next(error);
	}
};
