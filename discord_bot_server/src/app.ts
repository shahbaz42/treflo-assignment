import { PUBLIC_KEY } from './config';
import express from 'express';
import morgan from 'morgan';
import { VerifyDiscordRequest } from './utils';
import { interactionRouter } from './router';

const app = express();
app.use(morgan('dev')); // logging
app.use(express.json({ verify: VerifyDiscordRequest(PUBLIC_KEY) }));

app.get('/health', (req, res) => {
    // for AWWS EB health check
    res.status(200).send('ok');
});

app.use('/', interactionRouter);

export default app;
