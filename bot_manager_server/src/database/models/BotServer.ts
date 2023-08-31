import mongoose, { Document, Schema } from 'mongoose';

export interface BotServerDocument extends Document {
    server_name: string;
    server_id: string;
}

// Server schema
const botServerSchema = new Schema<BotServerDocument>({
    server_name: { type: String, required: true },
    server_id: { type: String, required: true, unique: true },
});

// Server model
const BotServerModel = mongoose.model<BotServerDocument>('BotServer', botServerSchema);

export default BotServerModel;