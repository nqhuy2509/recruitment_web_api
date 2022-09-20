import Recruiter from '../models/Recruiter.js';

export const createRecruiter = async (req, res, next) => {
	const { name, address, desc } = req.body;

	const recruiter = new Recruiter({
		name,
		address,
		desc,
		accountId: req.account.id,
	});

	try {
		await recruiter.save();
		res.status(200).json({
			message: 'Add infmation successfully!',
			recruiter,
		});
	} catch (error) {
		next(error);
	}
};

export const updateRecruiter = async (req, res, next) => {
	try {
		const updatedRecuiter = await Recruiter.findOneAndUpdate(
			{ accountId: req.account.id },
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(200).json(updatedRecuiter);
	} catch (error) {
		next(error);
	}
};

export const getAllRecruiters = async (req, res, next) => {
	try {
		const recruiters = await Recruiter.find({});
		res.status(200).json(recruiters);
	} catch (error) {
		next(error);
	}
};

export const getRecuiter = async (req, res, next) => {
	try {
		const recuiter = await Recruiter.findById(req.params.id);
		res.status(200).json(recuiter);
	} catch (error) {
		next(error);
	}
};
