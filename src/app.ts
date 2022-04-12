import 'reflect-metadata';
require('dotenv').config();

import express from 'express';
import router from './routes/router';

const app = express();
app.disable('x-powered-by');

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb' }));

app.use(router);

export default app;
