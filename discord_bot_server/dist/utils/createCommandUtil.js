"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordRequest = exports.InstallGlobalCommands = void 0;
const config_1 = require("../config");
const axios_1 = __importDefault(require("axios"));
/**
 * This function makes a request to the Discord API
 * @param endpoint endpoint to make the request to
 * @param options DiscordOptions
 * @returns
 */
const DiscordRequest = async (endpoint, options) => {
    // append endpoint to root API URL
    const url = 'https://discord.com/api/v10/' + endpoint;
    // Stringify payloads
    // if (options.body) options.body = JSON.stringify(options.body);
    // Use axios to make requests
    const config = {
        method: options.method || 'GET',
        url,
        data: options.body,
        headers: {
            Authorization: `Bot ${config_1.DISCORD_TOKEN}`,
            'Content-Type': 'application/json; charset=UTF-8',
            'User-Agent': 'DiscordBot (https://github.com/discord/discord-example-app, 1.0.0)',
        },
    };
    try {
        const res = await (0, axios_1.default)(url, config);
        return res;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
exports.DiscordRequest = DiscordRequest;
/**
 * This function installs global commands for the bot
 * @param appId APP ID of the bot
 * @param commands Array of commands to install
 */
const InstallGlobalCommands = async (appId, commands) => {
    // API endpoint to overwrite global commands
    const endpoint = `applications/${appId}/commands`;
    try {
        // This is calling the bulk overwrite endpoint: https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
        await DiscordRequest(endpoint, { method: 'PUT', body: commands });
    }
    catch (err) {
        console.error(err);
    }
};
exports.InstallGlobalCommands = InstallGlobalCommands;
//# sourceMappingURL=createCommandUtil.js.map