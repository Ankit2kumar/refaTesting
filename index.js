import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import listEndpoints from 'express-list-endpoints';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import postRoute from './routes/posts.js';

const port = process.env.PORT || 8800;
const app = express();
dotenv.config();

mongoose.connect(
	process.env.MONGO_URL,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	() => {
		console.log('Connected to Database');
	}
);
//  mongoose.connection.on('error', (error) => {
//  	console.log('Mongo error: ', error);
// });

//MiddleWares
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);

app.listen(port, () => {
	console.log('Backend Server is running at ', port);
});

console.table(listEndpoints(app));
