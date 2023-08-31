"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncService = void 0;
const axios_1 = __importDefault(require("axios"));
/**
 * This class is responsible for syncing the user and server records to the bot_manager_server
 * Later this can be replaced with a queue system like RabbitMQ
 */
class SyncService {
    API_URL;
    AUTH_TOKEN;
    constructor(apiEndpoint, apiKey) {
        this.API_URL = `${apiEndpoint}/api/record`;
        this.AUTH_TOKEN = `Token ${apiKey}`;
    }
    /**
     * This method syncs the user and server records to the bot_manager_server
     * @param data UserServerRecordData : { user_id, user_name, server_id, server_name }
     * @returns Promise<AxiosResponse>
     */
    async syncRecord(data) {
        const requestData = JSON.stringify(data);
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: this.API_URL,
            headers: {
                'Content-Type': 'application/json',
                Authorization: this.AUTH_TOKEN,
            },
            data: requestData,
        };
        try {
            const response = await axios_1.default.request(config);
            return response;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.SyncService = SyncService;
//# sourceMappingURL=syncService.js.map