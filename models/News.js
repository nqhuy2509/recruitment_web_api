import mongoose, { Schema } from 'mongoose';

const NewsSchema = new mongoose.Schema(
	{
		recruiterId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Recruiter',
		},
		title: {
			type: String,
			required: true,
		},
		field: {
			type: String,
			require: true,
		},
		description: {
			type: String,
		},
		required: {
			type: String,
		},
		quantity: {
			type: Number,
			default: 1,
		},
		benefits: {
			type: String,
		},
		submitDl: {
			type: Date,
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model('News', NewsSchema);
