import mongoose, { Schema, Document } from 'mongoose';

export interface ICollection extends Document {
    user_id: mongoose.Types.ObjectId;
    name: string;
    description?: string;
    is_public: boolean;
    cover_image_url?: string;
    resource_ids: mongoose.Types.ObjectId[];
    created_at: Date;
    updated_at: Date;
    contributor_count?: number;
}

const CollectionSchema: Schema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: { type: String },
    is_public: { type: Boolean, default: false },
    cover_image_url: { type: String },
    resource_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resource' }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    contributor_count: { type: Number, default: 1 }
});

export default mongoose.model<ICollection>('Collection', CollectionSchema);
