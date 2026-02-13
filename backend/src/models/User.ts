import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password: string;
    name: string;
    avatar_url?: string;
    account_type: 'free' | 'premium';
    created_at: Date;
    last_login?: Date;
    preferences: {
        weekly_study_goal: number;
        default_view?: string;
        notifications_enabled: boolean;
    };
}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    avatar_url: { type: String },
    account_type: { type: String, enum: ['free', 'premium'], default: 'free' },
    created_at: { type: Date, default: Date.now },
    last_login: { type: Date },
    preferences: {
        weekly_study_goal: { type: Number, default: 7 },
        default_view: { type: String },
        notifications_enabled: { type: Boolean, default: true }
    }
});

export default mongoose.model<IUser>('User', UserSchema);
