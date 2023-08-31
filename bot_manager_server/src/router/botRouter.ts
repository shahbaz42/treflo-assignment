import express from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../utils';
import { authMiddleware } from '../middlewares';
import { sendMessageToChannelController } from '../controllers';

const router = express.Router();

router.post('/send-message',
    authMiddleware,
    [
        body('channelId').exists().withMessage('Channel ID is required'),
        body('text').exists().withMessage('Text is required'),
        body('imageUrl').exists().withMessage('Image URL is required'),
        body('buttonText').exists().withMessage('Button Text is required'),
        body('buttonUrl').exists().withMessage('Button URL is required'),
    ],
    validateRequest,
    sendMessageToChannelController,
);

export default router;