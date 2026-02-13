import { Request, Response } from 'express';
import Resource from '../models/Resource';

export const getResources = async (req: any, res: Response) => {
    try {
        const keyword = req.query.search
            ? {
                $or: [
                    { title: { $regex: req.query.search, $options: 'i' } },
                    { description: { $regex: req.query.search, $options: 'i' } },
                    { category: { $regex: req.query.search, $options: 'i' } },
                ],
            }
            : {};

        const resources = await Resource.find({ ...keyword, user_id: req.user.id }).sort({ created_at: -1 });
        res.json(resources);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createResource = async (req: any, res: Response) => {
    try {
        const resource = await Resource.create({
            user_id: req.user.id,
            ...req.body
        });
        res.status(201).json(resource);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getResourceById = async (req: any, res: Response) => {
    try {
        const resource = await Resource.findOne({ _id: req.params.id, user_id: req.user.id });
        if (resource) {
            res.json(resource);
        } else {
            res.status(404).json({ message: 'Resource not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateResource = async (req: any, res: Response) => {
    try {
        const resource = await Resource.findOne({ _id: req.params.id, user_id: req.user.id });

        if (resource) {
            Object.assign(resource, req.body);
            // If progress is 100, mark as completed
            if (req.body.progress_percentage === 100) {
                resource.status = 'completed';
                resource.completed_at = new Date();
                resource.lessons_completed = resource.lessons_total || resource.lessons_completed;
            } else if (req.body.progress_percentage > 0 && resource.status === 'not_started') {
                resource.status = 'in_progress';
            }

            resource.last_accessed = new Date(); // Update last accessed on any update

            const updatedResource = await resource.save();
            res.json(updatedResource);
        } else {
            res.status(404).json({ message: 'Resource not found' });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteResource = async (req: any, res: Response) => {
    try {
        const resource = await Resource.findOneAndDelete({ _id: req.params.id, user_id: req.user.id });
        if (resource) {
            res.json({ message: 'Resource removed' });
        } else {
            res.status(404).json({ message: 'Resource not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateResourceProgress = async (req: any, res: Response) => {
    try {
        const { progress } = req.body;
        const resource = await Resource.findOne({ _id: req.params.id, user_id: req.user.id });

        if (resource) {
            resource.progress_percentage = progress;

            if (progress === 100) {
                resource.status = 'completed';
                resource.completed_at = new Date();
                resource.lessons_completed = resource.lessons_total || resource.lessons_completed;
            } else if (progress > 0 && resource.status === 'not_started') {
                resource.status = 'in_progress';
            }

            resource.last_accessed = new Date();

            const updatedResource = await resource.save();
            res.json(updatedResource);
        } else {
            res.status(404).json({ message: 'Resource not found' });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
