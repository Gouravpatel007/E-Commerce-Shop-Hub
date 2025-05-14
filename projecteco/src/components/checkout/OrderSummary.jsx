import { useCart } from '../../context/CartContext'

const OrderSummary = () => {
  const { cart, cartTotal, discount, finalTotal } = useCart()

  return (
    <div className="card sticky top-24">
      <h3 className="text-lg font-medium mb-4">Order Summary</h3>
      
      {cart.map(item => (
        <div key={item._id} className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
          <div className="flex-1">
            <p className="text-sm font-medium">{item.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
            {item.discount > 0 && (
              <p className="text-xs text-error-500">
                -${((item.price * item.quantity * item.discount) / 100).toFixed(2)}
              </p>
            )}
          </div>
        </div>
      ))}
      
      <div className="border-b border-gray-200 dark:border-gray-700 py-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-error-500">
            <span>Discount</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Shipping</span>
          <span>Free</span>
        </div>
      </div>
      
      <div className="flex justify-between py-4 font-medium text-lg">
        <span>Total</span>
        <span>${finalTotal.toFixed(2)}</span>
      </div>
    </div>
  )
}

export default OrderSummary