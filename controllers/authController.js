import { createError } from '../utils/createError.js';
import bcrypt from 'bcryptjs';
import Account from '../models/Account.js';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

export const registerAccount = async (req, res, next) => {
	try {
		const { username, email, password, role } = req.body;
		const salt = bcrypt.genSaltSync(10);
		const hashPass = bcrypt.hashSync(password, salt);
		const newAccount = new Account({
			username,
			password: hashPass,
			email,
			role,
		});

		await newAccount.save();
		res.status(200).json({
			message: 'Register account successfully !!',
		});
	} catch (error) {
		next(error);
	}
};

export const login = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		if (!username || !password) {
			return next(createError(401, 'Missing username or password'));
		}
		const account = await Account.findOne({ username });
		if (!account) {
			return next(createError(404, 'Username not found!'));
		}
		const isCorrect = await bcrypt.compare(password, account.password);
		if (!isCorrect) {
			return next(createError(400, 'Wrong passowrd or username !'));
		}

		const token = jwt.sign(
			{ id: account._id, role: account.role },
			process.env.JWT_SECRET,
			{ expiresIn: '3d' }
		);

		const result = _.omit(account._doc, ['password', 'role']);
		res.cookie('access_token', token, { httpOnly: true })
			.status(200)
			.json(result);
	} catch (error) {
		next(error);
	}
};
