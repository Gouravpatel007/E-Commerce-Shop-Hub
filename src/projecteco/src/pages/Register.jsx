import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiUser, FiMail, FiLock, FiAlertCircle } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import Loader from '../components/ui/Loader'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [formErrors, setFormErrors] = useState({})
  const { register, loading, error } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const errors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required'
    }
    
    if (!formData.email) {
      errors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Invalid email format'
    }
    
    if (!formData.password) {
      errors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
    }
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    const { name, email, password } = formData
    const result = await register(name, email, password)
    
    if (result.success) {
      navigate('/')
    }
  }

  const handleDemoLogin = async (e) => {
    e.preventDefault()
    navigate('/login')
  }

  return (
    <div className="py-16 container-custom animate-on-load">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create an Account</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sign up to start shopping
          </p>
        </div>
        
        <div className="card">
          {error && (
            <div className="mb-6 p-3 bg-error-500/10 rounded-md flex items-center text-error-500">
              <FiAlertCircle className="mr-2 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400">
                  <FiUser />
                </span>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className={`input pl-10 ${formErrors.name ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                  placeholder="Name"
                />
              </div>
              {formErrors.name && (
                <p className="mt-1 text-sm text-error-500">{formErrors.name}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400">
                  <FiMail />
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input pl-10 ${formErrors.email ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                  placeholder="Email"
                />
              </div>
              {formErrors.email && (
                <p className="mt-1 text-sm text-error-500">{formErrors.email}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400">
                  <FiLock />
                </span>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`input pl-10 ${formErrors.password ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                  placeholder="Password"
                />
              </div>
              {formErrors.password && (
                <p className="mt-1 text-sm text-error-500">{formErrors.password}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400">
                  <FiLock />
                </span>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`input pl-10 ${formErrors.confirmPassword ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                  placeholder="Password"
                />
              </div>
              {formErrors.confirmPassword && (
                <p className="mt-1 text-sm text-error-500">{formErrors.confirmPassword}</p>
              )}
            </div>
            
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                I agree to the{' '}
                <a href="#!" className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                  Terms and Conditions
                </a>
              </label>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full py-3 flex items-center justify-center"
            >
              {loading ? <Loader size="small" /> : 'Create Account'}
            </button>
            
            <button
              onClick={handleDemoLogin}
              type="button"
              className="btn btn-secondary w-full py-3"
            >
              Try Demo Account
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register