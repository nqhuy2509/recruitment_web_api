import User from '../models/User.js';

// Create Info User
export const createUser = async (req, res, next) => {
	const user = new User({
		accountId: req.account.id,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		dataOfBirth: new Date(req.body.dataOfBirth),
		phone: req.body.phone,
		address: req.body.address,
	});

	try {
		await user.save();
		res.status(200).json({
			message: 'Create user successfully',
			user,
		});
	} catch (error) {
		next(error);
	}

	try {
	} catch (error) {
		next(error);
	}
};

// Update user info
export const updateUser = async (req, res, next) => {
	try {
		const updatedUser = await User.findOneAndUpdate(
			{ accountId: req.params.id },
			{ $set: req.body },
			{ new: true }
		);

		res.status(200).json({ message: 'Updated sucessfully', updatedUser });
	} catch (error) {
		next(error);
	}
};
