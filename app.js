import express, { json, urlencoded, static as static_ } from 'express';
import path, { join } from 'path'
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { config } from 'dotenv';
config();

import indexRouter from './routes/index.js';

const app = express();
const __dirname = path.resolve();

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(static_(join(__dirname, 'public')));

app.use('/app', indexRouter);

export default app;
