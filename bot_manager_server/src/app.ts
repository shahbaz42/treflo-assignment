import { PUBLIC_KEY } from './config';
import express, {Request, Response} from 'express';
import morgan from 'morgan';
import { ErrorHandler } from './utils';

const app = express();
app.use(morgan('dev')); // logging
app.use(express.json()); 

app.get('/health', (req: Request, res: Response) => { // for AWWS EB health check
    res.status(200).send('ok');
});

app.use(ErrorHandler);
export default app;