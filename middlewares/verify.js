import jwt from 'jsonwebtoken';
import { ROLE } from '../utils/constant.js';
import { createError } from '../utils/createError.js';

export const verifyToken = (req, res, next) => {
	const token = req.cookies.access_token;
	if (!token) {
		return next(createError(401, 'You are not authenticated!'));
	}
	jwt.verify(token, process.env.JWT_SECRET, (err, account) => {
		if (err) return next(createError(403, 'Token is not valid!'));
		req.account = account;
		next();
	});
};

export const verifyAccount = (req, res, next) => {
	if (req.account.id === req.params.id || req.account.role === ROLE.ADMIN) {
		next();
	} else {
		return next(createError(403, 'You are not allowed !'));
	}
};

export const verifyRecruiter = (req, res, next) => {
	if (req.account.role === ROLE.RECRUITER) {
		next();
	} else {
		return next(createError(403, 'You are not allowed !'));
	}
};

export const verifyUser = (req, res, next) => {
	if (req.account.role === ROLE.USER) {
		next();
	} else {
		return next(createError(403, 'You are not allowed!'));
	}
};

export const verifyAdmin = (req, res, next) => {
	if (req.account.role === ROLE.ADMIN) {
		next();
	} else {
		return next(createError(403, 'You are not allowed !'));
	}
};
