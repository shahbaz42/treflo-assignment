"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendChannelMessageTextImageButton = exports.VerifyDiscordRequest = exports.fetchServerName = void 0;
const config_1 = require("../config");
const discord_js_1 = require("discord.js");
const discord_interactions_1 = require("discord-interactions");
const client = new discord_js_1.Client({
    intents: [discord_js_1.GatewayIntentBits.Guilds, discord_js_1.GatewayIntentBits.GuildMessages],
});
client.login(config_1.DISCORD_TOKEN);
/**
 * This function returns discord server name from the guildId
 * @param guildId server guildId
 * @returns Promise<string> that resolves to the server name
 */
const fetchServerName = async (guildId) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Fetch the guild object
            const guild = await client.guilds.fetch(guildId);
            // Get the server name
            const serverName = guild.name;
            resolve(serverName);
        }
        catch (error) {
            console.error('Error fetching server name:', error);
            reject(error);
        }
    });
};
exports.fetchServerName = fetchServerName;
/**
 * This function verifies the request from Discord
 * @param clientKey Discord Application Public Key
 * @returns middleware function
 */
const VerifyDiscordRequest = (clientKey) => {
    return function (req, res, buf, encoding) {
        // if req is not for /interactions endpoint, do not verify
        // updated to fix Bad Auth error on other endpoints
        // https://expressjs.com/en/api.html 
        if (req.url === '/interactions') {
            const signature = req.get('X-Signature-Ed25519');
            const timestamp = req.get('X-Signature-Timestamp');
            const isValidRequest = (0, discord_interactions_1.verifyKey)(buf, signature, timestamp, clientKey);
            if (!isValidRequest) {
                res.status(401).send('Bad request signature');
                throw new Error('Bad request signature'); // parsing stops only if error is thrown
            }
        }
        // if no error is thrown, parsing continues
    };
};
exports.VerifyDiscordRequest = VerifyDiscordRequest;
/**
 * Sends a message to a Discord channel with an embed and a button.
 * @param channelId - The Discord channel id to send the message to.
 * @param text - The text to include in the message.
 * @param imageUrl - The URL of the image to include in the message.
 * @param buttonText - The text to display on the button.
 * @param buttonUrl - The URL to open when the button is clicked.
 * @returns A Promise that resolves to a boolean indicating whether the message was sent successfully.
 */
const sendChannelMessageTextImageButton = async (channelId, text, imageUrl, buttonText, buttonUrl) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Fetch the channel object using the channel ID
            const channelObject = await client.channels.fetch(channelId);
            // Create the embed for the message
            const embed = {
                description: text,
                image: {
                    url: imageUrl,
                },
            };
            // Send the message with the embed to the specified channel channel as TextChannel
            await channelObject.send({
                embeds: [embed],
                components: [
                    {
                        type: discord_interactions_1.MessageComponentTypes.ACTION_ROW,
                        components: [
                            {
                                type: discord_interactions_1.MessageComponentTypes.BUTTON,
                                style: discord_interactions_1.ButtonStyleTypes.LINK,
                                label: buttonText,
                                url: buttonUrl, // Open the provided URL
                            },
                        ],
                    },
                ],
            });
            resolve(true);
        }
        catch (error) {
            console.error('Error sending message:', error);
            reject(error);
        }
    });
};
exports.sendChannelMessageTextImageButton = sendChannelMessageTextImageButton;
//# sourceMappingURL=discordServerUtil.js.map