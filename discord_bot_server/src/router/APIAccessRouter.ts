import express, { Request, Response } from 'express';
import { sendMessageToChannelController } from '../controllers';

const router = express.Router();

// Below route will be behind the bot_manager_server so that only the bot_manager_server can access it
router.post('/send-message', sendMessageToChannelController); 

export default router;