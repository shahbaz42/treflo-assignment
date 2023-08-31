import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface UserServerRecordData {
    user_id: number;
    user_name: string;
    server_id: number;
    server_name: string;
}
/**
 * This class is responsible for syncing the user and server records to the bot_manager_server
 * Later this can be replaced with a queue system like RabbitMQ
 */
export class SyncService {
    private readonly API_URL: string;
    private readonly AUTH_TOKEN: string;

    constructor(apiEndpoint: string, apiKey: string) {
        this.API_URL = `${apiEndpoint}/api/record`
        this.AUTH_TOKEN = `Token ${apiKey}`;
    }

    /**
     * This method syncs the user and server records to the bot_manager_server
     * @param data UserServerRecordData : { user_id, user_name, server_id, server_name }
     * @returns Promise<AxiosResponse>
     */
    async syncRecord(data: UserServerRecordData): Promise<AxiosResponse> {
        const requestData = JSON.stringify(data);

        const config: AxiosRequestConfig = {
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
            const response = await axios.request(config);
            return response;
        } catch (error) {
            throw error;
        }
    }
}
