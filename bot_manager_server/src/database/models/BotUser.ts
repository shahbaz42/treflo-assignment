import mongoose, { Document, Schema } from 'mongoose';
import { BotServerDocument } from './BotServer';

export interface BotUserDocument extends Document {
    user_name: string;
    user_id: string;
    bot_servers: BotServerDocument[];
}

// User schema
const botUserSchema = new Schema<BotUserDocument>({
    user_name: { type: String, required: true },
    user_id: { type: String, required: true, unique: true },
    bot_servers: [{ type: Schema.Types.ObjectId, ref: 'BotServer', unique: true }],
});

// User model
const BotUserModel = mongoose.model<BotUserDocument>('BotUser', botUserSchema);

export default BotUserModel;

