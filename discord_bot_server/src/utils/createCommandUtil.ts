import { DISCORD_TOKEN } from '../config';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface DiscordOptions {
    body?: unknown;
    method?: string;
}

/**
 * This function makes a request to the Discord API
 * @param endpoint endpoint to make the request to
 * @param options DiscordOptions
 * @returns 
 */
const DiscordRequest = async (
    endpoint: string,
    options: DiscordOptions
): Promise<AxiosResponse> => {
    // append endpoint to root API URL
    const url = 'https://discord.com/api/v10/' + endpoint;
    // Stringify payloads
    // if (options.body) options.body = JSON.stringify(options.body);
    // Use axios to make requests
    const config: AxiosRequestConfig = {
        method: options.method || 'GET',
        url,
        data: options.body,
        headers: {
          Authorization: `Bot ${DISCORD_TOKEN}`,
          'Content-Type': 'application/json; charset=UTF-8',
          'User-Agent': 'DiscordBot (https://github.com/discord/discord-example-app, 1.0.0)',
        },
      };
    
    try {
        const res = await axios(url, config);
        return res;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * This function installs global commands for the bot
 * @param appId APP ID of the bot
 * @param commands Array of commands to install
 */
const InstallGlobalCommands = async (appId: string, commands: any[]) => {
    // API endpoint to overwrite global commands
    const endpoint = `applications/${appId}/commands`;

    try {
        // This is calling the bulk overwrite endpoint: https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
        await DiscordRequest(endpoint, { method: 'PUT', body: commands });
    } catch (err) {
        console.error(err);
    }
};

export {
    InstallGlobalCommands,
    DiscordRequest,
}