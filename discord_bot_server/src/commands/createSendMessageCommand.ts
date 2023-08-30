import 'dotenv/config';
import { InstallGlobalCommands } from '../utils';

/*
This file needs to be run once to create the global commands for the bot.
It will replace any existing global commands with the ones defined here.
*/

interface CommandOption {
  type: number;
  name: string;
  description: string;
  required: boolean;
}

interface Command {
  name: string;
  description: string;
  options: CommandOption[];
}

const SEND_MESSAGE_COMMAND: Command = {
  name: 'send_message',
  description: 'Generate a post on a channel within a server',
  options: [
    {
      type: 7, // Channel Type
      name: 'channel',
      description: 'Select a channel',
      required: true,
    },
    {
      type: 3, // String Type
      name: 'text',
      description: 'Enter the text for the message',
      required: true,
    },
    {
      type: 3, // String Type
      name: 'image_url',
      description: 'Enter the  URL for the embed image',
      required: true,
    },
    {
      type: 3, // String Type
      name: 'button_text',
      description: 'Enter the tesxt on the button.',
      required: true,
    },
    {
      type: 3, // String Type
      name: 'button_url',
      description: 'Enter the url to open to when the button is clicked',
      required: true,
    },
  ],
};

const ALL_COMMANDS: Command[] = [SEND_MESSAGE_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);