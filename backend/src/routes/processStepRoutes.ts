import express from 'express';
import {
  getAllProcessSteps,
  createProcessStep,
  updateProcessStep,
  deleteProcessStep,
} from '../controllers/processStepController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

router.get('/', getAllProcessSteps);
router.post('/', protect, authorize('admin'), createProcessStep);
router.put('/:id', protect, authorize('admin'), updateProcessStep);
router.delete('/:id', protect, authorize('admin'), deleteProcessStep);

export default router;
