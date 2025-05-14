import express from 'express';
import { createOrder, createPaymentIntent } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.post('/create-payment-intent', protect, createPaymentIntent);

export default router;