import { Request, Response } from 'express';
import Resource from '../models/Resource';
import Collection from '../models/Collection';

export const getTags = async (req: any, res: Response) => {
    try {
        const resources = await Resource.find({ user_id: req.user.id });
        const tags = new Set<string>();
        resources.forEach(r => {
            if (r.tags) {
                r.tags.forEach(t => tags.add(t));
            }
        });
        res.json(Array.from(tags));
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getRecentResources = async (req: any, res: Response) => {
    try {
        const resources = await Resource.find({ user_id: req.user.id })
            .sort({ created_at: -1 })
            .limit(5);
        res.json(resources);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getRecommendedResources = async (req: any, res: Response) => {
    try {
        // Simple recommendation: Get public collections
        // In a real app, this would use user tags/interests
        const recommended = await Collection.find({
            is_public: true,
            user_id: { $ne: req.user.id }
        }).populate('resource_ids').limit(5);

        res.json(recommended);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
