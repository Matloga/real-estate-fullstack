import express from 'express';
import {
  createInquiry,
  getInquiries,
  getInquiryById,
  updateInquiryStatus,
  deleteInquiry
} from '../controllers/inquiryController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/').post(createInquiry).get(protect, getInquiries);

router
  .route('/:id')
  .get(protect, getInquiryById)
  .put(protect, authorize('agent', 'admin'), updateInquiryStatus)
  .delete(protect, authorize('agent', 'admin'), deleteInquiry);

export default router;
