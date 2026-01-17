import express from 'express';
import {
  getAllStats,
  getStatsByPage,
  createStat,
  updateStat,
  deleteStat,
} from '../controllers/statController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

router.get('/', getAllStats);
router.get('/page/:page', getStatsByPage);
router.post('/', protect, authorize('admin'), createStat);
router.put('/:id', protect, authorize('admin'), updateStat);
router.delete('/:id', protect, authorize('admin'), deleteStat);

export default router;
