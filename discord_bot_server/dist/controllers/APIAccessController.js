"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessageToChannelController = void 0;
const discordServerUtil_1 = require("../utils/discordServerUtil");
/**
 * This controller sends a message to the respective channel
 * @param req Express.Request
 * @param res Express.Response
 * @param next Express.NextFunction
 * @returns
 */
const sendMessageToChannelController = async (req, res, next) => {
    const { channelId, text, imageUrl, buttonText, buttonUrl, } = req.body;
    try {
        // send the message to the respective channel
        await (0, discordServerUtil_1.sendChannelMessageTextImageButton)(channelId, text, imageUrl, buttonText, buttonUrl);
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
    }
    catch (error) {
        next(error);
    }
};
exports.sendMessageToChannelController = sendMessageToChannelController;
//# sourceMappingURL=APIAccessController.js.map