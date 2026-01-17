import express from 'express';
import {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

router.route('/').get(getServices).post(protect, authorize('admin', 'editor'), createService);

router
  .route('/:id')
  .get(getService)
  .put(protect, authorize('admin', 'editor'), updateService)
  .delete(protect, authorize('admin'), deleteService);

export default router;
