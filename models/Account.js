import mongoose from 'mongoose';

const AccountSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			require: true,
		},
		role: {
			type: String,
			enum: ['admin', 'user', 'recruiter'],
			require: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model('Account', AccountSchema);
