import express from 'express'
import { createOrder } from '../controllers/paymentController.js'

const router = express.Router()

router.post('/create-order', createOrder)

export default router;





// // routes/paymentRoutes.js
// import express from 'express';
// const router = express.Router();

// // Sample route for payments
// router.post('/create', (req, res) => {
//   res.send('Payment created');
// });

// // ✅ This is the key part
// export default router;
