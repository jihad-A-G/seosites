import express from 'express';
import {
  getProjects,
  getFeaturedProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

router.route('/').get(getProjects).post(protect, authorize('admin', 'editor'), createProject);

router.route('/featured').get(getFeaturedProjects);

router
  .route('/:id')
  .get(getProject)
  .put(protect, authorize('admin', 'editor'), updateProject)
  .delete(protect, authorize('admin'), deleteProject);

export default router;
