import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import ProductGrid from '../components/products/ProductGrid'
import { DEMO_MODE } from '../config/constants'

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        if (DEMO_MODE) {
          // Get demo products from localStorage
          const demoProducts = JSON.parse(localStorage.getItem('demoProducts') || '[]')
          setFeaturedProducts(demoProducts.filter(product => product.featured))
          setLoading(false)
          return
        }
        
        // Make API request
        const response = await fetch('/api/products/featured')
        const data = await response.json()
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch products')
        }
        
        setFeaturedProducts(data)
      } catch (err) {
        setError(err.message || 'An error occurred')
      } finally {
        setLoading(false)
      }
    }
    
    fetchFeaturedProducts()
  }, [])

  return (
    <div className="animate-on-load">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary-600 to-primary-500 text-white py-20">
        <div className="container-custom relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Premium Products for Discerning Shoppers
            </h1>
            <p className="text-lg opacity-90 mb-8">
              Discover our curated collection of high-quality products designed to elevate your lifestyle.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/products" 
                className="btn bg-white text-primary-600 hover:bg-gray-100"
              >
                Shop Now
              </Link>
              <Link 
                to="/products?category=featured" 
                className="btn bg-transparent border border-white hover:bg-white/10"
              >
                View Featured
              </Link>
            </div>
          </div>
        </div>
        <div 
          className="absolute right-0 bottom-0 w-full md:w-1/2 h-full bg-contain bg-no-repeat bg-right-bottom opacity-10"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg)' }}
        ></div>
      </div>

      {/* Categories Section */}
      <div className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-10 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/products?category=Electronics" className="relative group overflow-hidden rounded-lg h-64">
              <img
                src="https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg"
                alt="Electronics"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Electronics</h3>
                  <p className="text-white/80 text-sm mb-2">Latest gadgets and tech</p>
                  <span className="text-primary-400 flex items-center text-sm font-medium">
                    Shop Now
                    <FiArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
            
            <Link to="/products?category=Fashion" className="relative group overflow-hidden rounded-lg h-64">
              <img
                src="https://images.pexels.com/photos/5325599/pexels-photo-5325599.jpeg"
                alt="Fashion"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Fashion</h3>
                  <p className="text-white/80 text-sm mb-2">Stylish apparel and accessories</p>
                  <span className="text-primary-400 flex items-center text-sm font-medium">
                    Shop Now
                    <FiArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
            
            <Link to="/products?category=Home" className="relative group overflow-hidden rounded-lg h-64">
              <img
                src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
                alt="Home & Living"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Home & Living</h3>
                  <p className="text-white/80 text-sm mb-2">Elevate your living space</p>
                  <span className="text-primary-400 flex items-center text-sm font-medium">
                    Shop Now
                    <FiArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
            
            <Link to="/products?category=Beauty" className="relative group overflow-hidden rounded-lg h-64">
              <img
                src="https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg"
                alt="Beauty & Health"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Beauty & Health</h3>
                  <p className="text-white/80 text-sm mb-2">Premium self-care products</p>
                  <span className="text-primary-400 flex items-center text-sm font-medium">
                    Shop Now
                    <FiArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="py-16">
        <div className="container-custom">
          <div className="flex flex-wrap items-center justify-between mb-10">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link 
              to="/products" 
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-medium flex items-center"
            >
              View All <FiArrowRight className="ml-1" />
            </Link>
          </div>
          <ProductGrid products={featuredProducts} loading={loading} error={error} />
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-10 text-center">Why Shop With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center flex flex-col items-center p-6">
              <div className="h-16 w-16 rounded-full bg-primary-500/10 flex items-center justify-center mb-4">
                <svg 
                  viewBox="0 0 24 24" 
                  width="32" 
                  height="32" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-primary-500"
                >
                  <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                  <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Free Shipping</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Enjoy free shipping on all orders over $50. Fast and reliable delivery to your doorstep.
              </p>
            </div>
            
            <div className="card text-center flex flex-col items-center p-6">
              <div className="h-16 w-16 rounded-full bg-primary-500/10 flex items-center justify-center mb-4">
                <svg 
                  viewBox="0 0 24 24" 
                  width="32" 
                  height="32" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-primary-500"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Quality Products</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Curated selection of premium items sourced from trusted suppliers and brands.
              </p>
            </div>
            
            <div className="card text-center flex flex-col items-center p-6">
              <div className="h-16 w-16 rounded-full bg-primary-500/10 flex items-center justify-center mb-4">
                <svg 
                  viewBox="0 0 24 24" 
                  width="32" 
                  height="32" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-primary-500"
                >
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your transactions are secure with our encrypted payment system. Shop with confidence.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="py-16">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
            Subscribe to our newsletter and be the first to know about new products, exclusive offers, and more.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="input flex-1 max-w-md"
              required
            />
            <button type="submit" className="btn btn-primary">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Home