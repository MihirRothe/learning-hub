import express from 'express';
const router = express.Router();
import {
    getCollections,
    createCollection,
    getCollectionById,
    updateCollection,
    deleteCollection,
    addResourceToCollection,
    removeResourceFromCollection
} from '../controllers/collectionController';
import { protect } from '../middleware/authMiddleware';

router.route('/')
    .get(protect, getCollections)
    .post(protect, createCollection);

router.route('/:id')
    .get(protect, getCollectionById)
    .put(protect, updateCollection)
    .delete(protect, deleteCollection);

router.route('/:id/resources')
    .post(protect, addResourceToCollection);

router.route('/:id/resources/:resourceId')
    .delete(protect, removeResourceFromCollection);

export default router;
