import mongoose, { Schema, Document } from 'mongoose';

export interface IResource extends Document {
    user_id: mongoose.Types.ObjectId;
    title: string;
    type: 'article' | 'video' | 'course' | 'tutorial' | 'book' | 'podcast' | 'other';
    category: string;
    url?: string;
    description?: string;
    thumbnail_url?: string;
    estimated_time_hours?: number;
    lessons_total?: number;
    lessons_completed: number;
    progress_percentage: number;
    status: 'not_started' | 'in_progress' | 'completed';
    tags: string[];
    created_at: Date;
    last_accessed?: Date;
    completed_at?: Date;
}

const ResourceSchema: Schema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    type: {
        type: String,
        enum: ['article', 'video', 'course', 'tutorial', 'book', 'podcast', 'other'],
        default: 'other'
    },
    category: { type: String, required: true },
    url: { type: String },
    description: { type: String },
    thumbnail_url: { type: String },
    estimated_time_hours: { type: Number },
    lessons_total: { type: Number },
    lessons_completed: { type: Number, default: 0 },
    progress_percentage: { type: Number, default: 0 },
    status: {
        type: String,
        enum: ['not_started', 'in_progress', 'completed'],
        default: 'not_started'
    },
    tags: [{ type: String }],
    created_at: { type: Date, default: Date.now },
    last_accessed: { type: Date },
    completed_at: { type: Date }
});

export default mongoose.model<IResource>('Resource', ResourceSchema);
