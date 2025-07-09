import { Link } from 'react-router-dom'
import { FiStar, FiShoppingCart } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const { _id, name, price, discount, image, rating, reviews } = product

  const discountedPrice = discount > 0 ? price - (price * (discount / 100)) : price

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  return (
    <div className="card group hover:shadow-lg">
      <Link to={`/products/${_id}`} className="block">
        <div className="relative overflow-hidden rounded-lg mb-4">
          {discount > 0 && (
            <div className="absolute top-2 left-2 bg-error-500 text-white text-xs font-medium px-2 py-0.5 rounded">
              -{discount}%
            </div>
          )}
          <img 
            src={image} 
            alt={name} 
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <button
            onClick={handleAddToCart}
            className="absolute bottom-0 left-0 right-0 bg-primary-500 text-white py-2 px-4 flex items-center justify-center opacity-0 translate-y-full transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
          >
            <FiShoppingCart className="mr-2" />
            Add to Cart
          </button>
        </div>
        <h3 className="font-medium text-lg mb-1 line-clamp-1">{name}</h3>
        <div className="flex items-center mb-2">
          <div className="flex items-center text-yellow-500 mr-2">
            <FiStar className="fill-current" />
            <span className="ml-1 text-sm">{rating.toFixed(1)}</span>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">({reviews} reviews)</span>
        </div>
        <div className="flex items-center">
          {discount > 0 ? (
            <>
              <span className="font-medium text-lg">${discountedPrice.toFixed(2)}</span>
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 line-through">${price.toFixed(2)}</span>
            </>
          ) : (
            <span className="font-medium text-lg">${price.toFixed(2)}</span>
          )}
        </div>
      </Link>
    </div>
  )
}

export default ProductCard