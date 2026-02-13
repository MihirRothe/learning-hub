import { Request, Response } from 'express';
import Collection from '../models/Collection';

export const getCollections = async (req: any, res: Response) => {
    try {
        const collections = await Collection.find({
            $or: [{ user_id: req.user.id }, { is_public: true }]
        }).populate('resource_ids');
        res.json(collections);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createCollection = async (req: any, res: Response) => {
    try {
        const collection = await Collection.create({
            user_id: req.user.id,
            ...req.body
        });
        res.status(201).json(collection);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getCollectionById = async (req: any, res: Response) => {
    try {
        const collection = await Collection.findById(req.params.id).populate('resource_ids');
        if (collection) {
            // Check if user has access
            if (collection.is_public || collection.user_id.toString() === req.user.id) {
                res.json(collection);
            } else {
                res.status(403).json({ message: 'Not authorized to view this collection' });
            }
        } else {
            res.status(404).json({ message: 'Collection not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCollection = async (req: any, res: Response) => {
    try {
        const collection = await Collection.findOne({ _id: req.params.id, user_id: req.user.id });

        if (collection) {
            Object.assign(collection, req.body);
            collection.updated_at = new Date();
            const updatedCollection = await collection.save();
            res.json(updatedCollection);
        } else {
            res.status(404).json({ message: 'Collection not found' });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteCollection = async (req: any, res: Response) => {
    try {
        const collection = await Collection.findOneAndDelete({ _id: req.params.id, user_id: req.user.id });
        if (collection) {
            res.json({ message: 'Collection removed' });
        } else {
            res.status(404).json({ message: 'Collection not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const addResourceToCollection = async (req: any, res: Response) => {
    try {
        const collection = await Collection.findOne({ _id: req.params.id, user_id: req.user.id });
        if (collection) {
            const { resourceId } = req.body;
            if (!collection.resource_ids.includes(resourceId)) {
                collection.resource_ids.push(resourceId);
                await collection.save();
            }
            res.json(collection);
        } else {
            res.status(404).json({ message: 'Collection not found' });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const removeResourceFromCollection = async (req: any, res: Response) => {
    try {
        const collection = await Collection.findOne({ _id: req.params.id, user_id: req.user.id });
        if (collection) {
            const { resourceId } = req.params;
            collection.resource_ids = collection.resource_ids.filter((id: any) => id.toString() !== resourceId);
            await collection.save();
            res.json(collection);
        } else {
            res.status(404).json({ message: 'Collection not found' });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
