import { Router } from 'express';
import authRoute from './auth.js';
import recruiterRoute from './recruiter.js';
import accountRoute from './account.js';
import userRoute from './user.js';
const router = Router();

const initRoute = (app) => {
	router.use('/auth', authRoute);
	router.use('/recruiter', recruiterRoute);
	router.use('/account', accountRoute);
	router.use('/user', userRoute);

	app.use('/api', router);
};

export default initRoute;
