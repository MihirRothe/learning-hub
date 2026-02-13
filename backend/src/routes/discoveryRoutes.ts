import express from 'express';
const router = express.Router();
import { getTags, getRecentResources, getRecommendedResources } from '../controllers/discoveryController';
import { protect } from '../middleware/authMiddleware';

router.get('/tags', protect, getTags);
router.get('/recent', protect, getRecentResources);
router.get('/recommended', protect, getRecommendedResources);

export default router;
