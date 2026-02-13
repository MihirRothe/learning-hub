import express from 'express';
const router = express.Router();
import { getResources, createResource, getResourceById, updateResource, deleteResource, updateResourceProgress } from '../controllers/resourceController';
import { protect } from '../middleware/authMiddleware';

router.route('/')
    .get(protect, getResources)
    .post(protect, createResource);

router.route('/:id')
    .get(protect, getResourceById)
    .put(protect, updateResource)
    .delete(protect, deleteResource);

router.route('/:id/progress')
    .patch(protect, updateResourceProgress);

export default router;
