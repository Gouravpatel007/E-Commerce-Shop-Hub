import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FiUser, FiPackage, FiSettings, FiLogOut } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import Loader from '../components/ui/Loader'

const Account = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  // Get tab from URL or default to profile
  useEffect(() => {
    const tabParam = searchParams.get('tab')
    if (tabParam && ['profile', 'orders', 'settings'].includes(tabParam)) {
      setActiveTab(tabParam)
    }
  }, [searchParams])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // For demo mode, use localStorage
        const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]')
        setOrders(savedOrders)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching orders:', err)
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    navigate(`?tab=${tab}`)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (!user) {
    return (
      <div className="py-16 container-custom">
        <Loader size="large" />
      </div>
    )
  }

  return (
    <div className="py-8 container-custom animate-on-load">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="card overflow-hidden">
            <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
              <button
                onClick={() => handleTabChange('profile')}
                className={`flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition ${
                  activeTab === 'profile' ? 'bg-gray-50 dark:bg-gray-700 font-medium' : ''
                }`}
              >
                <FiUser className="mr-3" />
                <span>Profile</span>
              </button>
              
              <button
                onClick={() => handleTabChange('orders')}
                className={`flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition ${
                  activeTab === 'orders' ? 'bg-gray-50 dark:bg-gray-700 font-medium' : ''
                }`}
              >
                <FiPackage className="mr-3" />
                <span>Orders</span>
              </button>
              
              <button
                onClick={() => handleTabChange('settings')}
                className={`flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition ${
                  activeTab === 'settings' ? 'bg-gray-50 dark:bg-gray-700 font-medium' : ''
                }`}
              >
                <FiSettings className="mr-3" />
                <span>Settings</span>
              </button>
              
              <button
                onClick={handleLogout}
                className="flex items-center p-4 text-error-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <FiLogOut className="mr-3" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="md:col-span-3">
          <div className="card">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-bold mb-6">Profile Information</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="input"
                      value={user.name}
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="input"
                      value={user.email}
                      readOnly
                    />
                  </div>
                  
                  <div className="pt-4">
                    <button className="btn btn-primary">
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-xl font-bold mb-6">Order History</h2>
                
                {loading ? (
                  <Loader />
                ) : orders.length === 0 ? (
                  <p className="text-gray-600 dark:text-gray-400">
                    You haven't placed any orders yet.
                  </p>
                ) : (
                  <div className="space-y-6">
                    {orders.map(order => (
                      <div 
                        key={order.id} 
                        className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                      >
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 flex flex-wrap items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Order ID: <span className="font-medium text-gray-900 dark:text-white">{order.id}</span>
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Date: <span className="font-medium text-gray-900 dark:text-white">{formatDate(order.date)}</span>
                            </p>
                          </div>
                          <div className="mt-2 sm:mt-0">
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                              order.status === 'Delivered' 
                                ? 'bg-success-500/10 text-success-500' 
                                : order.status === 'Cancelled' 
                                ? 'bg-error-500/10 text-error-500'
                                : 'bg-primary-500/10 text-primary-500'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                        
                        <div className="px-4 py-3 divide-y divide-gray-200 dark:divide-gray-700">
                          {order.items.map(item => (
                            <div key={item._id} className="flex items-center py-3">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-16 h-16 object-cover rounded mr-4"
                              />
                              <div className="flex-1">
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Qty: {item.quantity} x ${item.price.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 flex justify-between">
                          <p className="font-medium">Total:</p>
                          <p className="font-bold">${order.total.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div>
                <h2 className="text-xl font-bold mb-6">Account Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Password</h3>
                    <button className="btn btn-secondary">
                      Change Password
                    </button>
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="text-lg font-medium mb-3">Notifications</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Order updates</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Receive notifications about your order status
                          </p>
                        </div>
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            id="order-notifications" 
                            className="sr-only" 
                            defaultChecked
                          />
                          <label 
                            htmlFor="order-notifications"
                            className="block w-12 h-6 rounded-full bg-gray-300 dark:bg-gray-600 cursor-pointer transition-colors duration-200 peer-checked:bg-primary-500"
                          >
                            <span
                              className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform peer-checked:translate-x-6"
                            ></span>
                          </label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Promotions</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Receive notifications about promotions and deals
                          </p>
                        </div>
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            id="promo-notifications" 
                            className="sr-only" 
                          />
                          <label 
                            htmlFor="promo-notifications"
                            className="block w-12 h-6 rounded-full bg-gray-300 dark:bg-gray-600 cursor-pointer transition-colors duration-200 peer-checked:bg-primary-500"
                          >
                            <span
                              className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform peer-checked:translate-x-6"
                            ></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="text-lg font-medium mb-3 text-error-500">Danger Zone</h3>
                    <button className="btn bg-white text-error-500 border border-error-500 hover:bg-error-500 hover:text-white transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account