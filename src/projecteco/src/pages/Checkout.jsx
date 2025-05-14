import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { STRIPE_PUBLIC_KEY, DEMO_MODE } from '../config/constants'
import CheckoutForm from '../components/checkout/CheckoutForm'
import OrderSummary from '../components/checkout/OrderSummary'

// Initialize Stripe
let stripePromise
if (DEMO_MODE) {
  // Use fake Stripe in demo mode
  stripePromise = Promise.resolve({
    elements: () => ({
      create: () => ({
        mount: () => {},
        unmount: () => {},
        on: () => {},
        update: () => {}
      }),
      getElement: () => null
    }),
    createPaymentMethod: () => Promise.resolve({ paymentMethod: { id: 'fake-pm-id' } }),
    confirmCardPayment: () => Promise.resolve({ paymentIntent: { id: 'fake-pi-id', status: 'succeeded' } })
  })
} else {
  stripePromise = loadStripe(STRIPE_PUBLIC_KEY)
}

const Checkout = () => {
  const [orderId, setOrderId] = useState(null)
  const navigate = useNavigate()

  const handlePaymentSuccess = (id) => {
    setOrderId(id)
    
    // In a real app would scroll to success message
    window.scrollTo(0, 0)
    
    // Redirect to order confirmation after delay
    setTimeout(() => {
      navigate('/account?tab=orders')
    }, 3000)
  }

  if (orderId) {
    return (
      <div className="py-16 container-custom text-center animate-on-load">
        <div className="mx-auto max-w-xl">
          <div className="mb-8 flex justify-center">
            <div className="h-24 w-24 rounded-full bg-success-500/10 flex items-center justify-center">
              <svg 
                viewBox="0 0 24 24" 
                width="48" 
                height="48" 
                stroke="currentColor" 
                strokeWidth="2" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-success-500"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Your order has been placed successfully.
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Order ID: <span className="font-medium">{orderId}</span>
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            You will be redirected to your orders page in a moment...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8 container-custom animate-on-load">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="card">
            <Elements stripe={stripePromise}>
              <CheckoutForm onSuccess={handlePaymentSuccess} />
            </Elements>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <OrderSummary />
        </div>
      </div>
    </div>
  )
}

export default Checkout