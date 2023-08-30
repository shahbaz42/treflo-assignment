import express, { Request, Response } from 'express';
import { sendMessageToChannelController } from '../controllers';
import { body } from 'express-validator';
import { validateRequest } from '../utils';

const router = express.Router();

// Below route will be behind the bot_manager_server so that only the bot_manager_server can access it
router.post(
    '/send-message',
    [
        body('channelId').exists().withMessage('Channel ID is required'),
        body('text').exists().withMessage('Text is required'),
        body('imageUrl').exists().withMessage('Image URL is required'),
        body('buttonText').exists().withMessage('Button Text is required'),
        body('buttonUrl').exists().withMessage('Button URL is required'),
    ],
    validateRequest,
    sendMessageToChannelController
);

export default router;
