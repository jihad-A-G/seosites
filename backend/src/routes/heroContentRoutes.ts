import express from 'express';
import {
  getAllHeroContent,
  getHeroContentByPage,
  createHeroContent,
  updateHeroContent,
  deleteHeroContent,
} from '../controllers/heroContentController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

router.get('/', getAllHeroContent);
router.get('/page/:page', getHeroContentByPage);
router.post('/', protect, authorize('admin'), createHeroContent);
router.put('/:id', protect, authorize('admin'), updateHeroContent);
router.delete('/:id', protect, authorize('admin'), deleteHeroContent);

export default router;
