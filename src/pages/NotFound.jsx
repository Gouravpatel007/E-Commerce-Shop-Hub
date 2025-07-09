import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

const NotFound = () => {
  return (
    <div className="py-16 container-custom text-center animate-on-load">
      <div className="max-w-md mx-auto">
        <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-800">404</h1>
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          to="/" 
          className="btn btn-primary inline-flex items-center"
        >
          <FiArrowLeft className="mr-2" /> Back to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound