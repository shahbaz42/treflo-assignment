import express, {Request, Response} from 'express';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import { ErrorHandler } from './utils';
import { connectToDatabase } from './database';
import { recordRouter } from './router';
import { botRouter } from './router';

connectToDatabase()
    .then(() => console.log('Database connected'))
    .catch((error) => { console.log(error) });

const app = express();
app.use(rateLimit({ // rate limit
    windowMs: 60 * 1000, // 1 minute
    max: 60, // 60 requests
}));
app.use(morgan('dev')); // logging
app.use(express.json()); 

app.get('/health', (req: Request, res: Response) => { // for AWWS EB health check
    res.status(200).send('ok');
});

app.use('/api/record', recordRouter);
app.use('/api/bot', botRouter);

app.use(ErrorHandler);
export default app;