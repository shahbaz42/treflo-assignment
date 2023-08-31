import { Request, Response } from 'express';
import { InteractionResponseType, InteractionType } from 'discord-interactions';
import { fetchServerName, sendChannelMessageTextImageButton } from '../utils';
import { getOptionValue } from '../utils/helperUtil';
import { BOT_MANAGER_SERVER_API_KEY, BOT_MANAGER_SERVER_ENDPOINT } from '../config';
import { SyncService } from '../services';
import { body } from 'express-validator';


/**
 * This function handles all the interactions from Discord
 * @param req express.Request
 * @param res express.Response
 * @returns Promise<void>
 * @see https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-structure
*/
const interactionController = async (req: Request, res: Response) => {
    try {
        const { type } = req.body;

        // Handle verification requests
        if (type === InteractionType.PING) return res.send({
            type: InteractionResponseType.PONG,
        });

        // Handle slash command requests
        // See https://discord.com/developers/docs/interactions/application-commands#slash-commands
        if (type === InteractionType.APPLICATION_COMMAND) {
            const {
                data: { options }, // options passed to the command
                data: { name }, // name of the command
                member: { user: { global_name: global_name } }, // user who issued the command
                member: { user: { id: user_id } }, // user who issued the command
                channel: { name: channel_name }, // channel where the command was issued
                guild: { id: guild_id }, // guild where the command was issued
            } = req.body;
            const server_name = await fetchServerName(guild_id);

            // for recording the command usage data
            const syncService = new SyncService( BOT_MANAGER_SERVER_ENDPOINT, BOT_MANAGER_SERVER_API_KEY );

            // Handle the "/send_message" command
            if (name === 'send_message') {
                // Get the values from the command options
                const channelId = getOptionValue(options, 'channel');
                const text = getOptionValue(options, 'text');
                const imageUrl = getOptionValue(options, 'image_url');
                const buttonText = getOptionValue(options, 'button_text');
                const buttonUrl = getOptionValue(options, 'button_url');

                try {
                    // send the message to the respective channel
                    await sendChannelMessageTextImageButton(
                        channelId,
                        text,
                        imageUrl,
                        buttonText,
                        buttonUrl
                    );
                    // sync
                    try {
                        await syncService.syncRecord({
                            user_id: user_id,
                            user_name: global_name,
                            server_id: guild_id,
                            server_name: server_name,
                        });
                    } catch (error) {
                        console.error('Error syncing record:', error);
                    }

                    // Send a response to discord
                    return res.send({
                        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                        data: {
                            content: `Message sent to channel <#${channelId}>`,
                        },
                    });
                } catch (error) {
                    console.error('Error sending message:', error);
                    return res.send({
                        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                        data: {
                            content: `Failed to send message to channel <#${channelId}>`,
                        },
                    });
                }
            }
        }
    } catch (error) {
        console.error('Error handling interaction:', error);
        return res.status(500).send('Internal Server Error');
    }
};

export { interactionController };