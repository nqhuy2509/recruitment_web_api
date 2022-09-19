import mongoose from 'mongoose';

export const connectdb = async () => {
	try {
		await mongoose.connect(process.env.MONGO);
		console.log('✅ Connected to database successfully!');
	} catch (error) {
		console.log('❌ Connected to database failed');
		throw error;
	}
};
