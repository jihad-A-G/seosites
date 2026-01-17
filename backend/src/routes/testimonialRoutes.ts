import express from 'express';
import {
  getTestimonials,
  getFeaturedTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

router
  .route('/')
  .get(getTestimonials)
  .post(protect, authorize('admin', 'editor'), createTestimonial);

router.route('/featured').get(getFeaturedTestimonials);

router
  .route('/:id')
  .get(getTestimonial)
  .put(protect, authorize('admin', 'editor'), updateTestimonial)
  .delete(protect, authorize('admin'), deleteTestimonial);

export default router;
