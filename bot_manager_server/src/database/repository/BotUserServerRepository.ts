import { Model } from 'mongoose';
import { BotUserDocument, BotServerDocument } from '../models';

/**
 * This class is responsible for handling the BotUserServerRepository
 */
export class BotUserServerRepository {
    constructor(
        private botUserModel: Model<BotUserDocument>,
        private botServerModel: Model<BotServerDocument>
    ) {}
    
    /**
     * THis method adds a User Server record to the database
     * @param user_id users discord id
     * @param user_name users discord name
     * @param server_id discord server id
     * @param server_name discord server name
     * @returns 
     */
    async addRecord(
        user_id: string,
        user_name: string,
        server_id: string,
        server_name: string
    ): Promise<BotUserDocument> {
        return new Promise<BotUserDocument>(
            async (resolve: (botUserDoc: BotUserDocument) => void , reject: (error: any) => void) => {
                try {
                    // Find or create the BotServer
                    let botServer: BotServerDocument | null = await this.botServerModel.findOne({
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
                    let botUser: BotUserDocument | null = await this.botUserModel.findOne({ user_id });
                    if (!botUser) {
                        botUser = new this.botUserModel({ user_id, user_name });
                    } 
                    
                    // Check if the server already exists in the bot_servers array
                    const serverExists: boolean = botUser.bot_servers.some(
                        (server) => server+"" === botServer._id+""
                    );

                    // If the server doesn't exist, push it to the bot_servers array
                    if (!serverExists) {
                        botUser.bot_servers.push(botServer);
                    }

                    // Save the changes
                    await botUser.save();
                    resolve(botUser);
                } catch (error: any) {
                    reject(error);
                }
            }
        );
    }

    /**
     * This method returns a list  of all users and servers the used the bot
     * @returns Promise<BotUserDocument[]>
     */
    async getAllRecords(): Promise<BotUserDocument[]> {
        return new Promise<BotUserDocument[]>(
            async (resolve: (users: BotUserDocument[]) => void, reject: (error: any) => void) => {
                try {
                    const users: BotUserDocument[] = await this.botUserModel.find().populate('bot_servers');
                    resolve(users);
                } catch (error: any) {
                    reject(error);
                }
            }
        );
    }
}


