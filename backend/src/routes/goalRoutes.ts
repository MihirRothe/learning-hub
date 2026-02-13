import express from 'express';
const router = express.Router();
import { getCurrentGoal, createGoal, updateGoal, addTask, updateTask } from '../controllers/goalController';
import { protect } from '../middleware/authMiddleware';

router.route('/current')
    .get(protect, getCurrentGoal);

router.route('/')
    .post(protect, createGoal);

router.route('/:id')
    .put(protect, updateGoal);

router.route('/:id/tasks')
    .post(protect, addTask);

router.route('/:id/tasks/:taskId')
    .put(protect, updateTask);

export default router;
