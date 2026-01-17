import express from 'express';
import {
  getCompanyInfo,
  updateCompanyInfo,
} from '../controllers/companyInfoController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

router.get('/', getCompanyInfo);
router.put('/', protect, authorize('admin'), updateCompanyInfo);

export default router;
