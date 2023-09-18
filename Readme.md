# Discord Bot and Backend API Assignment

This repository contains the codebase and documentation for a Discord Bot and Backend API assignment. The assignment consists of two main components: a Discord Bot Server and a Bot Manager Server. The purpose of these servers is to provide interaction with users, messaging functionalities, and user data management. Below is an overview of each component, along with instructions on how to run the servers and other important details.

## Hosting and Documentation Links

- **Hosting Link**: [https://treflo-discord-bot.shahbaz.tech](https://treflo-discord-bot.shahbaz.tech/health)
>The servers are hosted on a **AWS EC2** instance. using **Docker** and **Docker Compose** behind an **Nginx**.
- **Postman Documentation**: [API Documentation](https://documenter.getpostman.com/view/23141290/2s9Y5crzAC)
- **YouTube Video**: [Watch Video](https://www.youtube.com/watch?v=CiI8NrTytJY)
- **Add bot to your server**: [Add Bot](https://discord.com/api/oauth2/authorize?client_id=1146215496367210637&permissions=2147486720&scope=applications.commands%20bot)
- **Discord Server**: [Join Server](https://discord.gg/Xq75tY9V)

## Server 1: Discord Bot Server

The Discord Bot Server is responsible for interacting with users within the community on Discord. It offers two main functionalities:

1. **Send Message to Channel**: The bot can send a post/message to a specified channel within any demo server. The message includes text, an image (with URL provided in the payload), and a call-to-action button.
2. **Generate Post Command**: Users can generate a post on any channel within a server using a command. The command format is as follows: `/send-message [channel] [text] [url] [button text] [button URL]`.
3. Provides endpoints for Discord to verify requests and send messages to channels.

## Server 2: Bot Manager Server

The Bot Manager Server is a Node backend with TypeScript that manages user data and provides an external API to interact with the messaging functionality of the Discord Bot Server. Its functionalities include:

1. **User Data Storage**: Stores user details who have used the `/send-message` command. This includes user information and the servers they've interacted with.
2. **External Messaging API**: Offers a POST API to use the messaging functionality of the Discord Bot Server externally, outside of the Discord server and virtual machine. The payload includes server ID, channel, text, URL, and button text.
3. **Get Interacted Users**: Provides a way to retrieve all users who have interacted with the bot, including their usernames and server names.


## How to Run

### Prerequisites

Make sure you have the following tools installed:

- NodeJS
- Docker
- Docker Compose

### Cloning the Repository 

Clone the repository using the following command:

```bash
git clone https://github.com/shahbaz42/treflo-discord-bot.git
```

### Setting Up Discord Bot Server

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications) and create a new application.
2. Go to the Bot tab and create a new bot.
3. Copy the bot token and paste it in the `.env` file for the Discord Bot Server.
5. Create a `.env` file for the Discord Bot Server with the following environment variables:

```
NODE_ENV=dev
PORT=3001
APP_ID=
DISCORD_TOKEN=
PUBLIC_KEY=
DISCORD_BOT_SERVER_API_KEY=
BOT_MANAGER_SERVER_API_KEY=
BOT_MANAGER_SERVER_ENDPOINT=http://localhost:3000
```
> Note : If NODE_ENV !== "prod" , Error Handler sends stack trace of every error message.

### Setting Up Bot Manager Server

1. Create a `.env` file for the Discord Bot Server with the following environment variables:

```
NODE_ENV=dev
PORT=3000
DB_URI=
DISCORD_BOT_SERVER_ENDPOINT=http://localhost:3001
DISCORD_BOT_SERVER_API_KEY=
BOT_MANAGER_SERVER_API_KEY=
```

### Running the Servers

1. Run the following command to start the servers:

```bash
docker-compose up
```

2. The servers will be running on the following ports:

- **Discord Bot Server**: `http://localhost:3001`
- **Bot Manager Server**: `http://localhost:3000`


## Architecture

The architecture of this assignment involves two servers: the Bot Manager Server exposed on port 3000 and the private Discord Bot Server accessible to the Bot Manager Server. Both servers communicate over the Docker app-network. 
* Communication is done via APIs as mentioned, which can potentially be replaced with a queue-based system like RabbitMQ in the future. Replacing SyncService [here](https://github.com/shahbaz42/treflo-discord-bot/blob/main/discord_bot_server/src/services/syncService.ts).

## Codebase Cleanliness & Organization

The codebase is designed with cleanliness and organization in mind:

- Loosely coupled modular codebase with components that can be easily swapped. 
- Usage of interfaces for connecting components and index.ts for exporting objects. 
- Short and readable code in controllers, with services and utility functions for code optimization.
- Organized database-related code with models and repositories for easy database swapping. [ref](https://github.com/shahbaz42/treflo-discord-bot/tree/main/bot_manager_server/src/database)
- Docstring comments and TypeScript interfaces for clarity.
- Minimal usage of `any` type and adherence to strict types.
- Consistent response and error format for a better understanding of API responses.

> Low Dependency: Tried to keep the codebase as low dependency as possible. 

## Storing User data
Storing the users and list of all the severs they have used the bot in.
```
Server Document : {
    server_name: string;
    server_id: string;
}
```
```
User Document : {
    username: string;
    user_id: string;
    servers: Server Document[];
}
```
> Not storing any personally identifiable information

## Security Measures
- API keys are used for authorized access to prevent unauthorized usage.
- The Discord Bot Server is behind the Bot Manager Server.
- Rate limiting is implemented to prevent denial-of-service attacks.
- Requests from Discord are verified using signatures.
- Cloudflare is used for domain-based DDoS protection.
