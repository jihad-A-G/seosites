import express from 'express';
import { upload, uploadImage, deleteImage } from '../controllers/uploadController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

router.post('/', protect, authorize('admin', 'editor'), upload.single('image'), uploadImage);
router.delete('/:filename', protect, authorize('admin', 'editor'), deleteImage);

export default router;
