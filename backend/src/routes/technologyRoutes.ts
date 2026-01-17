import express from 'express';
import {
  getTechnologies,
  getTechnology,
  createTechnology,
  updateTechnology,
  deleteTechnology,
} from '../controllers/technologyController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

router
  .route('/')
  .get(getTechnologies)
  .post(protect, authorize('admin', 'editor'), createTechnology);

router
  .route('/:id')
  .get(getTechnology)
  .put(protect, authorize('admin', 'editor'), updateTechnology)
  .delete(protect, authorize('admin'), deleteTechnology);

export default router;
