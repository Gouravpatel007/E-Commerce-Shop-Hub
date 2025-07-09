import { useState } from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import axios from 'axios' //
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import Loader from '../ui/Loader'
import { DEMO_MODE } from '../../config/constants'

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Inter", sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  }
}

const CheckoutForm = ({ onSuccess }) => {
  const stripe = useStripe()
  const elements = useElements()
  const { cart, cartTotal, discount, finalTotal, clearCart } = useCart()
  const { user } = useAuth()

  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [cardComplete, setCardComplete] = useState(false)
  const [billingDetails, setBillingDetails] = useState({
    name: '',
    email: '',
    address: {
      line1: '',
      city: '',
      state: '',
      postal_code: ''
    }
  })
  

  const handleChange = (e) => {
    const { name, value } = e.target
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setBillingDetails(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setBillingDetails(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!stripe || !elements) {
      return
    }
    
    if (!cardComplete) {
      setError('Please complete your card details')
      return
    }
    
    if (billingDetails.name.trim() === '') {
      setError('Please provide your name')
      return
    }

    setProcessing(true)
    // setError(null)

    try {
      // For demo mode, simulate payment success
      if (DEMO_MODE) {
        setTimeout(() => {
          // Create a sample order in localStorage
          const order = {
            id: 'order_' + Date.now(),
            date: new Date().toISOString(),
            items: cart,
            status: 'Processing',
            total: finalTotal,
            subtotal: cartTotal,
            discount: discount,
            shippingAddress: billingDetails
          }
          
          // Get existing orders or initialize empty array
          const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]')
          localStorage.setItem('orders', JSON.stringify([...existingOrders, order]))
          
          clearCart()
          setProcessing(false)
          onSuccess(order.id)
        }, 1500)
        return
      }
      
      // 1. Create payment intent via backend
      const { data: intentRes } = await axios.post(
        '/api/orders/create-payment-intent',
        {
          amount: Math.round(finalTotal * 100),
          currency: 'usd',
          metadata: {
            order_id: `order_${Date.now()}`
          }
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )

      const CLIENT_SECRET = intentRes.CLIENT_SECRET
      if (!CLIENT_SECRET) throw new Error('Client secret not received')

      // 2. Confirm payment with Stripe
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(CLIENT_SECRET, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: billingDetails
        }
      })

      if (stripeError) {
        setError(stripeError.message)
        setProcessing(false)
        return
      }

      // 3. Create the order in backend
      if (paymentIntent.status === 'succeeded') {
        const { data: orderRes } = await axios.post(
          '/api/orders',
          {
            items: cart,
            paymentIntentId: paymentIntent.id,
            shippingAddress: billingDetails
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        )

        clearCart()
        onSuccess(orderRes.order.id)
      }
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || 'An unexpected error occurred. Please try again.')
    }

    setProcessing(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Billing Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              name="name"
              type="text"
              placeholder="John Smith"
              required
              value={billingDetails.name}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              name="email"
              type="email"
              placeholder="john@example.com"
              required
              value={billingDetails.email}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              name="address.line1"
              type="text"
              placeholder="123 Main St"
              required
              value={billingDetails.address.line1}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              name="address.city"
              type="text"
              placeholder="San Francisco"
              required
              value={billingDetails.address.city}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">State</label>
            <input
              name="address.state"
              type="text"
              placeholder="CA"
              required
              value={billingDetails.address.state}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Postal Code</label>
            <input
              name="address.postal_code"
              type="text"
              placeholder="94103"
              required
              value={billingDetails.address.postal_code}
              onChange={handleChange}
              className="input"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Payment Information</h3>
        <div className="border border-gray-300 dark:border-gray-700 rounded-md p-4">
          <CardElement options={CARD_ELEMENT_OPTIONS} onChange={(e) => setCardComplete(e.complete)} />
        </div>
        {DEMO_MODE && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            (Demo mode: No actual payment will be processed.)
          </p>
        )}
      </div>

      {error && (
        <div className="p-3 bg-error-500/10 border border-error-500 rounded-md">
          <p className="text-error-500 text-sm">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || processing}
        className="btn btn-primary w-full py-3 flex items-center justify-center"
      >
        {processing ? (
          <>
            <Loader size="small" />
            <span className="ml-2">Processing...</span>
          </>
        ) : (
          `Pay $${finalTotal.toFixed(2)}`
        )}
      </button>
    </form>
  )
}

export default CheckoutForm
