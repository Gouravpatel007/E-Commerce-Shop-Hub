import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FiFilter, FiChevronDown, FiX } from 'react-icons/fi'
import ProductGrid from '../components/products/ProductGrid'
import { DEMO_MODE } from '../config/constants'

const Products = () => {
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    minPrice: '',
    maxPrice: '',
    sort: 'newest'
  })
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  
  const categoryOptions = ['Electronics', 'Fashion', 'Home', 'Beauty']
  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' }
  ]

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (DEMO_MODE) {
          const demoProducts = JSON.parse(localStorage.getItem('demoProducts') || '[]')
          setProducts(demoProducts)
          setLoading(false)
          return
        }
        
        // Build query string with filters
        const queryParams = new URLSearchParams()
        if (filters.category) queryParams.append('category', filters.category)
        if (filters.minPrice) queryParams.append('minPrice', filters.minPrice)
        if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice)
        if (filters.sort) queryParams.append('sort', filters.sort)
        
        const response = await fetch(`/api/products?${queryParams.toString()}`)
        const data = await response.json()
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch products')
        }
        
        setProducts(data)
      } catch (err) {
        setError(err.message || 'An error occurred')
      } finally {
        setLoading(false)
      }
    }
    
    fetchProducts()
  }, [filters])

  useEffect(() => {
    // Get search term from URL
    const searchTerm = searchParams.get('search') || ''
    const category = searchParams.get('category') || ''
    
    // Update filters from URL params
    setFilters(prev => ({
      ...prev,
      category: category
    }))
    
    // Filter products based on search term
    const filtered = products.filter(product => {
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false
      }
      return true
    })
    
    setFilteredProducts(filtered)
  }, [searchParams, products])

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const clearFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      sort: 'newest'
    })
  }

  const toggleFilter = () => {
    setIsFilterOpen(prev => !prev)
  }

  return (
    <div className="py-8 animate-on-load">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Products</h1>
          <button 
            onClick={toggleFilter}
            className="block md:hidden btn btn-secondary flex items-center"
          >
            <FiFilter className="mr-2" />
            Filter
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filter Sidebar */}
          <div 
            className={`${
              isFilterOpen ? 'fixed inset-0 z-40 bg-black bg-opacity-50' : 'hidden'
            } md:relative md:block md:bg-transparent md:z-auto`}
          >
            <div 
              className={`${
                isFilterOpen 
                  ? 'fixed right-0 top-0 h-full w-80 bg-white dark:bg-gray-800 overflow-auto z-50 transform translate-x-0 transition-transform' 
                  : 'transform translate-x-full md:transform-none'
              } md:sticky md:top-24 md:w-full md:h-auto md:p-0 md:overflow-visible md:bg-transparent md:relative`}
            >
              <div className="p-4 md:p-0">
                <div className="flex justify-between items-center mb-4 md:hidden">
                  <h2 className="text-xl font-bold">Filters</h2>
                  <button onClick={toggleFilter} className="text-xl">
                    <FiX />
                  </button>
                </div>
                
                <div className="card mb-4">
                  <h3 className="font-medium text-lg mb-4 flex items-center">
                    Categories
                    <FiChevronDown className="ml-auto" />
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input 
                        type="radio"
                        id="category-all"
                        name="category"
                        value=""
                        checked={filters.category === ''}
                        onChange={handleFilterChange}
                        className="mr-2"
                      />
                      <label htmlFor="category-all">All Categories</label>
                    </div>
                    {categoryOptions.map(category => (
                      <div key={category} className="flex items-center">
                        <input 
                          type="radio"
                          id={`category-${category}`}
                          name="category"
                          value={category}
                          checked={filters.category === category}
                          onChange={handleFilterChange}
                          className="mr-2"
                        />
                        <label htmlFor={`category-${category}`}>{category}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="card mb-4">
                  <h3 className="font-medium text-lg mb-4 flex items-center">
                    Price Range
                    <FiChevronDown className="ml-auto" />
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="minPrice" className="block text-sm mb-1">Min</label>
                      <input
                        type="number"
                        id="minPrice"
                        name="minPrice"
                        value={filters.minPrice}
                        onChange={handleFilterChange}
                        className="input"
                        placeholder="$0"
                        min="0"
                      />
                    </div>
                    <div>
                      <label htmlFor="maxPrice" className="block text-sm mb-1">Max</label>
                      <input
                        type="number"
                        id="maxPrice"
                        name="maxPrice"
                        value={filters.maxPrice}
                        onChange={handleFilterChange}
                        className="input"
                        placeholder="$1000"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="card mb-4">
                  <h3 className="font-medium text-lg mb-4">Sort By</h3>
                  <select
                    name="sort"
                    value={filters.sort}
                    onChange={handleFilterChange}
                    className="input"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <button 
                  onClick={clearFilters}
                  className="btn btn-secondary w-full mb-4"
                >
                  Clear Filters
                </button>
                
                <div className="md:hidden mt-4">
                  <button 
                    onClick={toggleFilter}
                    className="btn btn-primary w-full"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="md:col-span-3">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-600 dark:text-gray-400">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </p>
              
              <div className="hidden md:block">
                <select
                  name="sort"
                  value={filters.sort}
                  onChange={handleFilterChange}
                  className="input w-auto"
                >
                  <option value="" disabled>Sort By</option>
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <ProductGrid products={filteredProducts} loading={loading} error={error} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products