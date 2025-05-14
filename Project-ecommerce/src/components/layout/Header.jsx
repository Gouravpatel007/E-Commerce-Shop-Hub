import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { useTheme } from '../../context/ThemeContext'
import SearchBar from '../ui/SearchBar'
import { FiSun, FiMoon, FiShoppingCart, FiUser, FiMenu, FiX } from 'react-icons/fi'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, logout } = useAuth()
  const { cartCount } = useCart()
  const { darkMode, toggleDarkMode } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu when location changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-sm dark:bg-gray-900/95 shadow-md' 
        : 'bg-transparent'
    }`}>
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary-500 flex items-center">
            <svg 
              viewBox="0 0 24 24" 
              width="28" 
              height="28" 
              stroke="currentColor" 
              strokeWidth="2" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="mr-2"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M16 8L8 16"></path>
              <path d="M8 8L16 16"></path>
            </svg>
            LuxeShop
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 transition"
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 transition"
            >
              Products
            </Link>
          </nav>

          {/* Search (hidden on mobile) */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <SearchBar />
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {darkMode ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
            </button>
            
            <Link 
              to="/cart" 
              className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition relative"
            >
              <FiShoppingCart className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {user ? (
              <div className="relative group">
                <button className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center">
                  <FiUser className="text-xl" />
                  <span className="ml-1 text-sm font-medium">{user.name.split(' ')[0]}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <Link 
                    to="/account" 
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    My Account
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <FiUser className="text-xl" />
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <Link 
              to="/cart" 
              className="p-2 mr-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition relative"
            >
              <FiShoppingCart className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="mt-4 md:hidden">
          <SearchBar />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg animate-slide-up">
          <div className="container-custom py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 transition py-2"
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 transition py-2"
              >
                Products
              </Link>
              {user ? (
                <>
                  <Link 
                    to="/account" 
                    className="text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 transition py-2"
                  >
                    My Account
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="text-left text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 transition py-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 transition py-2"
                >
                  Login / Register
                </Link>
              )}
              <button 
                onClick={toggleDarkMode}
                className="flex items-center text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 transition py-2"
              >
                {darkMode ? <FiSun className="mr-2" /> : <FiMoon className="mr-2" />}
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header