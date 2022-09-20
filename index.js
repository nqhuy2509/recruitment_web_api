import express from 'express';
import dotenv from 'dotenv';
import { connectdb } from './configs/connectdb.js';
import { errorMiddleware } from './middlewares/error.js';
import initRoute from './routes/index.js';
import cookieParser from 'cookie-parser';

const app = express();

dotenv.config();

//Connect to database
connectdb();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

// init Router
initRoute(app);

// Middleware
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
	console.log('Server is running on port');
});
