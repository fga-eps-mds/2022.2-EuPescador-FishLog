import express from 'express';
import dotenv from 'dotenv';
import router from './routes/router';

dotenv.config();

const app = express();
app.disable('x-powered-by');

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb' }));

app.use(router);

export default app;
