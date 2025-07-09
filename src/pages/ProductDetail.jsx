import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FiStar, FiShoppingCart, FiMinus, FiPlus, FiArrowLeft } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import Loader from '../components/ui/Loader'
import { DEMO_MODE } from '../config/constants'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (DEMO_MODE) {
          // Get product from demo data
          const demoProducts = JSON.parse(localStorage.getItem('demoProducts') || '[]')
          const foundProduct = demoProducts.find(p => p._id === id)
          
          if (!foundProduct) {
            throw new Error('Product not found')
          }
          
          setProduct(foundProduct)
          setLoading(false)
          return
        }
        
        // Make API request
        const response = await fetch(`/api/products/${id}`)
        const data = await response.json()
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch product')
        }
        
        setProduct(data)
      } catch (err) {
        setError(err.message || 'An error occurred')
      } finally {
        setLoading(false)
      }
    }
    
    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    addToCart(product, quantity)
    navigate('/cart')
  }

  const handleQuantityChange = (value) => {
    setQuantity(prev => {
      const newValue = prev + value
      return newValue < 1 ? 1 : newValue
    })
  }

  if (loading) {
    return (
      <div className="py-16 container-custom">
        <Loader size="large" />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="py-16 container-custom text-center">
        <p className="text-error-500 mb-4">{error || 'Product not found'}</p>
        <button 
          onClick={() => navigate(-1)} 
          className="btn btn-secondary inline-flex items-center"
        >
          <FiArrowLeft className="mr-2" /> Go Back
        </button>
      </div>
    )
  }

  const { 
    name, price, discount, description, image, category, 
    rating, reviews, inStock, seller 
  } = product

  const discountedPrice = discount > 0 ? price - (price * (discount / 100)) : price

  return (
    <div className="py-10 container-custom animate-on-load">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-8 inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400"
      >
        <FiArrowLeft className="mr-2" /> Back to Products
      </button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="rounded-lg overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover" 
          />
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{name}</h1>
          
          <div className="flex items-center mb-6">
            <div className="flex items-center text-yellow-500 mr-4">
              <FiStar className="fill-current" />
              <span className="ml-1 font-medium">{rating.toFixed(1)}</span>
            </div>
            <span className="text-gray-600 dark:text-gray-400">
              ({reviews} {reviews === 1 ? 'review' : 'reviews'})
            </span>
            <span className="mx-4 text-gray-300 dark:text-gray-700">|</span>
            <span className="text-gray-600 dark:text-gray-400">Sold by {seller}</span>
          </div>
          
          <div className="mb-6">
            {discount > 0 ? (
              <div className="flex items-center">
                <span className="text-3xl font-bold mr-3">${discountedPrice.toFixed(2)}</span>
                <span className="text-xl text-gray-500 dark:text-gray-400 line-through">${price.toFixed(2)}</span>
                <span className="ml-3 bg-error-500 text-white text-sm font-medium px-2 py-0.5 rounded">
                  Save {discount}%
                </span>
              </div>
            ) : (
              <span className="text-3xl font-bold">${price.toFixed(2)}</span>
            )}
          </div>
          
          <div className="border-t border-b border-gray-200 dark:border-gray-700 py-6 mb-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {description}
            </p>
          </div>
          
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <span className="block text-sm text-gray-600 dark:text-gray-400 mb-2">Quantity</span>
                <div className="flex items-center">
                  <button 
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="w-10 h-10 flex items-center justify-center rounded-l-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 disabled:opacity-50"
                  >
                    <FiMinus />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    readOnly
                    className="w-16 h-10 border-y border-gray-300 dark:border-gray-700 dark:bg-gray-800 text-center focus:outline-none"
                  />
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    className="w-10 h-10 flex items-center justify-center rounded-r-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>
              
              <div>
                <span className="block text-sm text-gray-600 dark:text-gray-400 mb-2">Category</span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">
                  {category}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleAddToCart}
              disabled={!inStock}
              className="btn btn-primary flex-1 py-3 flex items-center justify-center"
            >
              <FiShoppingCart className="mr-2" />
              {inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
          
          {!inStock && (
            <p className="mt-4 text-error-500 text-sm">
              This product is currently out of stock. Please check back later.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail