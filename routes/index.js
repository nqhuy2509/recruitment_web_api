import { Router } from 'express';
import authRoute from './auth.js';
import recruiterRoute from './recruiter.js';
import accountRoute from './account.js';
import userRoute from './user.js';
import newsRoute from './news.js';
import applyRoute from './apply.js';
const router = Router();

const initRoute = (app) => {
	router.use('/auth', authRoute);
	router.use('/account', accountRoute);
	router.use('/recruiter', recruiterRoute);
	router.use('/user', userRoute);
	router.use('/news', newsRoute);
	router.use('/apply', applyRoute);

	app.use('/api', router);
};

export default initRoute;
