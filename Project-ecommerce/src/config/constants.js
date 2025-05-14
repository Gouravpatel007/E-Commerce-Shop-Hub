// API configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

// Stripe configuration
export const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_sample'

// Demo mode (for development without backend)
export const DEMO_MODE = !import.meta.env.VITE_API_URL