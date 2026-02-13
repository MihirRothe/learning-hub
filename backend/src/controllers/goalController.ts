import { Request, Response } from 'express';
import Goal from '../models/Goal';

export const getCurrentGoal = async (req: any, res: Response) => {
    try {
        // Find goal that covers current date
        const now = new Date();
        const goal = await Goal.findOne({
            user_id: req.user.id,
            week_start_date: { $lte: now },
            week_end_date: { $gte: now }
        });

        if (goal) {
            res.json(goal);
        } else {
            res.status(404).json({ message: 'No active goal found for this week' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createGoal = async (req: any, res: Response) => {
    try {
        const goal = await Goal.create({
            user_id: req.user.id,
            ...req.body
        });
        res.status(201).json(goal);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const updateGoal = async (req: any, res: Response) => {
    try {
        const goal = await Goal.findOne({ _id: req.params.id, user_id: req.user.id });

        if (goal) {
            Object.assign(goal, req.body);
            const updatedGoal = await goal.save();
            res.json(updatedGoal);
        } else {
            res.status(404).json({ message: 'Goal not found' });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const addTask = async (req: any, res: Response) => {
    try {
        const goal = await Goal.findOne({ _id: req.params.id, user_id: req.user.id });
        if (goal) {
            goal.tasks.push(req.body);
            await goal.save();
            res.json(goal);
        } else {
            res.status(404).json({ message: 'Goal not found' });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const updateTask = async (req: any, res: Response) => {
    try {
        const goal = await Goal.findOne({ _id: req.params.id, user_id: req.user.id });
        if (goal) {
            const task = goal.tasks.find((t: any) => t._id.toString() === req.params.taskId || t.task_id === req.params.taskId);
            if (task) {
                task.completed = req.body.completed;
                if (req.body.completed) {
                    task.completed_at = new Date();
                } else {
                    task.completed_at = undefined;
                }
                await goal.save();
                res.json(goal);
            } else {
                res.status(404).json({ message: 'Task not found' });
            }
        } else {
            res.status(404).json({ message: 'Goal not found' });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
