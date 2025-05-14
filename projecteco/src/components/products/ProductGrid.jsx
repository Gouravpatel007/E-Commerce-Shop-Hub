import ProductCard from './ProductCard'
import Loader from '../ui/Loader'

const ProductGrid = ({ products, loading, error }) => {
  if (loading) {
    return (
      <div className="py-8">
        <Loader size="large" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-8 text-center">
        <p className="text-error-500">{error}</p>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-600 dark:text-gray-400">No products found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid