import express from 'express';
import {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  getMyProperties
} from '../controllers/propertyController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(getProperties).post(protect, authorize('agent', 'admin'), createProperty);

router.get('/mine/list', protect, authorize('agent', 'admin'), getMyProperties);

router
  .route('/:id')
  .get(getPropertyById)
  .put(protect, authorize('agent', 'admin'), updateProperty)
  .delete(protect, authorize('agent', 'admin'), deleteProperty);

export default router;
