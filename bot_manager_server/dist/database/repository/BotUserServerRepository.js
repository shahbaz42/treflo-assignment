"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotUserServerRepository = void 0;
/**
 * This class is responsible for handling the BotUserServerRepository
 */
class BotUserServerRepository {
    botUserModel;
    botServerModel;
    constructor(botUserModel, botServerModel) {
        this.botUserModel = botUserModel;
        this.botServerModel = botServerModel;
    }
    /**
     * THis method adds a User Server record to the database
     * @param user_id users discord id
     * @param user_name users discord name
     * @param server_id discord server id
     * @param server_name discord server name
     * @returns
     */
    async addRecord(user_id, user_name, server_id, server_name) {
        return new Promise(async (resolve, reject) => {
            try {
                // Find or create the BotServer
                let botServer = await this.botServerModel.findOne({
                    server_id,
                });
                if (!botServer) {
                    botServer = new this.botServerModel({
                        server_id,
                        server_name,
                    });
                    await botServer.save();
                }
                // Find or create the BotUser
                let botUser = await this.botUserModel.findOne({ user_id });
                if (!botUser) {
                    botUser = new this.botUserModel({ user_id, user_name });
                }
                // Check if the server already exists in the bot_servers array
                const serverExists = botUser.bot_servers.some((server) => server + "" === botServer._id + "");
                // If the server doesn't exist, push it to the bot_servers array
                if (!serverExists) {
                    botUser.bot_servers.push(botServer);
                }
                // Save the changes
                await botUser.save();
                resolve(botUser);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    /**
     * This method returns a list  of all users and servers the used the bot
     * @returns Promise<BotUserDocument[]>
     */
    async getAllRecords() {
        return new Promise(async (resolve, reject) => {
            try {
                const users = await this.botUserModel.find().populate('bot_servers');
                resolve(users);
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.BotUserServerRepository = BotUserServerRepository;
//# sourceMappingURL=BotUserServerRepository.js.map