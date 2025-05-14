import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiShoppingCart, FiTrash2, FiMinus, FiPlus, FiArrowRight } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const Cart = () => {
  const { cart, cartTotal, discount, finalTotal, updateQuantity, removeFromCart } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [couponCode, setCouponCode] = useState('')
  const [couponError, setCouponError] = useState('')

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity)
  }

  const handleRemove = (productId) => {
    removeFromCart(productId)
  }

  const handleCouponSubmit = (e) => {
    e.preventDefault()
    // In a real app, would validate coupon with API
    setCouponError('Invalid or expired coupon code')
  }

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate('/checkout')
    } else {
      navigate('/login', { state: { from: '/checkout' } })
    }
  }

  if (cart.length === 0) {
    return (
      <div className="py-16 container-custom text-center animate-on-load">
        <div className="mb-8 flex justify-center">
          <div className="h-24 w-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <FiShoppingCart className="h-12 w-12 text-gray-400" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Looks like you haven't added any products to your cart yet.
        </p>
        <Link to="/products" className="btn btn-primary inline-flex items-center">
          Start Shopping <FiArrowRight className="ml-2" />
        </Link>
      </div>
    )
  }

  return (
    <div className="py-8 container-custom animate-on-load">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="py-3 px-4 text-left">Product</th>
                    <th className="py-3 px-4 text-left">Price</th>
                    <th className="py-3 px-4 text-center">Quantity</th>
                    <th className="py-3 px-4 text-right">Total</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => {
                    const itemPrice = item.price
                    const itemDiscount = (itemPrice * (item.discount / 100))
                    const discountedPrice = itemPrice - itemDiscount
                    const itemTotal = discountedPrice * item.quantity
                    
                    return (
                      <tr key={item._id} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-16 h-16 object-cover rounded mr-4"
                            />
                            <div>
                              <Link 
                                to={`/products/${item._id}`} 
                                className="font-medium hover:text-primary-500 line-clamp-2"
                              >
                                {item.name}
                              </Link>
                              {item.discount > 0 && (
                                <span className="text-xs text-error-500 mt-1 block">
                                  {item.discount}% off
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          {item.discount > 0 ? (
                            <div>
                              <span className="font-medium">${discountedPrice.toFixed(2)}</span>
                              <span className="text-sm text-gray-500 dark:text-gray-400 line-through block">
                                ${itemPrice.toFixed(2)}
                              </span>
                            </div>
                          ) : (
                            <span className="font-medium">${itemPrice.toFixed(2)}</span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-center">
                            <button 
                              onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center rounded-l-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                            >
                              <FiMinus />
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              readOnly
                              className="w-12 h-8 border-y border-gray-300 dark:border-gray-700 dark:bg-gray-800 text-center focus:outline-none"
                            />
                            <button 
                              onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center rounded-r-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                            >
                              <FiPlus />
                            </button>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right font-medium">
                          ${itemTotal.toFixed(2)}
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button 
                            onClick={() => handleRemove(item._id)}
                            className="text-error-500 hover:text-error-600"
                            aria-label="Remove item"
                          >
                            <FiTrash2 />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="mb-6">
              <form onSubmit={handleCouponSubmit}>
                <label htmlFor="coupon" className="block text-sm font-medium mb-2">
                  Have a coupon?
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="coupon"
                    placeholder="Enter coupon code"
                    className="input rounded-r-none flex-1"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button 
                    type="submit"
                    className="btn btn-secondary rounded-l-none"
                  >
                    Apply
                  </button>
                </div>
                {couponError && (
                  <p className="mt-2 text-sm text-error-500">{couponError}</p>
                )}
              </form>
            </div>
            
            <div className="space-y-4 border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span className="font-medium">${cartTotal.toFixed(2)}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between text-error-500">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                <span>Free</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold">Total</span>
              <span className="text-xl font-bold">${finalTotal.toFixed(2)}</span>
            </div>
            
            <button
              onClick={handleCheckout}
              className="btn btn-primary w-full py-3"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart