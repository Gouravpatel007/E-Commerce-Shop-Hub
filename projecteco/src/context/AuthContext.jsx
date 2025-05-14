import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../config/constants'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Check if user is already logged in
  useEffect(() => {
    const checkLoggedIn = async () => {
      if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token')
        
        try {
          // For development purposes, check if we're using demo data
          if (token === 'demo-token') {
            setUser({
              _id: '1',
              name: 'Demo User',
              email: 'demo@example.com',
              isAdmin: false
            })
            setLoading(false)
            return
          }
          
          // Set auth header
          const config = {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
          
          const res = await axios.get(`${API_URL}/api/users/profile`, config)
          setUser(res.data)
          setLoading(false)
        } catch (err) {
          localStorage.removeItem('token')
          setUser(null)
          setError('Session expired. Please log in again.')
          setLoading(false)
        }
      } else {
        // Check if we should load demo data
        const shouldLoadDemoData = !localStorage.getItem('visitedBefore')
        
        if (shouldLoadDemoData) {
          // Set a flag to not load demo data next time
          localStorage.setItem('visitedBefore', 'true')
          // Load demo data
          initializeDemoData()
        }
        
        setLoading(false)
      }
    }
    
    checkLoggedIn()
  }, [])

  const initializeDemoData = () => {
    // For development, initialize demo data
    const demoProducts = [
      {
        _id: '1',
        name: 'Premium Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation.',
        price: 299.99,
        discount: 10,
        image: 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg',
        category: 'Electronics',
        inStock: true,
        rating: 4.8,
        reviews: 120,
        seller: 'AudioTech Inc.',
        featured: true
      },
      {
        _id: '2',
        name: 'Smartphone 13 Pro',
        description: 'Latest smartphone with advanced camera system and all-day battery life.',
        price: 999.99,
        discount: 0,
        image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg',
        category: 'Electronics',
        inStock: true,
        rating: 4.9,
        reviews: 350,
        seller: 'TechGiant',
        featured: true
      },
      {
        _id: '3',
        name: 'Designer Watch',
        description: 'Elegant timepiece with premium materials and Swiss movement.',
        price: 499.99,
        discount: 15,
        image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg',
        category: 'Fashion',
        inStock: true,
        rating: 4.7,
        reviews: 89,
        seller: 'LuxeTime',
        featured: false
      },
      {
        _id: '4',
        name: 'Premium Laptop',
        description: 'Powerful laptop for professionals with high-performance specs.',
        price: 1499.99,
        discount: 5,
        image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg',
        category: 'Electronics',
        inStock: true,
        rating: 4.6,
        reviews: 215,
        seller: 'TechPro',
        featured: true
      },
      {
        _id: '5',
        name: 'Smart Home Speaker',
        description: 'Voice-controlled speaker for your smart home needs.',
        price: 129.99,
        discount: 0,
        image: 'https://images.pexels.com/photos/1666779/pexels-photo-1666779.jpeg',
        category: 'Electronics',
        inStock: true,
        rating: 4.5,
        reviews: 178,
        seller: 'SmartLiving',
        featured: false
      },
      {
        _id: '6',
        name: 'Leather Wallet',
        description: 'Handcrafted leather wallet with RFID protection.',
        price: 89.99,
        discount: 0,
        image: 'https://images.pexels.com/photos/669996/pexels-photo-669996.jpeg',
        category: 'Fashion',
        inStock: true,
        rating: 4.4,
        reviews: 62,
        seller: 'LeatherCraft',
        featured: false
      }
    ]
    
    localStorage.setItem('demoProducts', JSON.stringify(demoProducts))
  }

  const login = async (email, password) => {
    setLoading(true)
    try {
      // For demo purposes
      if (email === 'demo@example.com' && password === 'password') {
        setUser({
          _id: '1',
          name: 'Demo User',
          email: 'demo@example.com',
          isAdmin: false
        })
        localStorage.setItem('token', 'demo-token')
        setLoading(false)
        return { success: true }
      }
      
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      
      const res = await axios.post(
        `${API_URL}/api/users/login`,
        { email, password },
        config
      )
      
      if (res.data.token) {
        localStorage.setItem('token', res.data.token)
        setUser(res.data.user)
        setError(null)
      }
      
      setLoading(false)
      return { success: true }
    } catch (err) {
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : 'Login failed. Please check your credentials.'
      )
      setLoading(false)
      return { success: false, error: err.response?.data?.message || 'Login failed' }
    }
  }

  const register = async (name, email, password) => {
    setLoading(true)
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      
      const res = await axios.post(
        `${API_URL}/api/users/register`,
        { name, email, password },
        config
      )
      
      if (res.data.token) {
        localStorage.setItem('token', res.data.token)
        setUser(res.data.user)
        setError(null)
      }
      
      setLoading(false)
      return { success: true }
    } catch (err) {
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : 'Registration failed. Please try again.'
      )
      setLoading(false)
      return { success: false, error: err.response?.data?.message || 'Registration failed' }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      login,
      register,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  )
}