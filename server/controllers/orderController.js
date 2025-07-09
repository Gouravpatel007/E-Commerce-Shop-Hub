import Order from '../models/orderModel.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
  try {
    const { items, paymentIntentId, shippingAddress } = req.body;

    if (items.length === 0) {
      res.status(400).json({ message: 'No order items' });
      return;
    }

    // Calculate prices
    const totalPrice = items.reduce((acc, item) => {
      const discountedPrice = item.price - (item.price * (item.discount / 100));
      return acc + discountedPrice * item.quantity;
    }, 0);

    const order = await Order.create({
      user: req.user._id,
      items: items.map(item => ({
        product: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      shippingAddress,
      paymentResult: {
        id: paymentIntentId,
        status: 'succeeded',
        update_time: Date.now(),
        email_address: req.user.email
      },
      totalPrice
    });

    res.status(201).json({ order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order' });
  }
};

// @desc    Create Stripe payment intent
// @route   POST /api/orders/create-payment-intent
// @access  Private
export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency = 'usd', metadata = {} } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata,
      receipt_email: req.user.email
    });

    res.json({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create payment intent' });
  }
};