import mongoose, { Schema } from 'mongoose';

const RecruiterSchema = new mongoose.Schema(
	{
		accountId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Account',
		},
		name: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			require: true,
		},
		desc: {
			type: String,
		},
		image: {
			type: String,
		},
	},
	{ timestamps: true }
);

export default mongoose.model('Recruiter', RecruiterSchema);
