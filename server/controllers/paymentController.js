// controllers/paymentController.js
export const createOrder = (req, res) => {
  try {
    // Dummy payment response (you can replace this with Razorpay or Stripe logic)
    res.status(200).json({ success: true, message: 'Payment order created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Payment creation failed' });
  }
};
