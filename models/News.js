import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema(
	{
		recruiterId: {
			type: String,
			required: true,
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
		benefits: {
			type: String,
		},
		submitDl: {
			type: Date,
		},
	},
	{ timestamps: true }
);

export default mongoose.model('News', NewsSchema);
