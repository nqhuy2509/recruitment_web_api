import mongoose from 'mongoose';

const ApplySchema = new mongoose.Schema(
	{
		newsId: {
			type: String,
			required: true,
		},
		userId: {
			type: String,
			required: true,
		},
		applyDate: {
			type: Date,
			default: Date.now(),
		},
		CV: {
			type: File,
		},
		status: {
			type: String,
		},
		intro: {
			type: String,
		},
	},
	{ timestamps: true }
);

export default mongoose.model('Apply', ApplySchema);
