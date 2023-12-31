import { Request, Response, NextFunction } from 'express';
import { sendChannelMessageTextImageButton } from '../utils/discordServerUtil';

/**
 * This controller sends a message to the respective channel
 * @param req Express.Request
 * @param res Express.Response
 * @param next Express.NextFunction
 * @returns 
 */
export const sendMessageToChannelController = async (req: Request, res: Response, next: NextFunction) => {
    const {
        channelId,
        text,
        imageUrl,
        buttonText,
        buttonUrl,
    } = req.body;

    try {
        // send the message to the respective channel
        await sendChannelMessageTextImageButton(
            channelId,
            text,
            imageUrl,
            buttonText,
            buttonUrl
        );
        // Send a response 
        return res.send({
            status: 200,
            message: `Message sent to channel <#${channelId}>`,
            data: {
                channelId,
                text,
                imageUrl,
                buttonText,
                buttonUrl,
            }
        });
    } catch (error) {
        next(error);
    }
}