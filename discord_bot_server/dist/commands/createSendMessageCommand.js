"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const utils_1 = require("../utils");
const SEND_MESSAGE_COMMAND = {
    name: 'send_message',
    description: 'Generate a post on a channel within a server',
    options: [
        {
            type: 7,
            name: 'channel',
            description: 'Select a channel',
            required: true,
        },
        {
            type: 3,
            name: 'text',
            description: 'Enter the text for the message',
            required: true,
        },
        {
            type: 3,
            name: 'image_url',
            description: 'Enter the  URL for the embed image',
            required: true,
        },
        {
            type: 3,
            name: 'button_text',
            description: 'Enter the tesxt on the button.',
            required: true,
        },
        {
            type: 3,
            name: 'button_url',
            description: 'Enter the url to open to when the button is clicked',
            required: true,
        },
    ],
};
const ALL_COMMANDS = [SEND_MESSAGE_COMMAND];
(0, utils_1.InstallGlobalCommands)(process.env.APP_ID, ALL_COMMANDS);
//# sourceMappingURL=createSendMessageCommand.js.map