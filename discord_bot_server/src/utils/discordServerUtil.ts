import { DISCORD_TOKEN } from '../config';
import { Client, GatewayIntentBits, Channel } from 'discord.js';
import {
    verifyKey,
    MessageComponentTypes,
    ButtonStyleTypes,
} from 'discord-interactions';

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});
client.login(DISCORD_TOKEN);

/**
 * This function returns discord server name from the guildId
 * @param guildId server guildId
 * @returns Promise<string> that resolves to the server name
 */
export const fetchServerName = async (guildId: string) => {
    return new Promise<string>(
        async (
            resolve: (value: string) => void,
            reject: (reason?: any) => void
        ) => {
            try {
                // Fetch the guild object
                const guild = await client.guilds.fetch(guildId);
                // Get the server name
                const serverName = guild.name;
                resolve(serverName);
            } catch (error) {
                console.error('Error fetching server name:', error);
                reject(error);
            }
        }
    );
};

/**
 * This function verifies the request from Discord
 * @param clientKey Discord Application Public Key
 * @returns middleware function
 */
export const VerifyDiscordRequest= (clientKey: string) => {
  return function (req:any, res:any, buf:any, encoding:any) {
    const signature = req.get('X-Signature-Ed25519');
    const timestamp = req.get('X-Signature-Timestamp');

    const isValidRequest = verifyKey(
      buf,
      signature,
      timestamp,
      clientKey
    );
    if (!isValidRequest) {
      res.status(401).send('Bad request signature');
      throw new Error('Bad request signature');
    }
  };
};

/**
 * Sends a message to a Discord channel with an embed and a button.
 * @param channelId - The Discord channel id to send the message to.
 * @param text - The text to include in the message.
 * @param imageUrl - The URL of the image to include in the message.
 * @param buttonText - The text to display on the button.
 * @param buttonUrl - The URL to open when the button is clicked.
 * @returns A Promise that resolves to a boolean indicating whether the message was sent successfully.
 */
export const sendChannelMessageTextImageButton = async (
    channelId: string,
    text: string,
    imageUrl: string,
    buttonText: string,
    buttonUrl: string
) => {
    return new Promise<boolean>(
        async (
            resolve: (value: boolean) => void,
            reject: (reason?: any) => void
        ) => {
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

                resolve(true);
            } catch (error) {
                console.error('Error sending message:', error);
                reject(error);
            }
        }
    );
};