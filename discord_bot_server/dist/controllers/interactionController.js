"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interactionController = void 0;
const discord_interactions_1 = require("discord-interactions");
const utils_1 = require("../utils");
const helperUtil_1 = require("../utils/helperUtil");
const config_1 = require("../config");
const services_1 = require("../services");
/**
 * This function handles all the interactions from Discord
 * @param req express.Request
 * @param res express.Response
 * @returns Promise<void>
 * @see https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-structure
*/
const interactionController = async (req, res) => {
    try {
        const { type } = req.body;
        // Handle verification requests
        if (type === discord_interactions_1.InteractionType.PING)
            return res.send({
                type: discord_interactions_1.InteractionResponseType.PONG,
            });
        // Handle slash command requests
        // See https://discord.com/developers/docs/interactions/application-commands#slash-commands
        if (type === discord_interactions_1.InteractionType.APPLICATION_COMMAND) {
            const { data: { options }, // options passed to the command
            data: { name }, // name of the command
            member: { user: { global_name: global_name } }, // user who issued the command
            member: { user: { id: user_id } }, // user who issued the command
            channel: { name: channel_name }, // channel where the command was issued
            guild: { id: guild_id }, // guild where the command was issued
             } = req.body;
            const server_name = await (0, utils_1.fetchServerName)(guild_id);
            // for recording the command usage data
            const syncService = new services_1.SyncService(config_1.BOT_MANAGER_SERVER_ENDPOINT, config_1.BOT_MANAGER_SERVER_API_KEY);
            // Handle the "/send_message" command
            if (name === 'send_message') {
                // Get the values from the command options
                const channelId = (0, helperUtil_1.getOptionValue)(options, 'channel');
                const text = (0, helperUtil_1.getOptionValue)(options, 'text');
                const imageUrl = (0, helperUtil_1.getOptionValue)(options, 'image_url');
                const buttonText = (0, helperUtil_1.getOptionValue)(options, 'button_text');
                const buttonUrl = (0, helperUtil_1.getOptionValue)(options, 'button_url');
                try {
                    // send the message to the respective channel
                    await (0, utils_1.sendChannelMessageTextImageButton)(channelId, text, imageUrl, buttonText, buttonUrl);
                    // sync
                    try {
                        await syncService.syncRecord({
                            user_id: user_id,
                            user_name: global_name,
                            server_id: guild_id,
                            server_name: server_name,
                        });
                    }
                    catch (error) {
                        console.error('Error syncing record:', error);
                    }
                    // Send a response to discord
                    return res.send({
                        type: discord_interactions_1.InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                        data: {
                            content: `Message sent to channel <#${channelId}>`,
                        },
                    });
                }
                catch (error) {
                    console.error('Error sending message:', error);
                    return res.send({
                        type: discord_interactions_1.InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                        data: {
                            content: `Failed to send message to channel <#${channelId}>`,
                        },
                    });
                }
            }
        }
    }
    catch (error) {
        console.error('Error handling interaction:', error);
        return res.status(500).send('Internal Server Error');
    }
};
exports.interactionController = interactionController;
//# sourceMappingURL=interactionController.js.map