import { Link } from 'react-router-dom'
import { FiGithub, FiTwitter, FiInstagram, FiFacebook } from 'react-icons/fi'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="text-xl font-bold text-primary-500 flex items-center">
              <svg 
                viewBox="0 0 24 24" 
                width="24" 
                height="24" 
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
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Premium shopping experience for discerning customers. Quality products at competitive prices.
            </p>
            <div className="mt-6 flex space-x-4">
              <a 
                href="#!" 
                className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition"
                aria-label="Twitter"
              >
                <FiTwitter className="text-xl" />
              </a>
              <a 
                href="#!" 
                className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition"
                aria-label="Facebook"
              >
                <FiFacebook className="text-xl" />
              </a>
              <a 
                href="#!" 
                className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition"
                aria-label="Instagram"
              >
                <FiInstagram className="text-xl" />
              </a>
              <a 
                href="#!" 
                className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition"
                aria-label="GitHub"
              >
                <FiGithub className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/products" 
                  className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link 
                  to="/cart" 
                  className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition"
                >
                  Cart
                </Link>
              </li>
              <li>
                <Link 
                  to="/account" 
                  className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition"
                >
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/products?category=Electronics" 
                  className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition"
                >
                  Electronics
                </Link>
              </li>
              <li>
                <Link 
                  to="/products?category=Fashion" 
                  className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition"
                >
                  Fashion
                </Link>
              </li>
              <li>
                <Link 
                  to="/products?category=Home" 
                  className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition"
                >
                  Home & Living
                </Link>
              </li>
              <li>
                <Link 
                  to="/products?category=Beauty" 
                  className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition"
                >
                  Beauty & Health
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">Contact Us</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">Email: support@luxeshop.com</p>
            <p className="text-gray-600 dark:text-gray-400 mb-2">Phone: +1 (555) 123-4567</p>
            <p className="text-gray-600 dark:text-gray-400">
              Address: 123 Commerce St, Shopping District, NY 10001
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-10 pt-6">
          <p className="text-center text-gray-600 dark:text-gray-400">
            &copy; {currentYear} LuxeShop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer