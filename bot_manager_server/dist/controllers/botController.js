"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessageToChannelController = void 0;
const config_1 = require("../config");
const axios_1 = __importDefault(require("axios"));
const sendMessageToChannelController = async (req, res, next) => {
    try {
        const { channelId, text, imageUrl, buttonText, buttonUrl } = req.body;
        const url = `${config_1.DISCORD_BOT_SERVER_ENDPOINT}/api/send-message`;
        let response;
        try {
            response = await axios_1.default.post(url, {
                channelId,
                text,
                imageUrl,
                buttonText,
                buttonUrl,
            }, {
                headers: {
                    Authorization: `Bearer ${config_1.DISCORD_BOT_SERVER_API_KEY}`,
                },
            });
        }
        catch (error) {
            if (error.response.status === 404) {
                const err = new Error('Channel not found');
                err.status = 404;
                throw err;
            }
        }
        res.status(200).json({
            status: 200,
            message: 'Successfully sent message to channel',
            data: response.data,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.sendMessageToChannelController = sendMessageToChannelController;
//# sourceMappingURL=botController.js.map