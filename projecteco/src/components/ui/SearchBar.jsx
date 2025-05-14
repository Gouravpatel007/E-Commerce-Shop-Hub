import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`)
      setSearchTerm('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md 
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                  dark:bg-gray-800 dark:border-gray-700 dark:text-white transition"
      />
      <button 
        type="submit"
        className="absolute left-0 top-0 mt-2.5 ml-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        aria-label="Search"
      >
        <FiSearch />
      </button>
    </form>
  )
}

export default SearchBar