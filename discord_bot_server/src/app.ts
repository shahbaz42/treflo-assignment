import express from 'express';
import morgan from 'morgan';

const app = express();
app.use(morgan('dev')); // logging

app.get('/health', (req, res) => { // for AWWS EB health check
  res.status(200).send('ok');
});

export default app;