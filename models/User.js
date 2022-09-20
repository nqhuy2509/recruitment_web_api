import mongoose, { Schema } from 'mongoose';

const UserSchema = new mongoose.Schema(
	{
		accountId: {
			type: Schema.Types.ObjectId,
			required: true,
			unique: true,
			ref: 'Account',
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			require: true,
		},
		dataOfBirth: {
			type: Date,
			require: true,
		},
		phone: {
			type: String,
		},
		address: {
			type: String,
		},
	},
	{ timestamps: true }
);

export default mongoose.model('User', UserSchema);
