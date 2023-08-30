import { PUBLIC_KEY, DISCORD_TOKEN } from './config';
import {
    InteractionType,
    InteractionResponseType,
    InteractionResponseFlags,
    MessageComponentTypes,
    ButtonStyleTypes,
} from 'discord-interactions';

import express, { Request, Response } from 'express';
import morgan from 'morgan';
import { VerifyDiscordRequest } from './utils';
import { Client, GatewayIntentBits } from 'discord.js';

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});
client.login(DISCORD_TOKEN);

const app = express();
app.use(morgan('dev')); // logging
app.use(express.json({ verify: VerifyDiscordRequest(PUBLIC_KEY) }));

app.get('/health', (req, res) => {
    // for AWWS EB health check
    res.status(200).send('ok');
});

app.post('/interactions', async function (req: Request, res: Response) {
    try {
        // Interaction type and data
        const {
            type,
            id,
            data,
        } = req.body;

        /**
         * Handle verification requests
         */
        if (type === InteractionType.PING) {
            return res.send({ type: InteractionResponseType.PONG });
        }

        /**
         * Handle slash command requests
         * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
         */
        if (type === InteractionType.APPLICATION_COMMAND) {
            const { name } = data;
            const {
                member: {
                    user: { global_name: global_name },
                },
                channel: { name: channel_name },
                guild: { id: guild_id },
            } = req.body;

            const guild = await client.guilds.fetch(guild_id);
            const server_name = guild.name;

            console.log( global_name, 'in', channel_name, 'on', server_name, 'ran command', name )

            // Handle the "/send_message" command
            if (name === 'send_message') {
                const channel = data.options.find(
                    (option: { name: string; value: string }) =>
                        option.name === 'channel'
                )!.value;
                const text = data.options.find(
                    (option: { name: string; value: string }) =>
                        option.name === 'text'
                )!.value;
                const imageUrl = data.options.find(
                    (option: { name: string; value: string }) =>
                        option.name === 'image_url'
                )!.value; // Change to the correct option name
                const buttonText = data.options.find(
                    (option: { name: string; value: string }) =>
                        option.name === 'button_text'
                )!.value;
                const buttonUrl = data.options.find(
                    (option: { name: string; value: string }) =>
                        option.name === 'button_url'
                )!.value; // Change to the correct option name

                try {
                    // Fetch the channel object using the channel ID
                    const channelObject = await client.channels.fetch(channel);

                    // Create the embed for the message
                    const embed = {
                        description: text,
                        image: {
                            url: imageUrl,
                        },
                    };

                    // Send the message with the embed to the specified channel channel as TextChannel
                    await (channelObject as any).send({
                        embeds: [embed],
                        components: [
                            {
                                type: MessageComponentTypes.ACTION_ROW, // ERROR : Type 'MessageComponentTypes.ACTION_ROW' is not assignable to type 'ComponentType'.ts(2322)
                                components: [
                                    {
                                        type: MessageComponentTypes.BUTTON, // ERROR : Type 'MessageComponentTypes.BUTTON' is not assignable to type 'ComponentType.Button'.ts(2322)
                                        style: ButtonStyleTypes.LINK, // ERROR :  Type 'ButtonStyleTypes.LINK' is not assignable to type 'ButtonStyle.Link'.ts(2322)
                                        label: buttonText,
                                        url: buttonUrl, // Open the provided URL
                                    },
                                ],
                            },
                        ],
                    });

                    return res.send({
                        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                        data: {
                            content: `Message sent to channel <#${channel}>`,
                        },
                    });
                } catch (error) {
                    console.error('Error sending message:', error);
                    return res.send({
                        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                        data: {
                            content: `Failed to send message to channel <#${channel}>`,
                        },
                    });
                }
            }
        }
    } catch (error) {
        console.error('Error handling interaction:', error);
        return res.status(500).send('Internal Server Error');
    }
});

export default app;
