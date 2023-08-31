import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '../utils';
import { DISCORD_BOT_SERVER_ENDPOINT, DISCORD_BOT_SERVER_API_KEY } from '../config';
import axios from 'axios';
import { APIError } from '../utils';

export const sendMessageToChannelController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { channelId, text, imageUrl, buttonText, buttonUrl } = req.body;
        const url = `${DISCORD_BOT_SERVER_ENDPOINT}/api/send-message`;
        let response;
        try {
            response = await axios.post(url, {
                channelId,
                text,
                imageUrl,
                buttonText,
                buttonUrl,
            }, {
                headers: {
                    Authorization: `Bearer ${DISCORD_BOT_SERVER_API_KEY}`,
                },
            });
        } catch (error) {
            if (error.response.status === 404) {
                const err: APIError = new Error('Channel not found');
                err.status = 404;
                throw err;
            }
        }

        res.status(200).json({
            status: 200,
            message: 'Successfully sent message to channel',
            data: response.data,
        });
    } catch (error) {
        next(error);
    }
}