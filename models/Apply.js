import mongoose, { Schema } from 'mongoose';

const ApplySchema = new mongoose.Schema(
	{
		newsId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'News',
		},
		userId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		applyDate: {
			type: Date,
			default: new Date(),
		},
		CV: {},
		status: {
			type: String,
			default: 'pending',
			enum: ['pending', 'success', 'cancel'],
		},
		intro: {
			type: String,
		},
	},
	{ timestamps: true }
);

export default mongoose.model('Apply', ApplySchema);
